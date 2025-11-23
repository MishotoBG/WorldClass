
import React, { useState } from 'react';
import { AppData, Destination, BlogPost, SiteConfig, Language, ContentStatus } from '../types';
import { generateDestinationDescription } from '../services/geminiService';
import { generateSlug } from '../utils/helpers';

interface AdminProps {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminProps> = ({ data, updateData, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'DESTINATIONS' | 'BLOG' | 'SETTINGS'>('OVERVIEW');
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Login Handler
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-serif text-ocean mb-2 text-center">Admin Access</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Please login to continue</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (username === 'admin' && password === 'admin') setIsAuth(true);
            else window.alert('Invalid credentials (try admin/admin)');
          }}>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-3 focus:border-gold outline-none"
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 focus:border-gold outline-none"
              />
              <button type="submit" className="w-full bg-ocean text-white py-3 font-bold uppercase tracking-widest hover:bg-gold transition">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- CRUD HELPERS ---

  const handleDeleteDest = (id: string) => {
    if(window.confirm('Are you sure?')) {
      const newDests = data.destinations.filter(d => d.id !== id);
      updateData({ destinations: newDests });
    }
  };

  const handleDeletePost = (id: string) => {
    if(window.confirm('Are you sure?')) {
      const newPosts = data.posts.filter(p => p.id !== id);
      updateData({ posts: newPosts });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ocean text-white hidden md:block">
        <div className="p-6 text-2xl font-serif font-bold text-center border-b border-gray-800">
          <i className="fa-solid fa-gauge mr-2 text-gold"></i> Dashboard
        </div>
        <nav className="mt-6">
          {[
            { id: 'OVERVIEW', icon: 'fa-chart-line', label: 'Overview' },
            { id: 'DESTINATIONS', icon: 'fa-plane', label: 'Destinations' },
            { id: 'BLOG', icon: 'fa-newspaper', label: 'Blog Posts' },
            { id: 'SETTINGS', icon: 'fa-cog', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 hover:bg-gray-800 transition ${activeTab === tab.id ? 'bg-gray-800 border-l-4 border-gold' : ''}`}
            >
              <i className={`fa-solid ${tab.icon} w-6`}></i> {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <button onClick={onLogout} className="text-gray-400 hover:text-white flex items-center gap-2">
            <i className="fa-solid fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gray-800">
            {activeTab === 'OVERVIEW' && 'Welcome Back'}
            {activeTab === 'DESTINATIONS' && 'Manage Destinations'}
            {activeTab === 'BLOG' && 'Manage Blog'}
            {activeTab === 'SETTINGS' && 'Site Configuration'}
          </h1>
          <button className="md:hidden bg-ocean text-white p-2 rounded">Menu</button>
        </header>

        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-sm border-t-4 border-gold">
              <h3 className="text-gray-500 uppercase text-xs font-bold tracking-widest">Total Visitors</h3>
              <p className="text-4xl font-bold text-ocean mt-2">{data.stats.visitors.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 shadow-sm border-t-4 border-green-500">
              <h3 className="text-gray-500 uppercase text-xs font-bold tracking-widest">Active Bookings</h3>
              <p className="text-4xl font-bold text-ocean mt-2">{data.stats.bookings}</p>
            </div>
            <div className="bg-white p-6 shadow-sm border-t-4 border-blue-500">
              <h3 className="text-gray-500 uppercase text-xs font-bold tracking-widest">Destinations Listed</h3>
              <p className="text-4xl font-bold text-ocean mt-2">{data.destinations.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'DESTINATIONS' && (
          <DestinationManager 
            destinations={data.destinations} 
            languages={data.config.supportedLanguages}
            onSave={(newDests) => updateData({ destinations: newDests })}
          />
        )}

        {activeTab === 'BLOG' && (
           <div className="bg-white p-6 shadow-sm">
             <div className="flex justify-between mb-6">
               <h3 className="text-xl font-bold">Posts</h3>
               <button 
                 className="bg-gold text-ocean px-4 py-2 font-bold uppercase text-xs rounded hover:bg-opacity-80"
                 onClick={() => {
                   const title = window.prompt("Post Title (English):");
                   if(title && typeof title === 'string') {
                     const newPost: BlogPost = {
                       id: Date.now().toString(),
                       slug: generateSlug(title),
                       status: 'draft',
                       title,
                       excerpt: 'New draft post...',
                       date: new Date().toLocaleDateString(),
                       image: 'https://source.unsplash.com/random/800x600/?travel'
                     };
                     updateData({ posts: [...data.posts, newPost] });
                   }
                 }}
               >
                 + Add Post
               </button>
             </div>
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b text-sm text-gray-500 uppercase">
                   <th className="py-3">Status</th>
                   <th className="py-3">Title</th>
                   <th className="py-3">Date</th>
                   <th className="py-3 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {data.posts.map(post => (
                   <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {post.status}
                        </span>
                     </td>
                     <td className="py-4 font-medium text-ocean">
                       {post.title}
                       <div className="text-xs text-gray-400">/{post.slug}</div>
                     </td>
                     <td className="py-4 text-gray-500 text-sm">{post.date}</td>
                     <td className="py-4 text-right">
                       <select 
                        value={post.status} 
                        onChange={(e) => {
                          const updated = data.posts.map(p => p.id === post.id ? { ...p, status: e.target.value as ContentStatus } : p);
                          updateData({ posts: updated });
                        }}
                        className="text-xs border p-1 rounded mr-2"
                       >
                         <option value="draft">Draft</option>
                         <option value="published">Published</option>
                       </select>
                       <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700 ml-4"><i className="fa-solid fa-trash"></i></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}

        {activeTab === 'SETTINGS' && (
          <SettingsManager config={data.config} onSave={(cfg) => updateData({ config: cfg })} />
        )}
      </main>
    </div>
  );
};

// Sub-components for Admin

const DestinationManager: React.FC<{ 
  destinations: Destination[]; 
  languages: Language[];
  onSave: (d: Destination[]) => void;
}> = ({ destinations, languages, onSave }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Destination>>({});
  const [editLang, setEditLang] = useState('en'); // 'en' or 'bg' etc
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEdit = (dest: Destination) => {
    setEditingId(dest.id);
    try {
      setFormData(JSON.parse(JSON.stringify(dest))); // Deep copy
    } catch(e) {
      setFormData({ ...dest });
    }
    setEditLang('en');
  };

  const handleDelete = (id: string) => {
    if(window.confirm('Delete this destination?')) onSave(destinations.filter(d => d.id !== id));
  };

  const handleGenerateDescription = async () => {
    const name = editLang === 'en' 
      ? formData.name 
      : formData.translations?.[editLang]?.name || formData.name;

    if (!name) {
      window.alert("Please enter a destination name first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateDestinationDescription(name, editLang);
    
    if (editLang === 'en') {
      setFormData(prev => ({ ...prev, description: desc }));
    } else {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [editLang]: {
            ...prev.translations?.[editLang],
            description: desc
          }
        }
      }));
    }
    setIsGenerating(false);
  };

  const handleNameChange = (val: string) => {
    handleInputChange('name', val);
    // Auto-generate slug only in EN and if slug is empty or matches old name
    if (editLang === 'en' && !editingId) {
      setFormData(prev => ({ ...prev, slug: generateSlug(val) }));
    }
  };

  // Handle input changes based on selected language
  const handleInputChange = (field: string, value: any) => {
    if (editLang === 'en') {
      // For English (default fields)
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      // For other languages (translations)
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [editLang]: {
            ...prev.translations?.[editLang],
            [field]: value
          }
        }
      }));
    }
  };

  const getInputValue = (field: string) => {
    if (editLang === 'en') return (formData as any)[field] || '';
    return formData.translations?.[editLang]?.[field] || '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update
      onSave(destinations.map(d => d.id === editingId ? { ...d, ...formData } as Destination : d));
    } else {
      // Create
      const newDest = { 
        ...formData, 
        id: Date.now().toString(), 
        slug: formData.slug || generateSlug(formData.name || ''),
        status: formData.status || 'draft',
        image: formData.image || 'https://source.unsplash.com/random/800x600/?travel' 
      } as Destination;
      onSave([...destinations, newDest]);
    }
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{editingId ? 'Edit Destination' : 'Add New Destination'}</h3>
          <div className="flex gap-2 bg-gray-100 p-1 rounded">
            {languages.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setEditLang(lang.code)}
                className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1 ${editLang === lang.code ? 'bg-ocean text-white' : 'text-gray-500'}`}
              >
                <img src={`https://flagcdn.com/20x15/${lang.flagCode || lang.code}.png`} className="w-4 h-3 object-cover" alt="" />
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
             <label className="text-xs text-gray-500 font-bold uppercase">Name</label>
             <input 
                className="border p-2 rounded w-full" 
                placeholder={`Name (${editLang})`} 
                value={getInputValue('name')} 
                onChange={e => handleNameChange(e.target.value)}
                required={editLang === 'en'}
              />
          </div>
          
          <div className="md:col-span-1">
             <label className="text-xs text-gray-500 font-bold uppercase">Region</label>
             <input 
              className="border p-2 rounded w-full" 
              placeholder={`Region (${editLang})`}
              value={getInputValue('region')}
              onChange={e => handleInputChange('region', e.target.value)}
              required={editLang === 'en'}
            />
          </div>

          {/* English Only Fields (Shared) */}
          {editLang === 'en' && (
            <>
              <div className="md:col-span-1">
                <label className="text-xs text-gray-500 font-bold uppercase">Slug (URL)</label>
                <input 
                  className="border p-2 rounded w-full bg-gray-50" 
                  placeholder="url-slug" 
                  value={formData.slug || ''} 
                  onChange={e => setFormData({...formData, slug: generateSlug(e.target.value)})}
                />
              </div>
               <div className="md:col-span-1">
                <label className="text-xs text-gray-500 font-bold uppercase">Status</label>
                <select 
                  className="border p-2 rounded w-full"
                  value={formData.status || 'draft'}
                  onChange={e => setFormData({...formData, status: e.target.value as ContentStatus})}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div className="md:col-span-1">
                <label className="text-xs text-gray-500 font-bold uppercase">Price</label>
                <input 
                  className="border p-2 rounded w-full" 
                  placeholder="Price (USD)" 
                  type="number" 
                  value={formData.price || ''} 
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div className="md:col-span-1">
                <label className="text-xs text-gray-500 font-bold uppercase">Type</label>
                <select 
                  className="border p-2 rounded w-full" 
                  value={formData.type || 'Luxury'} 
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Relaxation">Relaxation</option>
                </select>
              </div>
              <div className="md:col-span-2">
                 <label className="text-xs text-gray-500 font-bold uppercase">Image URL</label>
                 <input 
                  className="border p-2 rounded w-full" 
                  placeholder="Image URL" 
                  value={formData.image || ''} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                />
              </div>
            </>
          )}
          
          <div className="md:col-span-2 relative">
             <label className="text-xs text-gray-500 font-bold uppercase">Description</label>
             <textarea 
              className="border p-2 rounded w-full h-24" 
              placeholder={`Description (${editLang})`}
              value={getInputValue('description')}
              onChange={e => handleInputChange('description', e.target.value)}
              required={editLang === 'en'}
            />
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="absolute right-2 bottom-2 bg-purple-600 text-white text-xs px-2 py-1 rounded hover:bg-purple-700 flex items-center gap-1"
            >
              {isGenerating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
              AI Generate ({editLang.toUpperCase()})
            </button>
          </div>
          
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-gold text-ocean px-6 py-2 font-bold uppercase text-sm rounded">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({});}} className="text-gray-500 px-6 py-2">Cancel</button>}
          </div>
        </form>
        {editLang !== 'en' && <p className="text-xs text-gray-400 mt-2">* Editing translation for {editLang.toUpperCase()}. Shared fields (Status, Slug, Price, Type, Image) must be edited in EN.</p>}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white p-4 shadow-sm flex gap-4 items-center">
            <img src={dest.image} alt={dest.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-ocean">{dest.name}</h4>
                 <span className={`text-[10px] uppercase font-bold px-1 rounded ${dest.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  {dest.status || 'draft'}
                </span>
              </div>
              <p className="text-xs text-gray-500">Slug: /{dest.slug}</p>
              <p className="text-xs text-gray-500">${dest.price} - {dest.type}</p>
              <div className="flex gap-1 mt-1">
                 {languages.map(l => (
                   <span key={l.code} className={`text-[10px] px-1 rounded ${dest.translations?.[l.code] || l.code === 'en' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
                     {l.code.toUpperCase()}
                   </span>
                 ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(dest)} className="text-blue-500"><i className="fa-solid fa-edit"></i></button>
              <button onClick={() => handleDelete(dest.id)} className="text-red-500"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsManager: React.FC<{ config: SiteConfig; onSave: (c: SiteConfig) => void }> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangLabel, setNewLangLabel] = useState('');
  const [newFlagCode, setNewFlagCode] = useState('');
  const [activeLangTab, setActiveLangTab] = useState('en');

  const handleChange = (key: keyof SiteConfig, val: string) => {
    setLocalConfig(prev => ({ ...prev, [key]: val }));
  };

  const handleContentChange = (field: string, val: string) => {
     if (activeLangTab === 'en') {
       setLocalConfig(prev => ({ ...prev, [field]: val }));
     } else {
       setLocalConfig(prev => ({
         ...prev,
         translations: {
           ...prev.translations,
           [activeLangTab]: {
             ...prev.translations?.[activeLangTab],
             [field]: val
           }
         }
       }));
     }
  };

  const getContentValue = (field: string) => {
    if (activeLangTab === 'en') return (localConfig as any)[field];
    return localConfig.translations?.[activeLangTab]?.[field] || '';
  };

  const addLanguage = () => {
    if(newLangCode && newLangLabel) {
      const exists = localConfig.supportedLanguages.find(l => l.code === newLangCode);
      if(!exists) {
        setLocalConfig(prev => ({
          ...prev,
          supportedLanguages: [...prev.supportedLanguages, { 
            code: newLangCode.toLowerCase(), 
            label: newLangLabel,
            flagCode: newFlagCode.toLowerCase() || newLangCode.toLowerCase()
          }]
        }));
        setNewLangCode('');
        setNewLangLabel('');
        setNewFlagCode('');
      }
    }
  };

  const removeLanguage = (code: string) => {
    if (code === 'en') return;
    setLocalConfig(prev => ({
      ...prev,
      supportedLanguages: prev.supportedLanguages.filter(l => l.code !== code)
    }));
  };

  return (
    <div className="bg-white p-8 shadow-sm max-w-4xl">
      <h3 className="text-xl font-bold mb-6">Theme & Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="font-bold text-gray-500 text-sm uppercase">Appearance</h4>
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Primary Color (Ocean)</label>
             <div className="flex gap-4 items-center">
               <input type="color" value={localConfig.primaryColor} onChange={(e) => handleChange('primaryColor', e.target.value)} />
               <span className="text-gray-500 text-sm">{localConfig.primaryColor}</span>
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Color (Gold)</label>
             <div className="flex gap-4 items-center">
               <input type="color" value={localConfig.secondaryColor} onChange={(e) => handleChange('secondaryColor', e.target.value)} />
               <span className="text-gray-500 text-sm">{localConfig.secondaryColor}</span>
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Logo URL</label>
             <input className="w-full border p-2 rounded text-sm" placeholder="https://..." value={localConfig.logoUrl || ''} onChange={(e) => handleChange('logoUrl', e.target.value)} />
             {localConfig.logoUrl && <img src={localConfig.logoUrl} alt="Preview" className="h-10 mt-2 object-contain" />}
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Favicon URL</label>
             <input className="w-full border p-2 rounded text-sm" placeholder="https://.../icon.png" value={localConfig.faviconUrl || ''} onChange={(e) => handleChange('faviconUrl', e.target.value)} />
          </div>

          <hr className="my-6" />
          
          <h4 className="font-bold text-gray-500 text-sm uppercase">Languages</h4>
          <div className="space-y-2">
            {localConfig.supportedLanguages.map(lang => (
              <div key={lang.code} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/20x15/${lang.flagCode || lang.code}.png`} alt="" className="w-4 h-3 rounded-sm shadow-sm"/>
                  <span>{lang.label} ({lang.code})</span>
                  {localConfig.defaultLanguage === lang.code && <span className="text-[10px] bg-gold text-white px-1 rounded">DEFAULT</span>}
                </div>
                <div className="flex gap-3 text-xs">
                  <button 
                     onClick={() => handleChange('defaultLanguage', lang.code)}
                     className={`${localConfig.defaultLanguage === lang.code ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-ocean'}`}
                  >
                    Set Default
                  </button>
                  {lang.code !== 'en' && <button onClick={() => removeLanguage(lang.code)} className="text-red-500">Remove</button>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4 items-center">
            <input className="border p-2 text-sm w-16" placeholder="Code" value={newLangCode} onChange={e => setNewLangCode(e.target.value)} maxLength={2} />
            <input className="border p-2 text-sm flex-1" placeholder="Label (e.g. French)" value={newLangLabel} onChange={e => setNewLangLabel(e.target.value)} />
            <input className="border p-2 text-sm w-20" placeholder="Flag (gb)" value={newFlagCode} onChange={e => setNewFlagCode(e.target.value)} maxLength={2} />
            <button onClick={addLanguage} className="bg-gray-200 px-3 py-2 text-sm font-bold rounded hover:bg-gray-300">+</button>
          </div>
        </div>

        {/* Content Editing */}
        <div className="space-y-6">
          <h4 className="font-bold text-gray-500 text-sm uppercase">Site Content & SEO</h4>
          
          {/* Language Tabs for Content */}
          <div className="flex gap-2 border-b border-gray-200 mb-4">
            {localConfig.supportedLanguages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setActiveLangTab(lang.code)}
                className={`px-3 py-2 text-sm font-bold flex items-center gap-2 ${activeLangTab === lang.code ? 'text-ocean border-b-2 border-ocean' : 'text-gray-400'}`}
              >
                <img src={`https://flagcdn.com/20x15/${lang.flagCode || lang.code}.png`} alt="" className="w-4 h-3 rounded-sm shadow-sm opacity-80"/>
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
            <input className="w-full border p-2 rounded" value={getContentValue('heroTitle')} onChange={(e) => handleContentChange('heroTitle', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">About Text</label>
            <textarea className="w-full border p-2 rounded h-32" value={getContentValue('aboutText')} onChange={(e) => handleContentChange('aboutText', e.target.value)} />
          </div>

           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">SEO Meta Title (Home)</label>
            <input className="w-full border p-2 rounded" value={getContentValue('seoTitle')} onChange={(e) => handleContentChange('seoTitle', e.target.value)} />
          </div>

           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">SEO Meta Description</label>
            <textarea className="w-full border p-2 rounded h-20" value={getContentValue('seoDescription')} onChange={(e) => handleContentChange('seoDescription', e.target.value)} />
          </div>
        </div>
      </div>

      <button 
        onClick={() => onSave(localConfig)}
        className="bg-ocean text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-gold transition mt-8 w-full"
      >
        Save All Changes
      </button>
    </div>
  );
};
