"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItemType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
  qty: number;
};

type CartContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartCount: number;
  //   updateCartCount: () => void;
  address: string;
  setAddress: (addr: string) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const [cartCount, setCartCount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");

  //   const updateCartCount = () => {
  //     const total = cart.reduce((sum, item) => sum + item.addcount, 0);
  //     setCartCount(total);
  //   };

  useEffect(() => {
    const storedAddress = localStorage.getItem("deliveryAddress");
    const stored = localStorage.getItem("foodCart");

    const parsedDat = !stored ? [] : JSON.parse(stored);
    setCart(parsedDat);

    if (storedAddress) setAddress(storedAddress);
  }, []);

  const setAddressState = (addr: string) => {
    localStorage.setItem("deliveryAddress", addr);
    setAddress(addr);
  };

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cart));
    // updateCartCount();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        /*updateCartCount,*/ address,
        setAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
