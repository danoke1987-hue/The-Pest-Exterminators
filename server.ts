import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';

// App imports
import App from './src/App';
import { RouterProvider } from './src/components/Router';
import { getSeoData } from './src/lib/seo';
import { generateSitemapXml } from './src/lib/sitemap';
import { businessDetails } from './src/data/business';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10mb' }));

  // 1. SYSTEM API ROUTES
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
  });

  // Secure Lead Capture API with full backend validation
  app.post('/api/quote', (req, res) => {
    const { name, email, telephone, postcode, consent, serviceType, pest, urgency, propertyType, description, photo } = req.body;

    // Direct, strict server-side validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: 'A valid full name (minimum 2 characters) is required.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    if (!telephone || !/^[0-9\s\+\-\(\)]{7,20}$/.test(telephone)) {
      return res.status(400).json({ message: 'Please provide a valid UK telephone contact number.' });
    }

    if (!postcode || postcode.trim().length < 3) {
      return res.status(400).json({ message: 'A valid UK postcode prefix is required.' });
    }

    if (!consent) {
      return res.status(400).json({ message: 'You must provide consent for contact to submit this request.' });
    }

    // Capture base64 photo size if uploaded
    let photoSummary = 'None';
    if (photo && photo.startsWith('data:image/')) {
      const sizeInBytes = Buffer.byteLength(photo, 'base64');
      photoSummary = `Attached (${(sizeInBytes / 1024).toFixed(1)} KB)`;
    }

    // Success response simulating robust dispatch ticketing
    console.log(`[LEAD RECEIVED] Dispatch Ticket Generated:
      - Client Name: ${name}
      - Contact: ${telephone} | ${email}
      - Location: Postcode ${postcode.toUpperCase()}
      - Service Type: ${serviceType}
      - Target Pest: ${pest || 'General'}
      - Urgency Level: ${urgency}
      - Property Type: ${propertyType}
      - Description: ${description || 'No additional details provided.'}
      - Photo uploaded: ${photoSummary}
    `);

    res.status(200).json({
      success: true,
      message: 'Quote request parsed and dispatched successfully.',
      ticketId: `PE-${Math.floor(100000 + Math.random() * 900000)}`
    });
  });

  // 2. ROBOTS.TXT
  app.get('/robots.txt', (req, res) => {
    const domain = businessDetails.domain.startsWith('http') 
      ? businessDetails.domain 
      : `https://${businessDetails.domain}`;
    const cleanDomain = domain.replace(/\/+$/, '');
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: ${cleanDomain}/sitemap.xml\n`);
  });

  // 3. SITEMAP.XML / SITEMAP/XML
  app.get(['/sitemap.xml', '/sitemap/xml'], (req, res) => {
    try {
      const sitemap = generateSitemapXml();
      res.type('application/xml');
      res.send(sitemap);
    } catch (err: any) {
      console.error('Sitemap generation error:', err);
      res.status(500).send('Error compiling sitemap');
    }
  });

  // 4. VITE MIDDLEWARE SETUP
  let vite: any;
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production assets from dist/client
    app.use(express.static(path.resolve(__dirname, 'client'), { index: false }));
  }

  // 5. SERVER-SIDE RENDERING (SSR) ROUTE HANDLER
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = '';
      if (!isProd) {
        // Read index.html from disk in dev
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        // Apply Vite HTML transforms to resolve imports, css, hmr, etc.
        template = await vite.transformIndexHtml(url, template);
      } else {
        // Read index.html from dist/client in prod
        template = fs.readFileSync(path.resolve(__dirname, 'client', 'index.html'), 'utf-8');
      }

      // Render the page component tree to a string
      const appHtml = renderToString(
        React.createElement(
          RouterProvider,
          { initialPath: url },
          React.createElement(App)
        )
      );

      // Fetch dynamic SEO credentials
      const seo = getSeoData(url);
      const domain = businessDetails.domain.startsWith('http') 
        ? businessDetails.domain 
        : `https://${businessDetails.domain}`;
      const cleanDomain = domain.replace(/\/+$/, '');
      const canonicalUrl = `${cleanDomain}${url}`;

      // Construct dynamic head tags
      let headTags = `
        <title>${seo.title}</title>
        <meta name="description" content="${seo.description}" />
        <link rel="canonical" href="${canonicalUrl}" />
      `;

      if (!seo.indexable) {
        headTags += '  <meta name="robots" content="noindex, follow" />\n';
      } else {
        headTags += '  <meta name="robots" content="index, follow" />\n';
      }

      if (seo.schema) {
        headTags += `  <script type="application/ld+json">${JSON.stringify(seo.schema)}</script>\n`;
      }

      // Substitute values into template
      let html = template;
      
      // Replace existing title or inject head tags inside <head>
      if (html.includes('<!-- HEAD_INJECT -->')) {
        html = html.replace('<!-- HEAD_INJECT -->', headTags);
      } else {
        html = html.replace('</head>', `${headTags}</head>`);
      }

      // Inject the rendered React App HTML
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.error(`[SSR ERROR] URL: ${url}`, e);
      res.status(500).end(e.stack || 'Internal Server Error');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] Ready in ${process.env.NODE_ENV || 'development'} mode at http://localhost:${PORT}`);
  });
}

createServer();
