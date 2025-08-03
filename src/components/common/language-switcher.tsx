"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", localName: "English", flag: "🇺🇸" },
  { code: "vi", name: "Vietnamese", localName: "Tiếng Việt", flag: "🇻🇳" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common.language");
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      // Set cookie for language preference
      document.cookie = `preferredLanguage=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      // Reload page to apply new locale
      window.location.reload();
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-auto px-2 gap-2"
          disabled={isPending}
          title={t("switch")}
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs">{currentLanguage?.flag}</span>
          <span className="sr-only">{t("switch")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`cursor-pointer ${
              locale === language.code ? "bg-accent" : ""
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.localName}</span>
            {locale === language.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
