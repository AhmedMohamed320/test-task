'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const handleChangeLanguage = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
<>
</>
  );
}
