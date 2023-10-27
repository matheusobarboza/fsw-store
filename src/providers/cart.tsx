'use client'

import { ProductWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number
}

interface ICartContext {
  products: Product[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDIscount: number
  addProductToCart: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDIscount: 0,
  addProductToCart: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    )

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            }
          }

          return cartProduct
        })
      )
      
      return
    }

    setProducts((prev) => [...prev, product])
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
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