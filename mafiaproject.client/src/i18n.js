import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/locales/en.json'; 
import translationRU from '../src/locales/ru.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

const savedLanguage = localStorage.getItem('language') || 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
