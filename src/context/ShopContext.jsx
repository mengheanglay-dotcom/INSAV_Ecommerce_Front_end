import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const ShopContext = createContext(null);
export function ShopProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    count: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const refreshCart = async () => {
    try {
      setCart(await api.cart());
    } catch {}
  };
  useEffect(() => {
    Promise.allSettled([
      api.csrf(),
      api.cart().then(setCart),
      api.me().then((d) => setUser(d.user)),
    ]).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = async (id, qty = 1) => {
    const next = await api.addCart(id, qty);
    setCart(next);
    setToast("Added to your cart.");
  };
  const updateCart = async (id, qty) => setCart(await api.updateCart(id, qty));
  const removeFromCart = async (id) => {
    setCart(await api.removeCart(id));
    setToast("Item removed.");
  };
  const login = async (body) => {
    const d = await api.login(body);
    setUser(d.user);
    setToast("Welcome back.");
  };
  const register = async (body) => {
    const d = await api.register(body);
    setUser(d.user);
    setToast("Account created successfully.");
  };
  const logout = async () => {
    await api.logout();
    setUser(null);
    setToast("You have been logged out.");
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        user,
        loading,
        toast,
        setToast,
        refreshCart,
        addToCart,
        updateCart,
        removeFromCart,
        login,
        register,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
export const useShop = () => useContext(ShopContext);
