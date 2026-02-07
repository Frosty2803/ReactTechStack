import { de } from "./translations/de";
import { en } from "./translations/en";

export interface Messages {
  validation: {
    minLength: string;
    maxLength: string;
    onlyLettersAndNumbers: string;
  };
}

export type Locale = "de" | "en";

const messages: Record<Locale, Messages> = {
  de,
  en,
};

export function t(lang: Locale, path: string): string {
  return (
    path.split(".").reduce<any>((obj, key) => obj?.[key], messages[lang]) ??
    path
  );
}
