"use client";

import { useState } from "react";

export const QUANTITY_INPUT_NAME = "product-quantity";

export function QuantityControls({
  defaultQuantity = 1,
}: {
  defaultQuantity?: number;
}) {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => prev < 1 ? 0 : prev - 1);

  return (
    <div className="flex items-center gap-4">
      <input type="hidden" value={quantity} name={QUANTITY_INPUT_NAME} />
      <button
        className="rounded-lg bg-muted px-3 text-4xl text-muted-foreground"
        type="button"
        onClick={decrement}
      >
        -
      </button>
      <p className="text-xl">{quantity}</p>
      <button
        className="rounded-lg bg-muted px-3 text-3xl text-muted-foreground"
        type="button"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
