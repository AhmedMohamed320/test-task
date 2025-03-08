// components/ProductCard.jsx
"use client";
import { t } from "i18next";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
    const hasDiscount =
        product.price_before_discount &&
        Number(product.price_before_discount) > Number(product.price);

    const discountPercentage = hasDiscount
        ? Math.round(
            (1 - Number(product.price) / Number(product.price_before_discount)) * 100
        )
        : 0;

    return (
        <div
            className="
        relative rounded-md overflow-hidden 
      "
        >
            {hasDiscount && (
                <div className="absolute top-2 left-2 bg-primaryGreen text-white text-xs py-1 px-2 z-10 rounded-sm">
                    OFF {discountPercentage}%
                </div>
            )}

            <button
                className="
          absolute top-2 right-2 bg-white w-8 h-8 flex justify-center items-center rounded-full 
        "
            >
                <img src="/images/cart.svg" alt="cart" width={15} />
            </button>

            <div className="h-48 flex items-center justify-center bg-[#F4F7F9]">
                <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className=" w-1/2"
                />
            </div>

            <h3 className="mt-4 text-sm font-medium text-gray-800 truncate">
                {product.name}
            </h3>

            <div className="flex items-center gap-2 mt-2">
                <p className="text-sm font-bold text-gray-900">{t("filters.AED")} {product.price}</p>
                {hasDiscount && (
                    <p className="text-xs line-through text-gray-400">
                        {t("filters.AED")} {product.price_before_discount}
                    </p>
                )}
            </div>
        </div>
    );
}
