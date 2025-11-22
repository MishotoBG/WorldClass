import React, { useState } from 'react';
import { AppData, Destination, BlogPost, PageView } from '../types';

interface PageProps {
  data: AppData;
  navigateTo: (page: PageView) => void;
}

export const HomePage: React.FC<PageProps> = ({ data, navigateTo }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2940&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-transparent to-transparent z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight">
            {data.config.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light tracking-wide">
            {data.config.heroSubtitle}
          </p>
          <button 
            onClick={() => navigateTo('DESTINATIONS')}
            className="bg-gold text-ocean px-10 py-4 rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-ocean transition-all duration-300 transform hover:scale-105"
          >
            Book Your Journey
          </button>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-ocean mb-4">Featured Destinations</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.destinations.slice(0, 3).map((dest) => (
              <div key={dest.id} className="group cursor-pointer" onClick={() => navigateTo('DESTINATIONS')}>
                <div className="relative overflow-hidden h-80 mb-4">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white text-ocean font-bold px-4 py-1 text-sm">
                    ${dest.price.toLocaleString()}
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-ocean mb-2 group-hover:text-gold transition-colors">{dest.name}</h3>
                <p className="text-gray-500 uppercase tracking-wider text-xs mb-2">{dest.region}</p>
                <p className="text-gray-600 line-clamp-2">{dest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-ocean text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <i className="fa-solid fa-quote-left text-gold text-4xl mb-8"></i>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8">
            "WorldClass didn't just book a trip; they curated a life experience. From the private guides to the hidden culinary gems, every detail was perfection."
          </p>
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
              alt="Client" 
              className="w-12 h-12 rounded-full border-2 border-gold"
            />
            <div className="text-left">
              <p className="font-bold text-gold">James Harrington</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Verified Client</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const AboutPage: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="bg-white">
      <div className="py-20 bg-gray-100 text-center">
        <h1 className="text-5xl font-serif text-ocean">About Us</h1>
      </div>
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h2 className="text-3xl font-serif text-ocean mb-6">Our Story</h2>
        <p className="text-gray-600 leading-8 mb-12 text-lg">
          {data.config.aboutText}
        </p>

        <h2 className="text-3xl font-serif text-ocean mb-6">Our Mission</h2>
        <p className="text-gray-600 leading-8 mb-16 text-lg">
          {data.config.missionText}
        </p>

        <h2 className="text-3xl font-serif text-ocean mb-10 text-center">The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <img 
                src={`https://source.unsplash.com/random/300x300/?portrait,business,${i}`} 
                alt="Team Member" 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <h4 className="font-bold text-ocean">Elena Rossi</h4>
              <p className="text-gold text-sm uppercase tracking-widest">Senior Travel Designer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DestinationsPage: React.FC<PageProps> = ({ data }) => {
  const [filter, setFilter] = useState('All');
  
  const filters = ['All', 'Luxury', 'Adventure', 'Cultural', 'Relaxation'];
  const filteredDestinations = filter === 'All' 
    ? data.destinations 
    : data.destinations.filter(d => d.type === filter);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-ocean py-16 text-center text-white">
        <h1 className="text-4xl font-serif mb-4">Curated Destinations</h1>
        <p className="text-gray-400">Discover your next escape.</p>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border border-gray-200 text-sm uppercase tracking-widest transition-all ${filter === f ? 'bg-gold text-white border-gold' : 'text-gray-500 hover:border-gold hover:text-gold'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map(dest => (
            <div key={dest.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <span className="absolute top-4 left-4 bg-ocean text-white text-xs px-3 py-1 uppercase tracking-wider">{dest.type}</span>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-ocean font-bold">{dest.name}</h3>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">{dest.region}</p>
                  </div>
                  <span className="text-gold font-bold text-lg">${dest.price}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{dest.description}</p>
                <button className="w-full border border-ocean text-ocean py-3 uppercase text-xs font-bold tracking-widest hover:bg-ocean hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServicesPage: React.FC = () => {
  const services = [
    { icon: 'fa-plane', title: 'Flight Booking', desc: 'First-class and private jet charters arranged with precision.' },
    { icon: 'fa-hotel', title: 'Luxury Accommodation', desc: 'Access to exclusive suites and private villas worldwide.' },
    { icon: 'fa-passport', title: 'Visa Assistance', desc: 'Streamlined processing for hassle-free border crossings.' },
    { icon: 'fa-user-shield', title: 'Travel Insurance', desc: 'Comprehensive coverage for total peace of mind.' },
  ];

  return (
    <div className="py-20 container mx-auto px-6">
      <h1 className="text-4xl font-serif text-ocean text-center mb-16">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, idx) => (
          <div key={idx} className="bg-white p-8 text-center border border-gray-100 hover:border-gold transition-colors duration-300">
            <div className="w-16 h-16 bg-ocean text-gold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              <i className={`fa-solid ${s.icon}`}></i>
            </div>
            <h3 className="text-lg font-bold text-ocean mb-3">{s.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BlogPage: React.FC<{ data: AppData }> = ({ data }) => {
  return (
    <div className="bg-sand min-h-screen py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif text-ocean text-center mb-16">Travel Journal</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.posts.map(post => (
            <div key={post.id} className="bg-white">
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-8">
                <p className="text-gold text-xs uppercase tracking-widest mb-2">{post.date}</p>
                <h3 className="text-xl font-serif text-ocean mb-3 hover:text-gold cursor-pointer transition-colors">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-ocean text-xs font-bold uppercase tracking-widest border-b border-ocean pb-1 cursor-pointer">Read Article</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif text-ocean text-center mb-16">Get In Touch</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-50 p-10">
            <h3 className="text-2xl font-serif text-ocean mb-6">Plan Your Trip</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full bg-white p-4 border border-gray-200 focus:border-gold outline-none" />
                <input type="text" placeholder="Last Name" className="w-full bg-white p-4 border border-gray-200 focus:border-gold outline-none" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-white p-4 border border-gray-200 focus:border-gold outline-none" />
              <textarea rows={5} placeholder="Tell us about your dream journey..." className="w-full bg-white p-4 border border-gray-200 focus:border-gold outline-none"></textarea>
              <button className="bg-ocean text-white px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gold transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          {/* Map Placeholder */}
          <div className="h-full min-h-[400px] bg-gray-200 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
               <span className="text-gray-500 font-bold uppercase tracking-widest">
                 <i className="fa-solid fa-map-location-dot mr-2"></i> Google Maps Embedded Here
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};