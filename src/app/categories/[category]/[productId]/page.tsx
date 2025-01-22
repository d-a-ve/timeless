import Image from "next/image";
import { getProduct } from "~/actions/products.actions";
import ProductAddToCart from "~/components/products/product-add-to-cart";
import { formatDate } from "~/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const productResponse = await getProduct(productId);

  if (!productResponse.data || productResponse.error) {
    return <div>Oops, something went wrong. Please try again later.</div>;
  }

  const { data: product } = productResponse;
  // const productAddedTocart = cartCookie
  //   ? JSON.parse(cartCookie).some(
  //       (cart: CartItem) => cart.productId === product.id,
  //     )
  //   : false;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((image, idx) => (
            <div key={image}>
              <Image
                src={image}
                alt={`Image ${idx + 1} showing ${product.title}`}
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Tags: {product.tags.join(", ")}</p>
          <p>USD {product.price}</p>
          <ProductAddToCart product={product} />
        </div>
      </div>
      <div className="space-y-6">
        <h2>Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map(
            ({ rating, comment, date, reviewerName, reviewerEmail }) => (
              <article key={`${reviewerName}-${reviewerEmail}`}>
                <p>{reviewerName}</p>
                <p>{rating > 1 ? `${rating} stars` : `${rating} star`}</p>
                <h3>{comment}</h3>
                <p className="text-sm italic">Posted on {formatDate(date)}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
