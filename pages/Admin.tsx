import React, { useState } from 'react';
import { AppData, Destination, BlogPost, SiteConfig } from '../types';
import { generateDestinationDescription } from '../services/geminiService';

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
            else alert('Invalid credentials (try admin/admin)');
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
    if(confirm('Are you sure?')) {
      const newDests = data.destinations.filter(d => d.id !== id);
      updateData({ destinations: newDests });
    }
  };

  const handleDeletePost = (id: string) => {
    if(confirm('Are you sure?')) {
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
                   const title = prompt("Post Title:");
                   if(title) {
                     const newPost: BlogPost = {
                       id: Date.now().toString(),
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
                   <th className="py-3">Title</th>
                   <th className="py-3">Date</th>
                   <th className="py-3 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {data.posts.map(post => (
                   <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-4 font-medium text-ocean">{post.title}</td>
                     <td className="py-4 text-gray-500 text-sm">{post.date}</td>
                     <td className="py-4 text-right">
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

// Sub-components for Admin to keep file cleaner

const DestinationManager: React.FC<{ destinations: Destination[]; onSave: (d: Destination[]) => void }> = ({ destinations, onSave }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Destination>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEdit = (dest: Destination) => {
    setEditingId(dest.id);
    setFormData(dest);
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete this destination?')) onSave(destinations.filter(d => d.id !== id));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      alert("Please enter a destination name first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateDestinationDescription(formData.name);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update
      onSave(destinations.map(d => d.id === editingId ? { ...d, ...formData } as Destination : d));
    } else {
      // Create
      const newDest = { ...formData, id: Date.now().toString(), image: formData.image || 'https://source.unsplash.com/random/800x600/?travel' } as Destination;
      onSave([...destinations, newDest]);
    }
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Destination' : 'Add New Destination'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="border p-2 rounded" 
            placeholder="Name (e.g. Paris)" 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            className="border p-2 rounded" 
            placeholder="Region" 
            value={formData.region || ''} 
            onChange={e => setFormData({...formData, region: e.target.value})}
            required
          />
          <input 
            className="border p-2 rounded" 
            placeholder="Price" 
            type="number" 
            value={formData.price || ''} 
            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
            required
          />
          <select 
            className="border p-2 rounded" 
            value={formData.type || 'Luxury'} 
            onChange={e => setFormData({...formData, type: e.target.value as any})}
          >
            <option value="Luxury">Luxury</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Relaxation">Relaxation</option>
          </select>
          <div className="md:col-span-2 relative">
             <textarea 
              className="border p-2 rounded w-full h-24" 
              placeholder="Description" 
              value={formData.description || ''} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="absolute right-2 bottom-2 bg-purple-600 text-white text-xs px-2 py-1 rounded hover:bg-purple-700 flex items-center gap-1"
            >
              {isGenerating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
              AI Generate
            </button>
          </div>
          <input 
            className="border p-2 rounded md:col-span-2" 
            placeholder="Image URL" 
            value={formData.image || ''} 
            onChange={e => setFormData({...formData, image: e.target.value})}
          />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-gold text-ocean px-6 py-2 font-bold uppercase text-sm rounded">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({});}} className="text-gray-500 px-6 py-2">Cancel</button>}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white p-4 shadow-sm flex gap-4 items-center">
            <img src={dest.image} alt={dest.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <h4 className="font-bold text-ocean">{dest.name}</h4>
              <p className="text-xs text-gray-500">${dest.price} - {dest.type}</p>
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

  const handleChange = (key: keyof SiteConfig, val: string) => {
    setLocalConfig(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="bg-white p-8 shadow-sm max-w-2xl">
      <h3 className="text-xl font-bold mb-6">Theme & Content</h3>
      
      <div className="space-y-6">
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
          <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
          <input className="w-full border p-2 rounded" value={localConfig.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">About Text</label>
          <textarea className="w-full border p-2 rounded h-32" value={localConfig.aboutText} onChange={(e) => handleChange('aboutText', e.target.value)} />
        </div>

        <button 
          onClick={() => onSave(localConfig)}
          className="bg-ocean text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-gold transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};