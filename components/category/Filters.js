"use client";
import i18n from "@/i18n";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Direction, Range, getTrackBackground } from "react-range";

export default function Filters({
    filterData,
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    priceRange,
    setPriceRange,
    onApplyFilters,
    onClearAll,
    isMobile = false,
}) {
    const { t } = useTranslation();
    const [priceValues, setPriceValues] = useState(() => {
        const v1 = priceRange.min || filterData.min_and_max_price.min_price;
        const v2 = priceRange.max || filterData.min_and_max_price.max_price;
        return [Math.min(v1, v2), Math.max(v1, v2)];
    });
    const minPrice = Number(filterData.min_and_max_price.min_price);
    const maxPrice = Number(filterData.min_and_max_price.max_price);
    
    // دائمًا استخدم LeftToRight للمكون نفسه لتجنب مشاكل الـ RTL
    const isRTL = i18n.language === "ar";
    
    const toggleCategory = (catId) => {
        setSelectedCategories((prev) => {
            if (prev[0] === catId) {
                return [];
            }
            return [catId];
        });
    };

    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };
    
    const handlePriceChange = (values) => {
        const sorted = [...values].sort((a, b) => a - b);
        setPriceValues(sorted);
        setPriceRange({ min: sorted[0], max: sorted[1] });
    };

    const handleFinalPriceChange = (values) => {
        setPriceValues(values);
        setPriceRange({ min: values[0], max: values[1] });
    };

    return (
        <div className="p-4 flex flex-col gap-6">
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-2xl text-black">
                        {t("filters.categories")}
                    </p>
                </div>

                <div className="flex flex-col gap-3 mt-3 max-h-40 overflow-y-auto">
                    {filterData.categories.map((cat) => (
                        <label
                            key={cat.id}
                            className="inline-flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={selectedCategories.includes(cat.id)}
                                onChange={() => toggleCategory(cat.id)}
                            />
                            <div
                                className="
                                    w-5 h-5 rounded border border-gray-300 
                                    peer-checked:bg-primaryGreen 
                                    peer-checked:border-primaryGreen
                                    relative transition-colors flex justify-center items-center
                                "
                            >
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr />

            <div>
                <p className="font-semibold text-2xl mb-3">
                    {t("filters.price")}
                </p>
                
                <div className="px-2 py-4" dir="ltr">
                    <Range
                        step={1}
                        min={minPrice}
                        max={maxPrice}
                        values={priceValues}
                        onChange={handlePriceChange}
                        onFinalChange={handleFinalPriceChange}
                        direction={Direction.LeftToRight} 
                        renderTrack={({ props, children }) => {
                            const { key, ...restProps } = props;
                            
                            return (
                                <div
                                    key={key} 
                                    {...restProps} 
                                    className="h-2 w-full rounded-md"
                                    style={{
                                        ...restProps.style,
                                        background: getTrackBackground({
                                            values: priceValues,
                                            colors: ["#d1d5db", "#3e4e42", "#d1d5db"],
                                            min: minPrice,
                                            max: maxPrice,
                                            direction: Direction.LeftToRight
                                        })
                                    }}
                                >
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props }) => {
                            const { key, ...restProps } = props;
                            
                            return (
                                <div
                                    key={key}
                                    {...restProps} 
                                    className="h-5 w-5 rounded-full bg-primaryGreen shadow-md border-2 border-white focus:outline-none hover:h-6 hover:w-6 transition-all"
                                    style={{
                                        ...restProps.style,
                                        zIndex: 10,
                                        boxShadow: "0 0 0 1px rgba(62, 78, 66, 0.2)"
                                    }}
                                />
                            );
                        }}
                    />

                    <div dir={isRTL ? "rtl" : "ltr"} className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <span>{t("filters.price")}</span>
                        <span>{`${t("filters.AED")} ${priceValues[0]}`}</span>
                        <span>-</span>
                        <span>{`${t("filters.AED")} ${priceValues[1]}`}</span>
                    </div>
                </div>
            </div>

            <hr />

            {filterData.attributes.map((attr) => (
                <div key={attr.id}>
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-2xl text-black">
                            {attr.name}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {attr.values.map((val) => (
                            <label
                                key={val}
                                className="inline-flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={selectedSizes.includes(val)}
                                    onChange={() => toggleSize(val)}
                                />
                                <div
                                    className="
                                        w-5 h-5 rounded border border-gray-300 
                                        peer-checked:bg-primaryGreen 
                                        peer-checked:border-primaryGreen
                                        transition-colors flex justify-center items-center
                                    "
                                >
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm">{val}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex gap-2 mt-6">
                {isMobile && (
                    <button
                        onClick={onClearAll}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded bg-white"
                    >
                        {t("filters.clearAll")}
                    </button>
                )}

                <button
                    onClick={onApplyFilters}
                    className="flex-1 px-4 py-2 bg-primaryGreen text-white rounded"
                >
                    {t("filters.apply")}
                </button>
            </div>
        </div>
    );
}