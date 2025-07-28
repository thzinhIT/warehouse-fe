"use client";

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

function setUserLocale(locale: string) {
  // Set cookie for the preferred language
  document.cookie = `preferredLanguage=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
  
  // Reload the page to apply the new locale
  window.location.reload();
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    startTransition(() => {
      setUserLocale(newLocale);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90"
          disabled={isPending}
        >
          {isPending ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLanguage?.flag}</span>
              <span className="text-xs font-medium hidden md:inline">
                {currentLanguage?.name}
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              locale === language.code ? 'bg-blue-50 text-blue-700' : ''
            }`}
            disabled={isPending}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
            {locale === language.code && (
              <span className="ml-auto text-blue-500">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}