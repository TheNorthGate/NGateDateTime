// Tipagens para NGateDateTime (TypeScript)
export type NGateDateTimeOptions = {
  locale?: string;
  timezone?: string;
  format?: string;
};

export type LocaleData = {
  months: string[];
  weekdays: string[];
  formats: Record<string, string>;
  relative: Record<string, string>;
};
