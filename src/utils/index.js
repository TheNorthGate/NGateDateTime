// Utilitários para parsing, validação e manipulação de datas
// (Stub inicial)

export function parseDate(input, format/*, locale*/) {
  if (input instanceof Date) return new Date(input);
  if (!input) return new Date();

  // Parsing dinâmico se o formato for informado
  if (format && typeof input === 'string') {
    const formatTokens = format.match(/(YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|sss)/g);
    let regexStr = format;
    regexStr = regexStr
      .replace(/YYYY/g, '(\\d{4})')
      .replace(/YY/g, '(\\d{2})')
      .replace(/MM/g, '(\\d{2})')
      .replace(/M/g, '(\\d{1,2})')
      .replace(/DD/g, '(\\d{2})')
      .replace(/D/g, '(\\d{1,2})')
      .replace(/HH/g, '(\\d{2})')
      .replace(/H/g, '(\\d{1,2})')
      .replace(/mm/g, '(\\d{2})')
      .replace(/m/g, '(\\d{1,2})')
      .replace(/ss/g, '(\\d{2})')
      .replace(/s/g, '(\\d{1,2})')
      .replace(/sss/g, '(\\d{3})');
    const regex = new RegExp('^' + regexStr + '$');
    const match = input.match(regex);
    if (match) {
      let year = 1970, month = 0, day = 1, hour = 0, minute = 0, second = 0, ms = 0;
      let i = 1;
      for (const token of formatTokens) {
        const val = parseInt(match[i++], 10);
        switch (token) {
          case 'YYYY': year = val; break;
          case 'YY': year = 2000 + val; break;
          case 'MM': case 'M': month = val - 1; break;
          case 'DD': case 'D': day = val; break;
          case 'HH': case 'H': hour = val; break;
          case 'mm': case 'm': minute = val; break;
          case 'ss': case 's': second = val; break;
          case 'sss': ms = val; break;
        }
      }
      return new Date(year, month, day, hour, minute, second, ms);
    }
  }

  // Heurísticas conhecidas (ISO/RFC)
  if (typeof input === 'string') {
    if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:?\d{2}))?)?$/.test(input)) {
      return new Date(input);
    }
    if (/^[a-zA-Z]{3},/.test(input)) {
      return new Date(input);
    }
  }
  return new Date(input);
}

export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addYears(date, years) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

export function addMinutes(date, minutes) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

export function addSeconds(date, seconds) {
  const d = new Date(date);
  d.setSeconds(d.getSeconds() + seconds);
  return d;
}

export function formatDate(date, format, localeData) {
  if (!isValidDate(date)) return '';
  const year = date.getFullYear();
  const year2 = String(year).slice(-2);
  const month = date.getMonth();
  const day = date.getDate();
  const weekDay = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ms = date.getMilliseconds();
  const lpad = (n, c = 0, l = 2) => String(n).padStart(l, c);
  const names = localeData || { months: [], monthsShort: [], weekdays: [], weekdaysShort: [], weekdaysMin: [] };
  const matches = {
    YY: year2,
    YYYY: year,
    M: month + 1,
    MM: lpad(month + 1, 0, 2),
    MMM: names.monthsShort ? names.monthsShort[month] : '',
    MMMM: names.months ? names.months[month] : '',
    D: day,
    DD: lpad(day, 0, 2),
    d: weekDay,
    dd: names.weekdaysMin ? names.weekdaysMin[weekDay] : '',
    ddd: names.weekdaysShort ? names.weekdaysShort[weekDay] : '',
    dddd: names.weekdays ? names.weekdays[weekDay] : '',
    H: hour,
    HH: lpad(hour, 0, 2),
    m: minute,
    mm: lpad(minute, 0, 2),
    s: second,
    ss: lpad(second, 0, 2),
    sss: lpad(ms, 0, 3)
  };
  const REGEX_FORMAT = /(YYYY|YY|MMMM|MMM|MM|M|DD|D|dddd|ddd|dd|d|HH|H|mm|m|ss|s|sss)/g;
  return format.replace(REGEX_FORMAT, (match) => matches[match] !== undefined ? matches[match] : match);
}

// ... outros utilitários ...
