"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function RootLayoutClient({ children }) {
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.language === "ar") {
            document.documentElement.lang = "ar";
            document.documentElement.dir = "rtl";
        } else {
            document.documentElement.lang = "en";
            document.documentElement.dir = "ltr";
        }
    }, [i18n.language]);

    return <>{children}</>;
}
