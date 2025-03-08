'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CategoryHeader({
    categoryName = '',
    backgroundUrl = '/images/header-bg.svg',
}) {
    const { t } = useTranslation();

    return (
        <div className="overflow-x-hidden mt-0 md:mt-16">
            <div className="relative w-screen h-64">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundUrl})` }}
                />
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative flex items-center justify-center h-full">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        {categoryName}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                <nav className=" text-gray-800 ">
                    <span>{t('header.home')}</span> /{' '}
                    <span>{t('header.categories')}</span> /{' '}
                    <span className="text-gray-800 font-medium">{categoryName}</span>
                </nav>
            </div>
        </div>
    );
}
