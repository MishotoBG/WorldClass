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
      case 'HOME': return <HomePage data={data} navigateTo={setCurrentPage} />;
      case 'ABOUT': return <AboutPage data={data} navigateTo={setCurrentPage} />;
      case 'DESTINATIONS': return <DestinationsPage data={data} navigateTo={setCurrentPage} />;
      case 'SERVICES': return <ServicesPage />;
      case 'BLOG': return <BlogPage data={data} />;
      case 'CONTACT': return <ContactPage />;
      default: return <HomePage data={data} navigateTo={setCurrentPage} />;
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
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;