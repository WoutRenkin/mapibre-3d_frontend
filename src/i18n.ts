import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import JSON5 from "json5";

import Backend from "i18next-chained-backend";
import HTTPBackend from "i18next-http-backend";
import CacheBackend from "i18next-localstorage-backend";
//import { i18nInterceptor } from "./interceptors";

const VERSION = "0.1.1";

const CacheBackendOptions = {
  prefix: `i18next_${import.meta.env.VITE_NAME || "_te"}_${
    import.meta.env.VITE_APP_VERSION || ""
  }_`,
  expirationTime: 7 * 24 * 60 * 60 * 1000,
  defaultVersion: VERSION,
  versions: {},
  store: localStorage,
};
const HTTPBackendOptions = {
  loadPath: "/locales/{{lng}}/{{ns}}.json5",
  parse: JSON5.parse,
  allowMultiLoading: false,
  crossDomain: false,
  withCredentials: false,
  overrideMimeType: false,
  queryStringParams: { v: VERSION },
  reloadInterval: false,
};

const backends = [
  CacheBackend, // primary
  HTTPBackend, // fallback
];

const backendOptions = [CacheBackendOptions, HTTPBackendOptions];
const [firstAvailableLanguage] = import.meta.env.VITE_LANGUAGES?.split(",") || [
  "en",
];

//If Development REMOVE local caching!
if (import.meta.env.DEV) {
  backends.shift();
  backendOptions.shift();
}

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      lng: firstAvailableLanguage,
      // do not load a fallback
      fallbackLng: false,
      debug: import.meta.env.DEV,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        backends: backends,
        backendOptions: backendOptions,
      },
    },
    (err, t) => {
      if (err)
        return console.error(
          "something went wrong loading translations for",
          i18n.language,
          err
        );
      //i18nInterceptor(i18n.language);
      console.log("Language", i18n.language, "loaded:", t("title"));
      return true;
    }
  );

export default i18n;
