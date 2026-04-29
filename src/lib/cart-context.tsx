'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface CartItem {
  sku_code: string;
  slug: string;
  name: string;
  nameEn: string;
  nameJa: string;
  image: string;
  price_range: string;
  category_slug: string;
  quantity: number;
  unitPrice: number;
  options?: {
    size?: string;
    material?: string;
    finishing?: string;
    sizeLabel?: string;
    materialLabel?: string;
    finishingLabel?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (sku_code: string) => void;
  updateQuantity: (sku_code: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'zprintpro-cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveCart(items);
  }, [items, isLoaded]);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = newItem.quantity || 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.sku_code === newItem.sku_code);
      if (existing) {
        return prev.map((i) =>
          i.sku_code === newItem.sku_code ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...newItem, quantity: qty } as CartItem];
    });
  }, []);

  const removeItem = useCallback((sku_code: string) => {
    setItems((prev) => prev.filter((i) => i.sku_code !== sku_code));
  }, []);

  const updateQuantity = useCallback((sku_code: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.sku_code !== sku_code));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.sku_code === sku_code ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
