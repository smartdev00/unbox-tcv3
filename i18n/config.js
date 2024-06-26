import 'intl-pluralrules';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from './translations/en-common.json';
import enLitter from './translations/en.json';
import enFAQ from './translations/en-faq-consumer.json';
import enLegal from './translations/en-legal.json';
import enAbout from './translations/en-about.json';
import enVouchers from './translations/en-vouchers.json';
import enOnboarding from './translations/en-onboarding.json';

import frCommon from './translations/fr-common.json';
import frLitter from './translations/fr.json';
import frFAQ from './translations/fr-faq-consumer.json';
import frLegal from './translations/fr-legal.json';
import frAbout from './translations/fr-about.json';
import frVouchers from './translations/fr-vouchers.json';
import frOnboarding from './translations/fr-onboarding.json';

import nlCommon from './translations/nl-common.json';
import nlLitter from './translations/nl.json';
import nlFAQ from './translations/nl-faq-consumer.json';
import nlLegal from './translations/nl-legal.json';
import nlAbout from './translations/nl-about.json';
import nlVouchers from './translations/nl-vouchers.json';
import nlOnboarding from './translations/nl-onboarding.json';


const resources = {
  en: {
    common: enCommon,
    litter: enLitter,    
    name: "English",
    language: "en",
    faqs: enFAQ,
    legal: enLegal,
    about: enAbout,
    vouchers: enVouchers,
    onboarding: enOnboarding,
  },
  fr: {
    common: frCommon,
    litter: frLitter,    
    name: "Français",
    language: "fr",
    faqs: frFAQ,
    legal: frLegal,
    about: frAbout,
    vouchers: frVouchers,
    onboarding: frOnboarding,
  },
  nl: {
    common: nlCommon,
    litter: nlLitter,    
    name: "Nederlands",
    language: "nl",
    faqs: nlFAQ,
    legal: nlLegal,
    about: nlAbout,
    vouchers: nlVouchers,
    onboarding: nlOnboarding,
  },
}

export const languages = Object.keys(resources).map(r => {
  const { name, language } = resources[r];
  return {
    name, 
    language
  }
});

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false,
    }
  });

  export default i18n;