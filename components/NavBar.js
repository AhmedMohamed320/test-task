"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlignJustify, Check, ChevronDown } from "lucide-react";

export default function NavBar() {
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const { t, i18n } = useTranslation();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrolledEnough = scrollY > 50;
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const navLinks = [
        { label: t("header.home") || "Home", href: "/" },
        { label: t("header.collections") || "Collections", href: "/" },
        { label: t("header.categories") || "Categories", href: "/categories" },
        { label: t("header.ourStory") || "Our Story", href: "/" },
        { label: t("header.contactUs") || "Contact Us", href: "/" },
    ];

    const isActiveLink = (href) => {
        return pathname === href;
    };

    const languages = [
        { code: "en", label: t("language.english") || "English" },
        { code: "ar", label: t("language.arabic") || "العربية" },
    ];

    return (
        <nav
            className={`
        md:border-b fixed z-50 top-0 w-full
        transition-colors duration-300
        ${scrolledEnough ? "bg-white border-b" : "bg-transparent md:bg-white"
                }
      `}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img
                            src="/images/LOGO-1.svg"
                            alt="Logo"
                            className="h-10 w-10 object-contain"
                        />
                    </div>

                    <div className="hidden md:flex gap-6">
                        {navLinks.map((link) => {
                            const active = isActiveLink(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`
                    text-gray-700 hover:text-gray-900 pb-1
                    ${active ? "border-b-2 border-current" : ""}
                  `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <img src="/images/cart.svg" alt="cart" />

                        <div className="relative">
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className="border rounded px-2 py-1 outline-none text-sm min-w-[60px] flex gap-4 items-center"
                            >
                                <span>{i18n.language}</span>
                                <ChevronDown
                                    className={`h-4 w-4 mt-1 transition-transform ${langMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {langMenuOpen && (
                                <div
                                    className={`
                    absolute mt-2 bg-white border rounded shadow-md py-1 w-32
                    ${i18n.language === "ar" ? "left-0" : "right-0"}
                  `}
                                >
                                    {languages.map(({ code, label }) => {
                                        const isSelected = i18n.language === code;
                                        return (
                                            <button
                                                key={code}
                                                onClick={() => {
                                                    handleChangeLanguage(code);
                                                    setLangMenuOpen(false);
                                                }}
                                                className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 text-left"
                                            >
                                                <span className="text-sm">{label}</span>
                                                {isSelected && <Check className="h-5 w-5" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`md:hidden md:text-gray-700 ${scrolledEnough ? "text-gray-700" : "text-white"}`}>
                        <AlignJustify />
                    </div>
                </div>
            </div>
        </nav>
    );
}
