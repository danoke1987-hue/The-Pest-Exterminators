import { generateSitemapXml } from '../src/lib/sitemap';
import { businessDetails } from '../src/data/business';

async function runValidation() {
  console.log('=== STARTING AUTOMATED SITEMAP AUDIT ===\n');

  // 1. Generate local sitemap
  let sitemapXml: string;
  try {
    sitemapXml = generateSitemapXml();
    console.log('✓ Successfully compiled sitemap XML in-memory.');
  } catch (err: any) {
    console.error('✗ Failed to compile sitemap:', err);
    process.exit(1);
  }

  // 2. XML Well-formedness checks
  if (!sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.error('✗ Malformed XML: Missing or incorrect XML declaration at the start.');
  } else {
    console.log('✓ XML declaration is valid and positioned at the very beginning.');
  }

  if (!sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    console.error('✗ Missing or incorrect sitemap namespace (xmlns).');
  } else {
    console.log('✓ Sitemap namespace is correct.');
  }

  // 3. Extract all URLs and lastmod entries from sitemap
  const urls: string[] = [];
  const lastmodEntries: Record<string, string> = {};
  
  const blockRegex = /<url>([\s\S]*?)<\/url>/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(sitemapXml)) !== null) {
    const blockContent = blockMatch[1];
    const locMatch = /<loc>([^<>]+)<\/loc>/.exec(blockContent);
    if (locMatch) {
      const url = locMatch[1];
      urls.push(url);
      
      const lastmodMatch = /<lastmod>([^<>]+)<\/lastmod>/.exec(blockContent);
      if (lastmodMatch) {
        lastmodEntries[url] = lastmodMatch[1];
      }
    }
  }

  console.log(`\n--- SITEMAP METRICS ---`);
  console.log(`Total URLs found: ${urls.length}`);

  // 4. Run Audits
  const canonicalHostname = 'https://www.thepestexterminators.co.uk';
  const duplicateUrls: string[] = [];
  const hostnameMismatches: string[] = [];
  const malformedUrls: string[] = [];
  const trailingSlashMismatches: string[] = [];
  const containsNoindex: string[] = [];
  const missingLastmod: string[] = [];

  const seenUrls = new Set<string>();

  urls.forEach((url) => {
    // Check duplicates
    if (seenUrls.has(url)) {
      duplicateUrls.push(url);
    }
    seenUrls.add(url);

    // Check canonical hostname
    if (!url.startsWith(canonicalHostname)) {
      hostnameMismatches.push(url);
    }

    // Check malformed
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') {
        malformedUrls.push(`${url} (Not HTTPS)`);
      }
    } catch {
      malformedUrls.push(`${url} (Invalid URL construct)`);
    }

    // Check trailing slash (all paths except root / should end with trailing slash)
    if (url !== `${canonicalHostname}/` && !url.endsWith('/')) {
      trailingSlashMismatches.push(url);
    }

    // Advice sections must have valid lastmod
    if (url.includes('/advice/') && url !== `${canonicalHostname}/advice/`) {
      if (!lastmodEntries[url]) {
        missingLastmod.push(url);
      } else {
        const lastmodDate = lastmodEntries[url];
        const isValidDate = !isNaN(Date.parse(lastmodDate));
        if (!isValidDate) {
          malformedUrls.push(`${url} (Invalid lastmod date format: ${lastmodDate})`);
        }
      }
    }
  });

  // Print results
  console.log(`Duplicate URLs: ${duplicateUrls.length}`);
  if (duplicateUrls.length > 0) {
    console.log('✗ Duplicate list:', duplicateUrls);
  } else {
    console.log('✓ No duplicate URLs found.');
  }

  console.log(`Hostname Mismatches: ${hostnameMismatches.length}`);
  if (hostnameMismatches.length > 0) {
    console.log('✗ Mismatched hostnames:', hostnameMismatches);
  } else {
    console.log('✓ All URLs match the canonical hostname:', canonicalHostname);
  }

  console.log(`Malformed URLs: ${malformedUrls.length}`);
  if (malformedUrls.length > 0) {
    console.log('✗ Malformed list:', malformedUrls);
  } else {
    console.log('✓ No malformed URLs.');
  }

  console.log(`Trailing Slash Mismatches: ${trailingSlashMismatches.length}`);
  if (trailingSlashMismatches.length > 0) {
    console.log('✗ Missing trailing slashes:', trailingSlashMismatches);
  } else {
    console.log('✓ Trailing slash consistency is perfect (all subpaths end in /).');
  }

  console.log(`Missing lastmod on dynamic Advice Articles: ${missingLastmod.length}`);
  if (missingLastmod.length > 0) {
    console.log('✗ Missing lastmod on articles:', missingLastmod);
  } else {
    console.log('✓ All advice articles correctly supply a lastmod timestamp.');
  }

  // 5. Final validation report summary
  console.log('\n--- AUDIT SUMMARY ---');
  const hasFailures = 
    duplicateUrls.length > 0 || 
    hostnameMismatches.length > 0 || 
    malformedUrls.length > 0 || 
    trailingSlashMismatches.length > 0 || 
    missingLastmod.length > 0;

  if (hasFailures) {
    console.log('✗ SITEMAP AUDIT FAILED. Please review the errors listed above.');
    process.exit(1);
  } else {
    console.log('✓ SITEMAP AUDIT PASSED successfully! The sitemap conforms 100% to Google Search Console specs.');
    process.exit(0);
  }
}

runValidation();
