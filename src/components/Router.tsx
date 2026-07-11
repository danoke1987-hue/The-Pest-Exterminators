import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextProps {
  path: string;
  navigate: (href: string) => void;
}

const RouterContext = createContext<RouterContextProps>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children, initialPath }: { children: React.ReactNode; initialPath?: string }) {
  const [path, setPath] = useState(initialPath || '/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
      const handlePopState = () => {
        setPath(window.location.pathname);
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  const navigate = (href: string) => {
    if (typeof window !== 'undefined') {
      // Clean up multiple trailing slashes, keep single trailing slash if needed or standardize
      let sanitizedHref = href.toLowerCase();
      if (sanitizedHref !== '/' && sanitizedHref.endsWith('//')) {
        sanitizedHref = sanitizedHref.replace(/\/+$/, '/');
      }
      window.history.pushState({}, '', sanitizedHref);
      setPath(sanitizedHref);
      window.scrollTo(0, 0);
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ href, children, className, id, ...props }: { href: string; children: React.ReactNode; className?: string; id?: string; [key: string]: any }) {
  const { navigate } = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle middle click, cmd click, etc.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} id={id} {...props}>
      {children}
    </a>
  );
}
