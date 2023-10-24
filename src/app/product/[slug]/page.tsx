import { prismaClient } from "@/lib/prisma"
import ProductImages from "../components/product-images"

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
    <div>
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
    </div>
  )
}

export default ProductDetails