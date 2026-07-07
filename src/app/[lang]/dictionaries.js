import 'server-only'

const dictionaries = {
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export const locales = ['it', 'en', 'es']
export const defaultLocale = 'it'

export const hasLocale = (locale) => locale in dictionaries

export const getDictionary = async (locale) => dictionaries[locale]()
