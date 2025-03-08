"use client";

import React, { useState, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import useFilterData from "../../hooks/useFilterData";
import useProducts from "../../hooks/useProducts";
import Filters from "./Filters";
import { ChevronsLeft, ChevronsRight, Heart, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";
import i18n from "@/i18n";
import ProductCard from "./ProductCard";

export default function CategoriesPage() {
    const { t } = useTranslation();
    const isRTL = i18n.language === "ar";
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const {
        filterData,
        loading: filterLoading,
        error: filterError,
    } = useFilterData(i18n.language);

    const {
        products,
        pagination,
        loading: productsLoading,
        error: productsError,
        fetchProducts,
    } = useProducts();

    const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
    const [tempSelectedSizes, setTempSelectedSizes] = useState([]);
    const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 0 });

    const [appliedCategories, setAppliedCategories] = useState([]);
    const [appliedSizes, setAppliedSizes] = useState([]);
    const [appliedPriceRange, setAppliedPriceRange] = useState({
        min: 0,
        max: 0,
    });

    useEffect(() => {
        fetchProducts({}, i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        if (
            filterData &&
            filterData.categories &&
            filterData.categories.length > 0 &&
            appliedCategories.length === 0
        ) {
            const firstCatId = filterData.categories[0].id;
            setAppliedCategories([firstCatId]);
            setTempSelectedCategories([firstCatId]);

            const body = {
                categories_ids: [firstCatId],
            };
            fetchProducts(body, i18n.language);
        }
    }, [filterData, appliedCategories, fetchProducts, i18n.language]);

    const handleApplyFilters = () => {
        setAppliedCategories(tempSelectedCategories);
        setAppliedSizes(tempSelectedSizes);
        setAppliedPriceRange(tempPriceRange);

        const body = {
            categories_ids: tempSelectedCategories,
            attributres_product: tempSelectedSizes.map((val) => ({
                id: 1,
                value: val,
            })),
            min_price: tempPriceRange.min,
            max_price: tempPriceRange.max,
        };
        fetchProducts(body, i18n.language);

        setShowMobileFilter(false);
    };

    const handleClearAll = () => {
        setTempSelectedCategories([]);
        setTempSelectedSizes([]);
        setTempPriceRange({ min: 0, max: 0 });

        setAppliedCategories([]);
        setAppliedSizes([]);
        setAppliedPriceRange({ min: 0, max: 0 });

        fetchProducts({}, i18n.language);
    };

    const handlePageChange = (newPage) => {
        const body = {
            categories_ids: appliedCategories,
            attributres_product: appliedSizes.map((val) => ({
                id: 1,
                value: val,
            })),
            min_price: appliedPriceRange.min,
            max_price: appliedPriceRange.max,
            page: newPage,
        };
        fetchProducts(body, i18n.language);
    };

    const selectedCategoryObject = filterData?.categories?.find(
        (cat) => cat.id === appliedCategories[0]
    );
    const selectedCategoryName = selectedCategoryObject?.name;

    return (
        <div className=" mx-auto">
            <CategoryHeader categoryName={selectedCategoryName} />

            <div className="md:p-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
                <div className="hidden md:block w-1/4">
                    {filterLoading && <p>Loading filters...</p>}
                    {filterError && (
                        <p className="text-red-500">{filterError}</p>
                    )}

                    {filterData && (
                        <Filters
                            filterData={filterData}
                            selectedCategories={tempSelectedCategories}
                            setSelectedCategories={setTempSelectedCategories}
                            selectedSizes={tempSelectedSizes}
                            setSelectedSizes={setTempSelectedSizes}
                            priceRange={tempPriceRange}
                            setPriceRange={setTempPriceRange}
                            onApplyFilters={handleApplyFilters}
                            onClearAll={handleClearAll}
                        />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 px-4 md:px-0">
                        <div>
                            {pagination && (
                                <p className="text-sm text-gray-600">
                                    {t("products.showingResults", {
                                        start: pagination.from,
                                        end: pagination.to,
                                        total: pagination.total,
                                    })}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-4 items-center">
                            <button
                                onClick={handleClearAll}
                                className="text-sm text-gray-600 hover:underline hidden md:block"
                            >
                                {t("filters.clearAll")}
                            </button>
                            <button
                                onClick={() => setShowMobileFilter(true)}
                                className="flex items-center justify-center gap-2 bg-[#F2F5F2] rounded-md w-9 h-9 md:hidden"
                            >
                                <img
                                    src="/images/filter-icon.svg"
                                    alt="filter"
                                />
                            </button>
                        </div>
                    </div>

                    {productsLoading && (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryGreen"></div>
                        </div>
                    )}

                    {products && products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0">
                                {products.map((prod, index) => (
                                    <ProductCard key={index} product={prod} />
                                ))}
                            </div>

                            <Pagination
                                pagination={pagination}
                                handlePageChange={handlePageChange}
                                isRTL={isRTL}
                            />
                        </>
                    ) : (
                        !productsLoading && (
                            <div className="text-center py-20">
                                <p className="text-gray-600">
                                    No products found.
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>

            {showMobileFilter && (
                <div className="fixed inset-0 bg-white z-50 overflow-auto md:hidden">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-3xl font-semibold">
                                {t("filters.filterOption")}
                            </p>
                            <button
                                onClick={() => setShowMobileFilter(false)}
                                className="p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <hr />

                        {filterData && (
                            <Filters
                                filterData={filterData}
                                selectedCategories={tempSelectedCategories}
                                setSelectedCategories={
                                    setTempSelectedCategories
                                }
                                selectedSizes={tempSelectedSizes}
                                setSelectedSizes={setTempSelectedSizes}
                                priceRange={tempPriceRange}
                                setPriceRange={setTempPriceRange}
                                onApplyFilters={handleApplyFilters}
                                onClearAll={handleClearAll}
                                isMobile={true}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
