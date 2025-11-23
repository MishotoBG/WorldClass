
import React, { useState, useEffect } from 'react';
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

export const CookieBanner: React.FC<{ lang: string; navigateTo: (p: PageView) => void }> = ({ lang, navigateTo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has made a choice yet
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      // Add a small delay for animation effect
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'true' | 'false') => {
    localStorage.setItem('cookie_consent', choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ocean/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md p-10 shadow-2xl relative animate-fade-in-up">
        {/* Gold Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean via-gold to-ocean"></div>

        <div className="text-center mb-8">
           <div className="inline-block p-4 rounded-full bg-gray-50 mb-4 text-gold text-3xl shadow-sm">
             <i className="fa-solid fa-cookie-bite"></i>
           </div>
           <h4 className="font-serif font-bold text-2xl text-ocean mb-3">
             {t('cookie.title', lang)} 
           </h4>
           <p className="text-gray-500 text-sm leading-7">
             {t('cookie.text', lang)}
           </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleConsent('true')} 
            className="w-full bg-ocean text-white py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-ocean transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            {t('cookie.accept', lang)}
          </button>
          
          <div className="flex justify-between border-t border-gray-100 pt-4">
            <button 
              onClick={() => handleConsent('false')} 
              className="text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-red-500 transition-colors px-2"
            >
              {t('cookie.decline', lang)}
            </button>
            <button 
              onClick={() => navigateTo('TERMS')} 
              className="text-ocean text-xs font-bold uppercase tracking-wider hover:text-gold transition-colors px-2 flex items-center gap-2"
            >
              {t('cookie.policy', lang)} <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC<{ 
  currentPage: PageView; 
  setCurrentPage: (page: PageView) => void;
  currentLang: string;
  setLang: (lang: string) => void;
  data: AppData;
}> = ({ currentPage, setCurrentPage, currentLang, setLang, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks: { labelKey: string; value: PageView }[] = [
    { labelKey: 'nav.home', value: 'HOME' },
    { labelKey: 'nav.about', value: 'ABOUT' },
    { labelKey: 'nav.destinations', value: 'DESTINATIONS' },
    { labelKey: 'nav.services', value: 'SERVICES' },
    { labelKey: 'nav.blog', value: 'BLOG' },
    { labelKey: 'nav.contact', value: 'CONTACT' },
  ];

  // Robust fallback if language not found
  const currentLangObj = data.config.supportedLanguages.find(l => l.code === currentLang) 
    || data.config.supportedLanguages[0] 
    || { code: 'en', label: 'English', flagCode: 'gb' };

  return (
    <nav className="bg-ocean text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-2xl font-serif font-bold tracking-wider cursor-pointer flex items-center gap-3"
            onClick={() => setCurrentPage('HOME')}
          >
            {data.config.logoUrl ? (
              <img src={data.config.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <i className="fa-solid fa-globe text-gold"></i>
            )}
            {!data.config.logoUrl && <span>WorldClass</span>}
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
            
            {/* Language Switcher (Flag Dropdown) */}
            <div className="relative ml-4 border-l border-gray-700 pl-4">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <img 
                  src={`https://flagcdn.com/24x18/${currentLangObj.flagCode || currentLangObj.code}.png`} 
                  alt={currentLangObj.label}
                  className="h-4 w-6 object-cover rounded-sm"
                />
                <i className={`fa-solid fa-chevron-down text-[10px] text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-40 bg-white shadow-xl rounded-md overflow-hidden py-1 z-50 animate-fade-in-down border border-gray-100">
                  <div className="text-xs font-bold text-gray-400 px-4 py-2 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                    Select Language
                  </div>
                  {data.config.supportedLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${currentLang === lang.code ? 'bg-blue-50 text-ocean' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <img 
                        src={`https://flagcdn.com/24x18/${lang.flagCode || lang.code}.png`} 
                        alt={lang.label}
                        className="h-3 w-5 object-cover rounded-sm shadow-sm"
                      />
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
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
             {/* Mobile Language List */}
             <div className="flex flex-wrap gap-3 mb-2 border-b border-gray-800 pb-4">
               {data.config.supportedLanguages.map(lang => (
                 <button 
                   key={lang.code}
                   onClick={() => setLang(lang.code)}
                   className={`flex items-center gap-2 px-3 py-2 rounded border ${currentLang === lang.code ? 'border-gold bg-gold/10 text-gold' : 'border-gray-700 text-gray-400'}`}
                 >
                   <img 
                      src={`https://flagcdn.com/24x18/${lang.flagCode || lang.code}.png`} 
                      alt={lang.label}
                      className="h-3 w-5 object-cover rounded-sm"
                    />
                   <span className="text-xs font-bold uppercase">{lang.code}</span>
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

export const PageHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  backgroundImage: string; 
}> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transform transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean/60 via-ocean/40 to-ocean/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-2xl tracking-wide animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <>
            <div className="w-24 h-1 bg-gold mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl md:text-2xl text-gray-100 font-light tracking-widest uppercase drop-shadow-md">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export const Footer: React.FC<{ currentLang: string; navigateTo: (p: PageView) => void }> = ({ currentLang, navigateTo }) => {
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
              <li onClick={() => navigateTo('ABOUT')} className="hover:text-gold cursor-pointer">{t('nav.about', currentLang)}</li>
              <li onClick={() => navigateTo('DESTINATIONS')} className="hover:text-gold cursor-pointer">{t('nav.destinations', currentLang)}</li>
              <li onClick={() => navigateTo('SERVICES')} className="hover:text-gold cursor-pointer">{t('nav.services', currentLang)}</li>
              <li onClick={() => navigateTo('TERMS')} className="hover:text-gold cursor-pointer">{t('footer.terms', currentLang)}</li>
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
      <Footer currentLang={currentLang} navigateTo={setCurrentPage} />
      <CookieBanner lang={currentLang} navigateTo={setCurrentPage} />
    </div>
  );
};
