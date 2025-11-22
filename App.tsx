import React, { useState, useEffect } from 'react';
import { loadData, saveData } from './utils/storage';
import { AppData, PageView } from './types';
import { Layout } from './components/Layout';
import { 
  HomePage, 
  AboutPage, 
  DestinationsPage, 
  ServicesPage, 
  BlogPage, 
  ContactPage 
} from './pages/PublicPages';
import { AdminDashboard } from './pages/Admin';

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(loadData());
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [currentLang, setCurrentLang] = useState(data.config.defaultLanguage || 'en');

  // Persist data whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Apply Theme Colors from Config
  useEffect(() => {
    document.documentElement.style.setProperty('--color-ocean', data.config.primaryColor);
    document.documentElement.style.setProperty('--color-gold', data.config.secondaryColor);
  }, [data.config]);

  // SEO: Update Title
  useEffect(() => {
    const titles: Record<PageView, string> = {
      HOME: 'Home | WorldClass Travel',
      ABOUT: 'About Us | WorldClass Travel',
      DESTINATIONS: 'Luxury Destinations | WorldClass Travel',
      SERVICES: 'Our Services | WorldClass Travel',
      BLOG: 'Travel Journal | WorldClass Travel',
      CONTACT: 'Contact Us | WorldClass Travel',
      ADMIN: 'Admin Dashboard | WorldClass Travel',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'HOME': return <HomePage data={data} navigateTo={setCurrentPage} lang={currentLang} />;
      case 'ABOUT': return <AboutPage data={data} navigateTo={setCurrentPage} lang={currentLang} />;
      case 'DESTINATIONS': return <DestinationsPage data={data} navigateTo={setCurrentPage} lang={currentLang} />;
      case 'SERVICES': return <ServicesPage lang={currentLang} />;
      case 'BLOG': return <BlogPage data={data} lang={currentLang} />;
      case 'CONTACT': return <ContactPage lang={currentLang} />;
      default: return <HomePage data={data} navigateTo={setCurrentPage} lang={currentLang} />;
    }
  };

  if (currentPage === 'ADMIN') {
    return (
      <AdminDashboard 
        data={data} 
        updateData={updateData} 
        onLogout={() => setCurrentPage('HOME')} 
      />
    );
  }

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      currentLang={currentLang}
      setLang={setCurrentLang}
      data={data}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;