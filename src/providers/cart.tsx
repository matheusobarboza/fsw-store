'use client'

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number
}

interface ICartContext {
  products: Product[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDIscount: number
}

const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDIscount: 0,
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDIscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider