import { CartContext, CartProduct } from "@/providers/cart";
import Image from 'next/image'
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CarItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CarItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext)

  const decreaseToCart = () => {
    decreaseProductQuantity(product.id)
  }
  
  const increaseToCart = () => {
    increaseProductQuantity(product.id)
  }

  const removeFromCart = () => {
    removeProductFromCart(product.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-[77px] w-[77px] flex items-center justify-center rounded-lg bg-accent">
          <Image
            height={0}
            width={0}
            className="h-auto w-auto max-h-[70%] max-w-[80%]"
            sizes="100vw"
            alt={product.name}
            src={product.imageUrls[0]}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">R$ {product.totalPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={decreaseToCart}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={increaseToCart}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button 
        size="icon" 
        variant="outline"
        onClick={removeFromCart}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
}

export default CartItem;