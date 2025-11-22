import React, { useState } from 'react';
import { PageView, AppData } from '../types';
import { t } from '../utils/i18n';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  currentLang: string;
  setLang: (lang: string) => void;
  data: AppData;
}

export const Navbar: React.FC<{ 
  currentPage: PageView; 
  setCurrentPage: (page: PageView) => void;
  currentLang: string;
  setLang: (lang: string) => void;
  data: AppData;
}> = ({ currentPage, setCurrentPage, currentLang, setLang, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { labelKey: string; value: PageView }[] = [
    { labelKey: 'nav.home', value: 'HOME' },
    { labelKey: 'nav.about', value: 'ABOUT' },
    { labelKey: 'nav.destinations', value: 'DESTINATIONS' },
    { labelKey: 'nav.services', value: 'SERVICES' },
    { labelKey: 'nav.blog', value: 'BLOG' },
    { labelKey: 'nav.contact', value: 'CONTACT' },
  ];

  return (
    <nav className="bg-ocean text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-serif font-bold tracking-wider cursor-pointer flex items-center gap-2"
            onClick={() => setCurrentPage('HOME')}
          >
            <i className="fa-solid fa-globe text-gold"></i>
            WorldClass
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setCurrentPage(link.value)}
                className={`text-sm uppercase tracking-widest hover:text-gold transition-colors ${currentPage === link.value ? 'text-gold border-b border-gold' : 'text-gray-300'}`}
              >
                {t(link.labelKey, currentLang)}
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="relative ml-4 border-l border-gray-700 pl-4 flex items-center gap-2">
               {data.config.supportedLanguages.map(lang => (
                 <button 
                   key={lang.code}
                   onClick={() => setLang(lang.code)}
                   className={`text-xs font-bold uppercase px-2 py-1 rounded ${currentLang === lang.code ? 'bg-gold text-ocean' : 'text-gray-400 hover:text-white'}`}
                 >
                   {lang.code}
                 </button>
               ))}
            </div>

            <button
              onClick={() => setCurrentPage('ADMIN')}
              className="bg-gold text-ocean px-5 py-2 rounded-full font-semibold hover:bg-white transition-colors text-sm ml-4"
            >
              {t('nav.login', currentLang)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gold text-2xl" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-ocean border-t border-gray-800">
          <div className="flex flex-col p-4 space-y-4">
             {/* Mobile Language Switcher */}
             <div className="flex gap-4 mb-2 border-b border-gray-800 pb-2">
               {data.config.supportedLanguages.map(lang => (
                 <button 
                   key={lang.code}
                   onClick={() => setLang(lang.code)}
                   className={`text-xs font-bold uppercase ${currentLang === lang.code ? 'text-gold' : 'text-gray-400'}`}
                 >
                   {lang.label}
                 </button>
               ))}
            </div>

            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setCurrentPage(link.value);
                  setIsOpen(false);
                }}
                className="text-left text-gray-300 hover:text-gold uppercase text-sm tracking-widest"
              >
                {t(link.labelKey, currentLang)}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage('ADMIN');
                setIsOpen(false);
              }}
              className="text-left text-gold font-bold uppercase text-sm tracking-widest"
            >
              {t('nav.admin', currentLang)}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">WorldClass</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.about', currentLang)}
            </p>
            <div className="flex space-x-4">
              <i className="fa-brands fa-instagram text-gold text-xl cursor-pointer hover:text-white transition"></i>
              <i className="fa-brands fa-facebook text-gold text-xl cursor-pointer hover:text-white transition"></i>
              <i className="fa-brands fa-twitter text-gold text-xl cursor-pointer hover:text-white transition"></i>
            </div>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">{t('footer.quickLinks', currentLang)}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-gold cursor-pointer">{t('nav.about', currentLang)}</li>
              <li className="hover:text-gold cursor-pointer">{t('nav.destinations', currentLang)}</li>
              <li className="hover:text-gold cursor-pointer">{t('nav.services', currentLang)}</li>
              <li className="hover:text-gold cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">{t('footer.contact', currentLang)}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3"><i className="fa-solid fa-location-dot text-gold"></i> 123 Luxury Lane, NY</li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-phone text-gold"></i> +1 (555) 123-4567</li>
              <li className="flex items-center gap-3"><i className="fa-solid fa-envelope text-gold"></i> concierge@worldclass.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">{t('footer.newsletter', currentLang)}</h4>
            <p className="text-gray-400 text-sm mb-4">{t('footer.subscribeText', currentLang)}</p>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder={t('contact.email', currentLang)} className="bg-gray-800 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:border-gold" />
              <button className="bg-gold text-ocean font-bold py-2 uppercase text-sm hover:bg-white transition">{t('footer.subscribeBtn', currentLang)}</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} WorldClass Travel. {t('footer.rights', currentLang)}
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, currentLang, setLang, data }) => {
  return (
    <div className="min-h-screen flex flex-col bg-sand font-sans">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentLang={currentLang}
        setLang={setLang}
        data={data}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer currentLang={currentLang} />
    </div>
  );
};