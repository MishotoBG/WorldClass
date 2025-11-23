

import React, { useState, useEffect } from 'react';
import { AppData, Destination, BlogPost, PageView } from '../types';
import { t, l, c } from '../utils/i18n';
import { PageHeader } from '../components/Layout';

interface PageProps {
  data: AppData;
  navigateTo: (page: PageView) => void;
  lang: string;
}

export const HomePage: React.FC<PageProps> = ({ data, navigateTo, lang }) => {
  // Filter published only
  const publishedDestinations = data.destinations.filter(d => d.status === 'published');

  return (
    <>
      {/* Hero Section - Kept separate for the specific CTA button and full screen layout */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-transparent to-transparent z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight">
            {c(data, 'heroTitle', lang)}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light tracking-wide">
            {c(data, 'heroSubtitle', lang)}
          </p>
          <button 
            onClick={() => navigateTo('DESTINATIONS')}
            className="bg-gold text-ocean px-10 py-4 rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-ocean transition-all duration-300 transform hover:scale-105"
          >
            {t('home.book', lang)}
          </button>
        </div>
      </section>

      {/* Features / Stats Section (Why Us) */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-serif text-ocean mb-4">{t('home.why_us', lang)}</h2>
             <div className="w-16 h-1 bg-gold mx-auto"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-6">
                <i className="fa-solid fa-crown text-5xl text-gold mb-6"></i>
                <h3 className="text-xl font-bold text-ocean mb-3">{t('home.why_1_t', lang)}</h3>
                <p className="text-gray-500 leading-relaxed">{t('home.why_1_d', lang)}</p>
              </div>
              <div className="text-center p-6">
                <i className="fa-solid fa-headset text-5xl text-gold mb-6"></i>
                <h3 className="text-xl font-bold text-ocean mb-3">{t('home.why_2_t', lang)}</h3>
                <p className="text-gray-500 leading-relaxed">{t('home.why_2_d', lang)}</p>
              </div>
              <div className="text-center p-6">
                <i className="fa-solid fa-key text-5xl text-gold mb-6"></i>
                <h3 className="text-xl font-bold text-ocean mb-3">{t('home.why_3_t', lang)}</h3>
                <p className="text-gray-500 leading-relaxed">{t('home.why_3_d', lang)}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-ocean mb-4">{t('home.featured', lang)}</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedDestinations.slice(0, 3).map((dest) => (
              <div key={dest.id} className="group cursor-pointer" onClick={() => navigateTo('DESTINATIONS')}>
                <div className="relative overflow-hidden h-80 mb-4 shadow-lg rounded-sm">
                  <img 
                    src={dest.image} 
                    alt={l(dest, 'name', lang)} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white text-ocean font-bold px-4 py-1 text-sm">
                    ${dest.price.toLocaleString()}
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-ocean mb-2 group-hover:text-gold transition-colors">{l(dest, 'name', lang)}</h3>
                <p className="text-gray-500 uppercase tracking-wider text-xs mb-2">{l(dest, 'region', lang)}</p>
                <p className="text-gray-600 line-clamp-2">{l(dest, 'description', lang)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
             <button onClick={() => navigateTo('DESTINATIONS')} className="border border-ocean text-ocean px-8 py-3 uppercase font-bold text-sm tracking-widest hover:bg-ocean hover:text-white transition-colors">
               {t('dest.filters.all', lang)}
             </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-ocean text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <i className="fa-solid fa-quote-left text-gold text-4xl mb-8"></i>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8">
            {t('home.testimonial', lang)}
          </p>
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
              alt="Client" 
              className="w-12 h-12 rounded-full border-2 border-gold"
            />
            <div className="text-left">
              <p className="font-bold text-gold">James Harrington</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t('contact.verified', lang)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const AboutPage: React.FC<PageProps> = ({ data, lang }) => {
  return (
    <div className="bg-white">
      <PageHeader 
        title={t('nav.about', lang)} 
        subtitle={t('about.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-3xl font-serif text-ocean mb-6">{t('about.story', lang)}</h2>
        <p className="text-gray-600 leading-8 mb-12 text-lg">
          {c(data, 'aboutText', lang)}
        </p>

        <h2 className="text-3xl font-serif text-ocean mb-6">{t('about.mission', lang)}</h2>
        <p className="text-gray-600 leading-8 mb-16 text-lg">
          {c(data, 'missionText', lang)}
        </p>

        <h2 className="text-3xl font-serif text-ocean mb-10 text-center">{t('about.team', lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Replaced broken source.unsplash with static IDs */}
          {[
            { id: 1, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop', name: 'Elena Rossi' },
            { id: 2, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop', name: 'Marc Dubois' },
            { id: 3, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop', name: 'Sarah Jenkins' }
          ].map((member) => (
            <div key={member.id} className="text-center">
              <img 
                src={member.img} 
                alt="Team Member" 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <h4 className="font-bold text-ocean">{member.name}</h4>
              <p className="text-gold text-sm uppercase tracking-widest">{t('about.role', lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination: React.FC<{ 
  totalItems: number; 
  itemsPerPage: number; 
  currentPage: number; 
  onPageChange: (p: number) => void; 
  lang: string; 
}> = ({ totalItems, itemsPerPage, currentPage, onPageChange, lang }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-12">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-200 text-ocean hover:bg-ocean hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm uppercase font-bold"
      >
        {t('pagination.prev', lang)}
      </button>
      <span className="px-4 py-2 text-gray-500 text-sm flex items-center">
        {t('pagination.page', lang)} {currentPage} {t('pagination.of', lang)} {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-200 text-ocean hover:bg-ocean hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm uppercase font-bold"
      >
        {t('pagination.next', lang)}
      </button>
    </div>
  );
};

export const DestinationsPage: React.FC<PageProps> = ({ data, lang }) => {
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const publishedDestinations = data.destinations.filter(d => d.status === 'published');
  const filters = ['All', 'Luxury', 'Adventure', 'Cultural', 'Relaxation'];
  
  // Reset page when filter changes
  useEffect(() => setCurrentPage(1), [filter]);

  const filteredDestinations = filter === 'All' 
    ? publishedDestinations 
    : publishedDestinations.filter(d => d.type === filter);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHeader 
        title={t('dest.curated', lang)} 
        subtitle={t('dest.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop"
      />

      <div className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border border-gray-200 text-sm uppercase tracking-widest transition-all ${filter === f ? 'bg-gold text-white border-gold' : 'text-gray-500 hover:border-gold hover:text-gold'}`}
            >
              {f === 'All' ? t('dest.filters.all', lang) : f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
          {currentItems.map(dest => (
            <div key={dest.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img src={dest.image} alt={l(dest, 'name', lang)} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <span className="absolute top-4 left-4 bg-ocean text-white text-xs px-3 py-1 uppercase tracking-wider">{dest.type}</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-ocean font-bold">{l(dest, 'name', lang)}</h3>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">{l(dest, 'region', lang)}</p>
                  </div>
                  <span className="text-gold font-bold text-lg">${dest.price}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{l(dest, 'description', lang)}</p>
                <button className="w-full border border-ocean text-ocean py-3 uppercase text-xs font-bold tracking-widest hover:bg-ocean hover:text-white transition-colors">
                  {t('dest.details', lang)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          totalItems={filteredDestinations.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          lang={lang}
        />
      </div>
    </div>
  );
};

export const ServicesPage: React.FC<{lang: string}> = ({ lang }) => {
  const services = [
    { icon: 'fa-plane', title: 'services.flight', desc: 'services.flight.desc' },
    { icon: 'fa-hotel', title: 'services.hotel', desc: 'services.hotel.desc' },
    { icon: 'fa-passport', title: 'services.visa', desc: 'services.visa.desc' },
    { icon: 'fa-user-shield', title: 'services.insurance', desc: 'services.insurance.desc' },
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title={t('services.title', lang)} 
        subtitle={t('services.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-8 text-center border border-gray-100 hover:border-gold transition-colors duration-300 group">
              <div className="w-16 h-16 bg-ocean text-gold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-gold group-hover:text-white transition-colors">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-ocean mb-3">{t(s.title, lang)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(s.desc, lang)}</p>
            </div>
          ))}
        </div>
        
        {/* Process / Content Filler */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-ocean mb-12">{t('services.how_work', lang)}</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>

             {[1, 2, 3].map((step) => (
               <div key={step} className="relative z-10 flex-1 bg-white md:bg-transparent">
                 <div className="w-16 h-16 bg-ocean text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                   {step}
                 </div>
                 <h4 className="font-bold text-lg mb-2">
                   {t(`services.step${step}_t`, lang)}
                 </h4>
                 <p className="text-sm text-gray-500 px-4">
                   {t(`services.step${step}_d`, lang)}
                 </p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogPage: React.FC<{ data: AppData; lang: string }> = ({ data, lang }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const publishedPosts = data.posts.filter(p => p.status === 'published');
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = publishedPosts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-sand min-h-screen pb-20">
      <PageHeader 
        title={t('blog.title', lang)} 
        subtitle={t('blog.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
      />
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {currentItems.map(post => (
            <div key={post.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img src={post.image} alt={l(post, 'title', lang)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <p className="text-gold text-xs uppercase tracking-widest mb-2">{post.date}</p>
                <h3 className="text-xl font-serif text-ocean mb-3 hover:text-gold cursor-pointer transition-colors">{l(post, 'title', lang)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{l(post, 'excerpt', lang)}</p>
                <span className="text-ocean text-xs font-bold uppercase tracking-widest border-b border-ocean pb-1 cursor-pointer hover:text-gold hover:border-gold transition-colors">{t('blog.read', lang)}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Pagination 
          totalItems={publishedPosts.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          lang={lang}
        />
      </div>
    </div>
  );
};

export const TermsPage: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="bg-white pb-20">
      <PageHeader 
        title={t('terms.title', lang)} 
        subtitle={t('terms.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-2xl font-serif text-ocean mb-4">1. Introduction</h3>
          <p className="mb-6">Welcome to WorldClass Travel. By accessing our website and using our services, you agree to be bound by the following terms and conditions.</p>
          
          <h3 className="text-2xl font-serif text-ocean mb-4">2. Bookings & Payments</h3>
          <p className="mb-6">All bookings are subject to availability. A deposit is required to secure your reservation. Full payment must be made 30 days prior to departure.</p>
          
          <h3 className="text-2xl font-serif text-ocean mb-4">3. Cancellations</h3>
          <p className="mb-6">Cancellations made more than 30 days before departure will receive a 50% refund of the deposit. Cancellations made within 30 days are non-refundable.</p>
          
          <h3 className="text-2xl font-serif text-ocean mb-4">4. Privacy & Data Protection (GDPR)</h3>
          <p className="mb-6">We value your privacy. We collect only necessary data to process your bookings and improve your experience. We do not sell your data to third parties.</p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC<{ lang: string }> = ({ lang }) => {
  // Initialize form data from localStorage if available
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('contact_form_draft');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load draft", e);
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      termsAccepted: false,
      captchaInput: ''
    };
  });

  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('contact_form_draft', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    // Generate random simple numbers for captcha
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits, max 10
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: val }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const { firstName, lastName, email, phone, message, termsAccepted, captchaInput } = formData;
    const sum = parseInt(captchaInput);
    
    // Validation checks
    if(!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !message.trim() || !termsAccepted) {
      setFormStatus('error');
      return;
    }
    
    // Captcha Validation
    if(isNaN(sum) || sum !== (captcha.a + captcha.b)) {
      alert(lang === 'bg' ? 'Грешен отговор на задачата!' : 'Incorrect security answer!');
      setFormStatus('idle');
      return;
    }

    // Success Simulation
    setTimeout(() => {
       setFormStatus('success');
       // Clear draft from storage on success
       localStorage.removeItem('contact_form_draft');
       setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', termsAccepted: false, captchaInput: '' });
       setCaptcha({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
    }, 1000);
  };

  return (
    <div className="bg-white pb-20">
      <PageHeader 
        title={t('contact.title', lang)} 
        subtitle={t('contact.sub', lang)}
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f14012b736a5?q=80&w=2061&auto=format&fit=crop"
      />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-xl overflow-hidden">
          
          {/* Beautiful Form Section */}
          <div className="bg-white p-10 md:p-14">
            <h3 className="text-3xl font-serif text-ocean mb-8 border-b-2 border-gold pb-4 inline-block">{t('contact.plan', lang)}</h3>
            
            {formStatus === 'success' ? (
               <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center animate-fade-in">
                 <i className="fa-solid fa-check-circle text-4xl mb-3"></i>
                 <h4 className="font-bold text-xl">{t('contact.submit_success', lang)}</h4>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                      {t('contact.name_f', lang)} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      className="w-full bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" 
                      required 
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                      {t('contact.name_l', lang)} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      className="w-full bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                      {t('contact.email', lang)} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" 
                      required 
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                      {t('contact.phone', lang)} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-gray-400">(Max 10)</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handlePhoneChange}
                      maxLength={10}
                      className="w-full bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" 
                      required 
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2 group-focus-within:text-gold transition-colors">
                    {t('contact.message', lang)} <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange}
                    rows={5} 
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-lg focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Captcha & Terms */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={formData.termsAccepted} 
                      onChange={handleCheckbox}
                      className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none hover:text-ocean transition-colors">
                      {t('contact.terms', lang)} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                        {t('contact.captcha', lang)}:
                      </label>
                      <div className="text-sm font-bold text-ocean bg-white px-3 py-2 rounded border inline-block min-w-[100px] text-center">
                        {t('contact.captcha_q', lang).replace('{a}', captcha.a.toString()).replace('{b}', captcha.b.toString())}
                      </div>
                    </div>
                    <div className="w-24">
                       <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t('contact.answer', lang)} <span className="text-red-500">*</span></label>
                       <input 
                        type="number" 
                        name="captchaInput" 
                        value={formData.captchaInput} 
                        onChange={handleChange}
                        className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded focus:border-gold outline-none text-center font-bold"
                        required
                      />
                    </div>
                  </div>
                </div>

                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm font-bold animate-pulse">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                    {t('contact.submit_error', lang)}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'} 
                  className={`w-full bg-ocean text-white px-8 py-4 rounded-lg uppercase text-sm font-bold tracking-widest hover:bg-gold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${formStatus === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {formStatus === 'submitting' ? (
                    <span><i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending...</span>
                  ) : t('contact.send', lang)}
                </button>
              </form>
            )}
          </div>
          
          {/* Map/Visual Section */}
          <div className="hidden lg:block h-full min-h-[600px] bg-ocean relative flex items-center justify-center overflow-hidden group">
             <div 
              className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop")' }}
             ></div>
             <div className="absolute inset-0 bg-gradient-to-r from-ocean via-ocean/50 to-transparent"></div>
             
             <div className="relative z-10 p-12 text-white max-w-md">
                <h4 className="font-serif text-4xl mb-6">{t('contact.hq_title', lang)}</h4>
                <div className="space-y-6 text-lg font-light">
                  <p className="flex items-start gap-4">
                    <i className="fa-solid fa-location-dot mt-1 text-gold"></i>
                    <span>123 Luxury Lane<br/>New York, NY 10001<br/>United States</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <i className="fa-solid fa-phone text-gold"></i>
                    <span>+1 (555) 123-4567</span>
                  </p>
                  <p className="flex items-center gap-4">
                    <i className="fa-solid fa-envelope text-gold"></i>
                    <span>concierge@worldclass.com</span>
                  </p>
                </div>
                
                <div className="mt-12 pt-12 border-t border-white/20">
                  <p className="text-sm text-gray-300 mb-4 uppercase tracking-widest">{t('contact.follow', lang)}</p>
                  <div className="flex gap-6 text-2xl">
                    <i className="fa-brands fa-instagram hover:text-gold cursor-pointer transition-colors"></i>
                    <i className="fa-brands fa-twitter hover:text-gold cursor-pointer transition-colors"></i>
                    <i className="fa-brands fa-linkedin hover:text-gold cursor-pointer transition-colors"></i>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};