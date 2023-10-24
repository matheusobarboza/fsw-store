import { prismaClient } from "@/lib/prisma"

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
    <h1>{product.name}</h1>
  )
}

export default ProductDetails