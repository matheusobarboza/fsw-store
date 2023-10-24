import { prismaClient } from "@/lib/prisma"
import ProductImages from "../components/product-images"
import ProductInfo from "../components/poduct-info"
import { computeProductTotalPrice } from "@/helpers/products"

interface ProductDetailsProps {
  params: {
    slug: string
  }
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
  })

  if (!product) return null

  return (
    <div className="flex flex-col gap-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  )
}

export default ProductDetails