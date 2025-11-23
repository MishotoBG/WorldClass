
import React, { useState, useEffect } from 'react';
import { loadData, saveData } from './utils/storage';
import { AppData, PageView } from './types';
import { Layout } from './components/Layout';
import { c } from './utils/i18n';
import { 
  HomePage, 
  AboutPage, 
  DestinationsPage, 
  ServicesPage, 
  BlogPage, 
  ContactPage,
  TermsPage
} from './pages/PublicPages';
import { AdminDashboard } from './pages/Admin';

const App: React.FC = () => {
  // Use lazy initialization for state to prevent loadData running on every render
  const [data, setData] = useState<AppData>(() => loadData());
  
  // --- MEMORY ROUTING ---
  // We use state-based routing instead of URL routing (Hash/Path) 
  // because restricted environments (blobs/sandboxes) often block location access.
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [currentLang, setCurrentLang] = useState(() => data?.config?.defaultLanguage || 'en');

  // Helper to change "routes"
  const navigateTo = (page: PageView, lang: string = currentLang) => {
    setCurrentPage(page);
    if (lang !== currentLang) {
      setCurrentLang(lang);
    }
    // Scroll to top on navigation for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist data whenever it changes
  useEffect(() => {
    if (data) {
      saveData(data);
    }
  }, [data]);

  // Apply Theme Colors from Config
  useEffect(() => {
    if (data?.config) {
      document.documentElement.style.setProperty('--color-ocean', data.config.primaryColor || '#0f172a');
      document.documentElement.style.setProperty('--color-gold', data.config.secondaryColor || '#d4af37');
    }
  }, [data]);

  // Handle Favicon Update
  useEffect(() => {
    if (data?.config?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = data.config.faviconUrl;
    }
  }, [data?.config?.faviconUrl]);

  // SEO: Update Title and Description
  useEffect(() => {
    const baseTitle = c(data, 'seoTitle', currentLang) || 'WorldClass Travel';
    
    const titles: Record<PageView, string> = {
      HOME: baseTitle,
      ABOUT: `About Us | ${baseTitle}`,
      DESTINATIONS: `Destinations | ${baseTitle}`,
      SERVICES: `Services | ${baseTitle}`,
      BLOG: `Blog | ${baseTitle}`,
      CONTACT: `Contact | ${baseTitle}`,
      ADMIN: `Admin | ${baseTitle}`,
      TERMS: `Terms | ${baseTitle}`,
    };
    
    document.title = titles[currentPage] || baseTitle;

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = c(data, 'seoDescription', currentLang) || 'Luxury travel experiences.';
    
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descContent;
      document.head.appendChild(meta);
    }
  }, [currentPage, currentLang, data]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => {
      if (!prev) return loadData(); // Safety fallback
      return { ...prev, ...newData };
    });
  };

  // Guard against empty data
  if (!data || !data.config) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading configuration...</div>;
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'HOME': return <HomePage data={data} navigateTo={(p) => navigateTo(p)} lang={currentLang} />;
      case 'ABOUT': return <AboutPage data={data} navigateTo={(p) => navigateTo(p)} lang={currentLang} />;
      case 'DESTINATIONS': return <DestinationsPage data={data} navigateTo={(p) => navigateTo(p)} lang={currentLang} />;
      case 'SERVICES': return <ServicesPage lang={currentLang} />;
      case 'BLOG': return <BlogPage data={data} lang={currentLang} />;
      case 'CONTACT': return <ContactPage lang={currentLang} />;
      case 'TERMS': return <TermsPage lang={currentLang} />;
      default: return <HomePage data={data} navigateTo={(p) => navigateTo(p)} lang={currentLang} />;
    }
  };

  if (currentPage === 'ADMIN') {
    return (
      <AdminDashboard 
        data={data} 
        updateData={updateData} 
        onLogout={() => navigateTo('HOME', currentLang)} 
      />
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={(p) => navigateTo(p)} 
      currentLang={currentLang}
      setLang={(l) => navigateTo(currentPage, l)}
      data={data}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
