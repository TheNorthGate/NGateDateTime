import { parseDate, isValidDate, addDays, addMonths, addYears, addHours, addMinutes, addSeconds, formatDate } from './utils/index.js';

// Importação estática dos locais para garantir que sejam incluídos no bundle
import enLocale from './locales/en.js';
import ptBRLocale from './locales/pt-BR.js';

const LOCALES = {
  'en': enLocale,
  'pt-BR': ptBRLocale
};

function resolveLocale(locale) {
  if (!locale) return 'en';
  if (LOCALES[locale]) return locale;
  if (locale.startsWith('pt')) return 'pt-BR';
  return 'en';
}

function pad(n, l = 2) {
  return String(n).padStart(l, '0');
}

export class NGateDateTime {
  constructor(input, options = {}) {
    this.options = {
      locale: resolveLocale(options.locale),
      timezone: options.timezone || 'UTC',
      format: options.format || null
    };
    this._localeData = LOCALES[this.options.locale];
    this._date = this._parseInput(input);
  }

  _parseInput(input) {
    if (!input || (typeof input === 'object' && !input.format)) {
      return new Date();
    }
    if (typeof input === 'string' && input.match(/^[+-]?\d+[dhms]$/)) {
      // Ex: '2d', '-2h' para manipulação relativa
      const now = new Date();
      const match = input.match(/([+-]?\d+)([dhms])/);
      const value = parseInt(match[1], 10);
      const unit = match[2];
      switch (unit) {
        case 'd': return addDays(now, value);
        case 'h': return addHours(now, value);
        case 'm': return addMinutes(now, value);
        case 's': return addSeconds(now, value);
        default: return now;
      }
    }
    // Parsing com formatos conhecidos
    return parseDate(input, this.options.format, this.options.locale);
  }

  addDays(days) {
    this._date = addDays(this._date, days);
    return this;
  }
  subtractDays(days) {
    return this.addDays(-days);
  }
  addMonths(months) {
    this._date = addMonths(this._date, months);
    return this;
  }
  subtractMonths(months) {
    return this.addMonths(-months);
  }
  addYears(years) {
    this._date = addYears(this._date, years);
    return this;
  }
  subtractYears(years) {
    return this.addYears(-years);
  }
  addHours(hours) {
    this._date = addHours(this._date, hours);
    return this;
  }
  subtractHours(hours) {
    return this.addHours(-hours);
  }
  addMinutes(minutes) {
    this._date = addMinutes(this._date, minutes);
    return this;
  }
  subtractMinutes(minutes) {
    return this.addMinutes(-minutes);
  }
  addSeconds(seconds) {
    this._date = addSeconds(this._date, seconds);
    return this;
  }
  subtractSeconds(seconds) {
    return this.addSeconds(-seconds);
  }

  startOfDay() {
    this._date.setHours(0, 0, 0, 0);
    return this;
  }
  endOfDay() {
    this._date.setHours(23, 59, 59, 999);
    return this;
  }
  startOfMonth() {
    this._date.setDate(1);
    this._date.setHours(0, 0, 0, 0);
    return this;
  }
  endOfMonth() {
    this._date.setMonth(this._date.getMonth() + 1, 0);
    this._date.setHours(23, 59, 59, 999);
    return this;
  }
  startOfYear() {
    this._date.setMonth(0, 1);
    this._date.setHours(0, 0, 0, 0);
    return this;
  }
  endOfYear() {
    this._date.setMonth(11, 31);
    this._date.setHours(23, 59, 59, 999);
    return this;
  }

  isWeekend() {
    const d = this._date.getDay();
    return d === 0 || d === 6;
  }
  isWorkday() {
    return !this.isWeekend();
  }
  isLeapYear() {
    const y = this._date.getFullYear();
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }
  isValid() {
    return isValidDate(this._date);
  }
  isFuture() {
    return this._date > new Date();
  }
  isPast() {
    return this._date < new Date();
  }
  isToday() {
    const now = new Date();
    return this._date.toDateString() === now.toDateString();
  }
  isTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this._date.toDateString() === tomorrow.toDateString();
  }
  isYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this._date.toDateString() === yesterday.toDateString();
  }
  isSameDay(other) {
    const d = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date.toDateString() === d.toDateString();
  }
  isSameMonth(other) {
    const d = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date.getFullYear() === d.getFullYear() && this._date.getMonth() === d.getMonth();
  }
  isSameYear(other) {
    const d = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date.getFullYear() === d.getFullYear();
  }
  isAfter(other) {
    const d = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date > d;
  }
  isBefore(other) {
    const d = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date < d;
  }
  isBetween(a, b) {
    const dA = a instanceof NGateDateTime ? a._date : new Date(a);
    const dB = b instanceof NGateDateTime ? b._date : new Date(b);
    return this._date >= dA && this._date <= dB;
  }

  getDay() { return this._date.getDay(); }
  getMonth() { return this._date.getMonth() + 1; }
  getFullYear() { return this._date.getFullYear(); }
  getHours() { return this._date.getHours(); }
  getMinutes() { return this._date.getMinutes(); }
  getSeconds() { return this._date.getSeconds(); }
  getMilliseconds() { return this._date.getMilliseconds(); }
  getDate() { return this._date.getDate(); }

  day() { return this.getDay(); }
  month() { return this.getMonth(); }
  year() { return this.getFullYear(); }
  hours() { return this.getHours(); }
  minutes() { return this.getMinutes(); }
  seconds() { return this.getSeconds(); }
  milliseconds() { return this.getMilliseconds(); }
  date() { return this.getDate(); }
  fullYear() { return this.getFullYear(); }

  setDay(day) { this._date.setDate(day); return this; }
  setMonth(month) { this._date.setMonth(month - 1); return this; }
  setYear(year) { this._date.setFullYear(year); return this; }
  setHours(hours) { this._date.setHours(hours); return this; }
  setMinutes(min) { this._date.setMinutes(min); return this; }
  setSeconds(sec) { this._date.setSeconds(sec); return this; }
  setMilliseconds(ms) { this._date.setMilliseconds(ms); return this; }

  setLocale(locale) {
    this.options.locale = resolveLocale(locale);
    this._localeData = LOCALES[this.options.locale];
    return this;
  }
  static registerLocale(localeName, localeData) {
    LOCALES[localeName] = localeData;
  }
  useLocale(locale) {
    const resolved = resolveLocale(locale);
    this.options.locale = resolved;
    this._localeData = LOCALES[resolved];
    return this;
  }

  format(fmt) {
    const d = this._date;
    if (!isValidDate(d)) return '';
    let f = fmt || this.options.format || 'YYYY-MM-DD HH:mm:ss';
    // Usa a função utilitária formatDate para suportar tokens como MMM, MMMM, etc.
    return formatDate(d, f, this._localeData);
  }

  difference(other) {
    const otherDate = other instanceof NGateDateTime ? other._date : new Date(other);
    return this._date - otherDate;
  }
  diffInDays(other) {
    return Math.floor(this.difference(other) / 86400000);
  }
  diffInHours(other) {
    return Math.floor(this.difference(other) / 3600000);
  }
  diffInMinutes(other) {
    return Math.floor(this.difference(other) / 60000);
  }
  diffInSeconds(other) {
    return Math.floor(this.difference(other) / 1000);
  }
  diffInMilliseconds(other) {
    return this.difference(other);
  }

  toDate() {
    return new Date(this._date);
  }
  toISOString() {
    return this._date.toISOString();
  }
  toString() {
    return this._date.toString();
  }
}

// Expor para uso global em browser UMD
if (typeof window !== 'undefined') {
  window.NGateDateTime = NGateDateTime;
  window.NGateDateTime.registerLocale = NGateDateTime.registerLocale;
  // Registro automático de todos os window.*Locale globais
  Object.keys(window).forEach(function(key) {
    if (/^[a-z]{2,}Locale$/.test(key) && typeof window[key] === 'object') {
      const localeName = key.replace('Locale', '');
      NGateDateTime.registerLocale(localeName, window[key]);
    }
  });
}
