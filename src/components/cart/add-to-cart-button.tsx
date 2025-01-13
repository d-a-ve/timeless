"use client";

export function AddToCartButton() {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className="relative z-10"
      type="button"
    >
      Add to cart
    </button>
  );
}
