'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DiscountBadge from "@/components/ui/discount-badge"
import { ProductWithTotalPrice } from "@/helpers/products"

import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useState } from "react"

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >
}

const ProductInfo = ({
  product: {
    basePrice,
    description,
    discountPercentage,
    name,
    totalPrice
  }
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <DiscountBadge >
            {discountPercentage}
          </DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={decreaseQuantity}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={increaseQuantity}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm opacity-60 text-justify">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">Adicionar ao carrinho</Button>
        
      <div className="flex items-center justify-between bg-accent px-5 py-2 mt-5 rounded-lg">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">MBPacket</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  )
}

export default ProductInfo