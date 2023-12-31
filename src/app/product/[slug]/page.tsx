import { prismaClient } from "@/lib/prisma"
import ProductImages from "../components/product-images"
import ProductInfo from "../components/poduct-info"
import { computeProductTotalPrice } from "@/helpers/products"
import ProductList from "@/components/ui/product-list"
import SectionTitle from "@/components/ui/section-title"

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: params.slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) return null

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />

      <div>
        <SectionTitle>
          Produtos recomendados
        </SectionTitle>
        <ProductList products={product.category.products} />
      </div>
    </div>
  )
}

export default ProductDetails