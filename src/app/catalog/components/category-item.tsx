import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="bg-category-item-gradient rounded-tl-lg rounded-tr-lg flex h-[150px] w-full items-center justify-center">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: "contain"
            }}
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
          <p className="text-sm text-center font-semibold ">{category.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryItem