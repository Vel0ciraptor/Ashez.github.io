import React, { useState, useRef, useLayoutEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Upload, Lock, Unlock } from 'lucide-react';
import { Product } from '../types';
import gsap from 'gsap';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Product Form State
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
  }, [isAuthenticated]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || (newProduct.images?.length === 0)) {
      alert('Por favor completa el nombre, precio y sube al menos una imagen.');
      return;
    }

    const productToAdd: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      category: newProduct.category || 'Varios', // Default to Varios if empty
      price: newProduct.price!,
      discountPrice: hasDiscount ? newProduct.discountPrice : undefined,
      description: newProduct.description || '',
      images: newProduct.images || []
    };

    setProducts(prev => [productToAdd, ...prev]);
    
    // Reset form
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      discountPrice: 0,
      description: '',
      images: []
    });
    setHasDiscount(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    alert('Producto agregado al catálogo correctamente');
  };

  const handleDeleteProduct = (id: string) => {
      if(confirm('¿Estás seguro de eliminar este producto?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="admin-fade bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
                <h2 className="font-bold text-xl mb-6">Agregar Nuevo Producto</h2>
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
                        className="w-full bg-secondary text-white font-bold uppercase py-4 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Publicar Producto
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="admin-fade">
                <h2 className="font-bold text-xl mb-6">Productos Activos ({products.length})</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {products.map(product => (
                        <div key={product.id} className="bg-white p-3 rounded-xl shadow-sm flex gap-4 items-center">
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
                            <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;