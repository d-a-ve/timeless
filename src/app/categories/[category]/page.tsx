import Image from "next/image";
import { getProductsByCategory } from "~/actions/products.actions";
import { AddToCartButton } from "~/components/cart/add-to-cart-button";
import { AppLink } from "~/components/ui/app-link";

export default async function ProductCategoryListPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { data: products, error } = await getProductsByCategory(category);

  if (!products || error) {
    return (
      <div>
        <p>Somthing went wrong, please try again</p>
        <p>{error}</p>
      </div>
    );
  }

  if (products.total === 0) {
    return (
      <div>
        We do not have data for the category you searched for: {category}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-6">
      {products.data.map((product) => (
        <article
          key={product.id}
          className="grid grid-rows-[1fr,auto] overflow-hidden rounded-lg"
        >
          <AppLink
            href={`/categories/${category}/${product.id}`}
            className="grid grid-rows-[auto,1fr] space-y-4"
          >
            <div className="h-64">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={340}
                height={340}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3 px-3">
              <p>{product.title}</p>
              <p>{product.description}</p>
            </div>
          </AppLink>
          <AddToCartButton product={product} />
        </article>
      ))}
    </div>
  );
}
