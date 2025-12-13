import React, { useState, useRef, useLayoutEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Upload, Lock, Unlock, Pencil, RotateCcw, Save, Layout, Package } from 'lucide-react';
import { Product, SiteImages } from '../types';
import gsap from 'gsap';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  siteImages: SiteImages;
  setSiteImages: React.Dispatch<React.SetStateAction<SiteImages>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, siteImages, setSiteImages }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'content'>('products');

  // Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    description: '',
    images: []
  });
  const [hasDiscount, setHasDiscount] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive existing categories for suggestions
  const existingCategories = Array.from(new Set(products.map(p => p.category)));

  // Animations
  useLayoutEffect(() => {
    if(!containerRef.current) return;
    const ctx = gsap.context(() => {
        gsap.fromTo(".admin-fade", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    }, containerRef);
    return () => ctx.revert();
  }, [isAuthenticated, activeTab]);

  // --- Auth Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'c0ntr4s3ñ4*') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // --- Site Image Handlers ---
  const handleSiteImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    section: keyof SiteImages, 
    key: string
  ) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSiteImages(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [key]: reader.result as string
                }
            }));
        };
        reader.readAsDataURL(file);
    }
  };

  // --- Product Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discountPrice' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const limit = 3 - (newProduct.images?.length || 0);
      const filesToProcess = files.slice(0, limit);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct(prev => ({
            ...prev,
            images: [...(prev.images || []), reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      description: product.description,
      images: [...product.images]
    });
    setHasDiscount(!!product.discountPrice);
    setEditingId(product.id);
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setNewProduct({
        name: '',
        category: '',
        price: 0,
        discountPrice: 0,
        description: '',
        images: []
      });
      setHasDiscount(false);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || (newProduct.images?.length === 0)) {
      alert('Por favor completa el nombre, precio y sube al menos una imagen.');
      return;
    }

    if (editingId) {
        // Update existing product
        setProducts(prev => prev.map(p => {
            if (p.id === editingId) {
                return {
                    ...p,
                    name: newProduct.name!,
                    category: newProduct.category || 'Varios',
                    price: newProduct.price!,
                    discountPrice: hasDiscount ? newProduct.discountPrice : undefined,
                    description: newProduct.description || '',
                    images: newProduct.images || []
                };
            }
            return p;
        }));
        alert('Producto actualizado correctamente');
    } else {
        // Create new product
        const productToAdd: Product = {
            id: Date.now().toString(),
            name: newProduct.name!,
            category: newProduct.category || 'Varios',
            price: newProduct.price!,
            discountPrice: hasDiscount ? newProduct.discountPrice : undefined,
            description: newProduct.description || '',
            images: newProduct.images || []
        };
        setProducts(prev => [productToAdd, ...prev]);
        alert('Producto agregado al catálogo correctamente');
    }
    
    // Reset form
    handleCancelEdit();
  };

  const handleDeleteProduct = (id: string) => {
      if(confirm('¿Estás seguro de eliminar este producto?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
          if (editingId === id) {
              handleCancelEdit();
          }
      }
  }

  // --- Auth Screen Render ---
  if (!isAuthenticated) {
    return (
      <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="admin-fade bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-display font-bold text-center mb-2">Acceso Restringido</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Ingresa la contraseña de administrador para gestionar el catálogo.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`w-full bg-gray-50 border ${authError ? 'border-red-500' : 'border-gray-200'} rounded-xl p-4 focus:outline-none focus:border-primary transition-colors`}
                autoFocus
              />
              {authError && <p className="text-red-500 text-xs mt-2 ml-1">Contraseña incorrecta. Intenta nuevamente.</p>}
            </div>
            <button 
              type="submit" 
              className="w-full bg-secondary text-white font-bold uppercase py-4 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <Unlock size={18} /> Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Authenticated Admin Render ---
  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="admin-fade flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl flex items-center gap-3">
                <span className="w-10 h-10 bg-secondary text-white rounded-lg flex items-center justify-center text-xl">⚡</span>
                Panel de Administración
            </h1>
            <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-sm font-bold text-red-500 hover:text-red-700 underline"
            >
                Cerrar Sesión
            </button>
        </div>

        {/* Tabs */}
        <div className="admin-fade flex gap-4 mb-8">
            <button 
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'products' ? 'bg-secondary text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
            >
                <Package size={20} />
                Gestionar Productos
            </button>
            <button 
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'content' ? 'bg-secondary text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
            >
                <Layout size={20} />
                Imágenes del Sitio
            </button>
        </div>

        {activeTab === 'products' ? (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="admin-fade bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-xl">{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                        {editingId && (
                            <button 
                                onClick={handleCancelEdit}
                                className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                            >
                                <RotateCcw size={12} /> Cancelar
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Nombre del Producto</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={newProduct.name}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary"
                                placeholder="Ej. Bufanda Alpaca"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Precio (Bs)</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={newProduct.price || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Categoría</label>
                                <input 
                                    type="text"
                                    name="category" 
                                    list="category-suggestions"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary"
                                    placeholder="Escribe o selecciona..."
                                />
                                <datalist id="category-suggestions">
                                    {existingCategories.map((cat, idx) => (
                                        <option key={idx} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 py-2">
                            <input 
                                type="checkbox" 
                                id="hasDiscount" 
                                checked={hasDiscount} 
                                onChange={(e) => setHasDiscount(e.target.checked)}
                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                            />
                            <label htmlFor="hasDiscount" className="text-sm font-medium text-gray-700">Tiene descuento</label>
                        </div>

                        {hasDiscount && (
                            <div>
                                <label className="block text-xs font-bold uppercase text-red-400 mb-1">Precio con Descuento (Bs)</label>
                                <input 
                                    type="number" 
                                    name="discountPrice" 
                                    value={newProduct.discountPrice || ''}
                                    onChange={handleInputChange}
                                    className="w-full bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 focus:outline-none focus:border-red-500"
                                    placeholder="0.00"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Descripción</label>
                            <textarea 
                                name="description" 
                                value={newProduct.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary"
                                placeholder="Detalles del producto..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Imágenes (Máx 3)</label>
                            <div className="flex gap-2 mb-2">
                                {newProduct.images?.map((img, index) => (
                                    <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={img} className="w-full h-full object-cover" alt="preview" />
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg hover:bg-red-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                {(newProduct.images?.length || 0) < 3 && (
                                    <button 
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
                                    >
                                        <Upload size={20} />
                                    </button>
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden" 
                                accept="image/*" 
                                multiple
                                onChange={handleImageUpload}
                            />
                            <p className="text-[10px] text-gray-400">Las imágenes se guardan temporalmente en tu navegador.</p>
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full text-white font-bold uppercase py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${editingId ? 'bg-primary hover:bg-orange-700' : 'bg-secondary hover:bg-primary'}`}
                        >
                            {editingId ? <Save size={20} /> : <Plus size={20} />} 
                            {editingId ? 'Guardar Cambios' : 'Publicar Producto'}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="admin-fade">
                    <h2 className="font-bold text-xl mb-6">Productos Activos ({products.length})</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {products.map(product => (
                            <div key={product.id} className={`bg-white p-3 rounded-xl shadow-sm flex gap-4 items-center border ${editingId === product.id ? 'border-primary ring-1 ring-primary' : 'border-transparent'}`}>
                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">{product.name}</h4>
                                    <div className="flex gap-2 text-xs">
                                        {product.discountPrice ? (
                                            <>
                                                <span className="text-red-500 font-bold">{product.discountPrice} Bs.</span>
                                                <span className="text-gray-400 line-through">{product.price} Bs.</span>
                                            </>
                                        ) : (
                                            <span className="text-primary font-bold">{product.price} Bs.</span>
                                        )}
                                        <span className="text-gray-400 ml-2">• {product.category}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <button 
                                        onClick={() => handleEditProduct(product)}
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            /* --- SITE CONTENT MANAGEMENT --- */
             <div className="admin-fade space-y-8">
                {/* Portafolio Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-primary" />
                        Sección Portafolio / Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Imagen Central (Grande)</label>
                            <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                <img src={siteImages.portfolio.main} alt="Main" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="text-white" size={32} />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'portfolio', 'main')} />
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-gray-400">Imagen Pequeña Izq.</label>
                             <div className="relative aspect-square bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                <img src={siteImages.portfolio.smallLeft} alt="Small Left" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="text-white" size={24} />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'portfolio', 'smallLeft')} />
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-gray-400">Imagen Pequeña Der.</label>
                             <div className="relative aspect-square bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                <img src={siteImages.portfolio.smallRight} alt="Small Right" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="text-white" size={24} />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'portfolio', 'smallRight')} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-primary" />
                        Sección Sobre Mí / About
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Imagen Principal (Retrato)</label>
                            <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 max-w-xs">
                                <img src={siteImages.about.main} alt="About Main" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="text-white" size={32} />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'about', 'main')} />
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Imagen Flotante (Pequeña)</label>
                            <div className="relative w-40 h-40 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                <img src={siteImages.about.small} alt="About Small" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="text-white" size={24} />
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'about', 'small')} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <ImageIcon size={20} className="text-primary" />
                        Sección Contacto
                    </h2>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Imagen Inferior (Banner)</label>
                        <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                            <img src={siteImages.contact.banner} alt="Contact Banner" className="w-full h-full object-cover" />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                <Upload className="text-white" size={32} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSiteImageUpload(e, 'contact', 'banner')} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;