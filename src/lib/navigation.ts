import { createNavigation } from 'next-intl/navigation';

export const locales = ['zh', 'en', 'de', 'es', 'fr', 'pt', 'ru'] as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales });