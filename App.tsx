
import React, { useState, useEffect, useCallback } from 'react';
import { AppWindow, Product, CartItem, User } from './types';
import { BURGERS, DRINKS, DESSERTS } from './constants';
import { osoAi } from './services/geminiService';

// --- Sub-components ---

const TaskbarItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${active ? 'bg-white/20 scale-105' : 'hover:bg-white/10'}`}
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-[10px] font-medium text-white/80">{label}</span>
  </button>
);

const Window: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <div className="fixed inset-4 md:inset-10 glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col z-50 animate-in fade-in zoom-in duration-300">
    <div className="bg-white/10 px-6 py-4 flex items-center justify-between border-b border-white/10">
      <h2 className="text-white font-semibold text-lg flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span>
        {title}
      </h2>
      <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-full transition-colors group">
        <svg className="w-5 h-5 text-white/50 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 text-white custom-scrollbar">
      {children}
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<AppWindow | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Trigger AI suggestion if it's the first item
    if (cart.length === 0) {
      handleAiSuggestion(product);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleAiSuggestion = async (product: Product) => {
    setLoadingAi(true);
    const result = await osoAi.analyzeOrder([product]);
    setAiResponse(`OsoAI sugiere: ${result.suggestion}. Motivo: ${result.reasoning}`);
    setLoadingAi(false);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser: User = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        newUser.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUser(newUser);
        alert(`¡Registro exitoso! Ubicación detectada: ${newUser.location.lat.toFixed(4)}, ${newUser.location.lng.toFixed(4)}`);
      }, (err) => {
        setUser(newUser);
        alert("Registro exitoso, pero no pudimos obtener tu ubicación.");
      });
    } else {
      setUser(newUser);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="h-screen w-screen os-gradient relative overflow-hidden flex flex-col items-center">
      
      {/* OS Wallpaper/Desktop Area */}
      <div className="flex-1 w-full relative p-8 flex flex-wrap gap-8 items-start justify-center md:justify-start content-start">
        
        {/* Desktop Icons */}
        <button onClick={() => setActiveWindow('menu')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-3xl">🍔</span>
          </div>
          <span className="text-white text-xs font-medium shadow-sm">Menú</span>
        </button>

        <button onClick={() => setActiveWindow('cart')} className="flex flex-col items-center gap-2 group w-24 relative">
          <div className="w-16 h-16 rounded-2xl bg-green-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-3xl">🛒</span>
          </div>
          <span className="text-white text-xs font-medium shadow-sm">Carrito</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-4 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>

        <button onClick={() => setActiveWindow('ai')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-3xl">🐻</span>
          </div>
          <span className="text-white text-xs font-medium shadow-sm">OsoAI</span>
        </button>

        <button onClick={() => setActiveWindow('profile')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-3xl">👤</span>
          </div>
          <span className="text-white text-xs font-medium shadow-sm">{user ? 'Perfil' : 'Registro'}</span>
        </button>
      </div>

      {/* Windows Layer */}
      {activeWindow === 'menu' && (
        <Window title="Carta de Las Hamburguesas del Oso" onClose={() => setActiveWindow(null)}>
          <div className="space-y-12">
            <section>
              <h3 className="text-2xl font-bold mb-6 text-orange-400 border-b border-orange-400/30 pb-2">Nuestras Hamburguesas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BURGERS.map(b => (
                  <div key={b.id} className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors border border-white/5 p-4 group">
                    <img src={b.image} alt={b.name} className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                    <h4 className="text-xl font-bold mb-1">{b.name}</h4>
                    <p className="text-white/60 text-sm mb-3 h-10 overflow-hidden">{b.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {b.ingredients?.map(ing => (
                        <span key={ing} className="bg-white/10 text-[10px] px-2 py-0.5 rounded-full">{ing}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-400">${b.price} MXN</span>
                      <button onClick={() => addToCart(b)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        Añadir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 text-blue-400 border-b border-blue-400/30 pb-2">Refrescos Familia Coca-Cola</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {DRINKS.map(d => (
                  <div key={d.id} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <img src={d.image} alt={d.name} className="w-full h-24 object-contain mb-2 rounded" />
                    <h4 className="font-bold text-sm mb-1">{d.name}</h4>
                    <p className="text-orange-400 font-bold mb-2">${d.price} MXN</p>
                    <button onClick={() => addToCart(d)} className="bg-blue-500/30 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs w-full transition-all">
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 text-pink-400 border-b border-pink-400/30 pb-2">Postres Especiales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {DESSERTS.map(p => (
                  <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <img src={p.image} alt={p.name} className="w-full h-24 object-cover mb-2 rounded" />
                    <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                    <p className="text-orange-400 font-bold mb-2">${p.price} MXN</p>
                    <button onClick={() => addToCart(p)} className="bg-pink-500/30 hover:bg-pink-500 text-white px-3 py-1 rounded-md text-xs w-full transition-all">
                      Añadir
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Window>
      )}

      {activeWindow === 'cart' && (
        <Window title="Tu Pedido" onClose={() => setActiveWindow(null)}>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
              <span className="text-6xl">🦗</span>
              <p className="text-lg">Tu carrito está vacío. ¡El oso tiene hambre!</p>
              <button onClick={() => setActiveWindow('menu')} className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                Ver Menú
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 h-full">
              <div className="flex-1 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-white/40 text-sm">x{item.quantity} - ${item.price} c/u</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-400">${item.price * item.quantity} MXN</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-xs hover:underline">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full lg:w-80 space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-xl font-bold">Resumen</h3>
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${cartTotal} MXN</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Envío</span>
                    <span>$35 MXN</span>
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex justify-between text-xl font-bold text-orange-400">
                    <span>Total</span>
                    <span>${cartTotal + 35} MXN</span>
                  </div>
                  <button className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20">
                    Finalizar Pedido
                  </button>
                </div>

                {aiResponse && (
                  <div className="bg-purple-500/20 border border-purple-500/30 p-4 rounded-xl animate-pulse">
                    <p className="text-sm italic">🐻 {aiResponse}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Window>
      )}

      {activeWindow === 'profile' && (
        <Window title={user ? "Mi Perfil" : "Registro de Cliente"} onClose={() => setActiveWindow(null)}>
          {!user ? (
            <div className="max-w-md mx-auto">
              <p className="text-center text-white/60 mb-8">Únete a la manada y recibe promociones exclusivas.</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                  <input name="name" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Tu nombre..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input name="email" type="email" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="correo@ejemplo.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección de Entrega</label>
                  <textarea name="address" required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none h-24" placeholder="Calle, número, colonia..."></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-bold transition-all mt-4">
                  Registrarme y Compartir Ubicación
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg">🐻</div>
              <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
              <p className="text-white/40 mb-6">{user.email}</p>
              
              <div className="text-left space-y-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Dirección</p>
                  <p>{user.address}</p>
                </div>
                {user.location && (
                  <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Coordenadas de Entrega</p>
                      <p className="text-sm font-mono">{user.location.lat.toFixed(5)}, {user.location.lng.toFixed(5)}</p>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setUser(null)} className="mt-8 text-red-400 hover:underline text-sm">Cerrar Sesión</button>
            </div>
          )}
        </Window>
      )}

      {activeWindow === 'ai' && (
        <Window title="OsoAI Assistant" onClose={() => setActiveWindow(null)}>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">🤖</div>
              <div>
                <h3 className="text-xl font-bold">¡Hola! Soy OsoAI</h3>
                <p className="text-white/50">Tu gestor de pedidos inteligente.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                disabled={loadingAi}
                onClick={async () => {
                  setLoadingAi(true);
                  const msg = await osoAi.getManagerAdvice("Dime algo motivacional para el staff hoy");
                  setAiResponse(msg || "");
                  setLoadingAi(false);
                }}
                className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 text-left transition-all group"
              >
                <span className="text-2xl mb-2 block group-hover:scale-125 transition-transform">💡</span>
                <h4 className="font-bold mb-1">Motivación del Día</h4>
                <p className="text-sm text-white/40">Recibe un consejo para el equipo.</p>
              </button>

              <button 
                disabled={loadingAi}
                onClick={async () => {
                  setLoadingAi(true);
                  const msg = await osoAi.getManagerAdvice("¿Cuál es la hamburguesa más popular sugerida por temporada?");
                  setAiResponse(msg || "");
                  setLoadingAi(false);
                }}
                className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 text-left transition-all group"
              >
                <span className="text-2xl mb-2 block group-hover:scale-125 transition-transform">📈</span>
                <h4 className="font-bold mb-1">Tendencias</h4>
                <p className="text-sm text-white/40">Análisis inteligente del mercado.</p>
              </button>
            </div>

            {loadingAi ? (
              <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : aiResponse && (
              <div className="bg-white/10 p-6 rounded-3xl border border-white/20 whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-bottom-4">
                {aiResponse}
              </div>
            )}
          </div>
        </Window>
      )}

      {/* Taskbar */}
      <div className="w-full h-20 glass-panel border-t border-white/10 flex items-center justify-between px-6 z-40 backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-2xl">
            🍎
          </button>
          <div className="flex gap-2">
            <TaskbarItem icon="🍔" label="Menú" active={activeWindow === 'menu'} onClick={() => setActiveWindow('menu')} />
            <TaskbarItem icon="🛒" label="Carrito" active={activeWindow === 'cart'} onClick={() => setActiveWindow('cart')} />
            <TaskbarItem icon="🐻" label="OsoAI" active={activeWindow === 'ai'} onClick={() => setActiveWindow('ai')} />
            <TaskbarItem icon="👤" label="Perfil" active={activeWindow === 'profile'} onClick={() => setActiveWindow('profile')} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-white font-medium">
               {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </span>
             <span className="text-white/40 text-[10px] font-bold tracking-tighter uppercase">
               OsoOS v1.0
             </span>
          </div>
          <div className="flex gap-4">
             <span className="text-xl">📶</span>
             <span className="text-xl">🔋</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
