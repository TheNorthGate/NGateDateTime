// Testes unitários usando a versão compilada UMD
const NGateDateTime = require('../dist/ngate-datetime.js').NGateDateTime;

describe('NGateDateTime (unit)', () => {
  it('deve instanciar com data válida', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(dt).toBeInstanceOf(NGateDateTime);
  });

  it('deve permitir encadeamento de métodos', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(() => dt.addDays(2).subtractHours(1)).not.toThrow();
  });

  it('deve formatar corretamente (stub)', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(typeof dt.format('YYYY-MM-DD')).toBe('string');
  });

  it('deve fazer parsing dinâmico de DD/MM/YYYY', () => {
    const dt = new NGateDateTime('22/05/2025', { format: 'DD/MM/YYYY' });
    expect(dt.getFullYear()).toBe(2025);
    expect(dt.getMonth()).toBe(5);
    expect(dt.getDate()).toBe(22);
  });

  it('deve fazer parsing dinâmico de MM-YYYY', () => {
    const dt = new NGateDateTime('12-2024', { format: 'MM-YYYY' });
    expect(dt.getFullYear()).toBe(2024);
    expect(dt.getMonth()).toBe(12);
  });

  it('deve fazer parsing dinâmico de YY/MM/DD', () => {
    const dt = new NGateDateTime('25/05/22', { format: 'YY/MM/DD' });
    expect(dt.getFullYear()).toBe(2025);
    expect(dt.getMonth()).toBe(5);
    expect(dt.getDate()).toBe(22);
  });

  it('deve formatar datas em diferentes formatos', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(dt.format('DD/MM/YYYY')).toBe('22/05/2025');
    expect(dt.format('YYYY-MM-DD')).toBe('2025-05-22');
    expect(dt.format('MM/YYYY')).toBe('05/2025');
  });

  it('deve manipular datas corretamente', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    dt.addDays(1);
    expect(dt.getDate()).toBe(23);
    dt.subtractDays(2);
    expect(dt.getDate()).toBe(21);
    dt.addMonths(1);
    expect(dt.getMonth()).toBe(6);
    dt.addYears(1);
    expect(dt.getFullYear()).toBe(2026);
  });

  it('deve validar datas corretamente', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(dt.isValid()).toBe(true);
    const dt2 = new NGateDateTime('data-invalida');
    expect(dt2.isValid()).toBe(false);
  });

  it('deve comparar datas corretamente', () => {
    const dt1 = new NGateDateTime('2025-05-22T09:30:00Z');
    const dt2 = new NGateDateTime('2025-05-23T09:30:00Z');
    expect(dt1.isBefore(dt2)).toBe(true);
    expect(dt2.isAfter(dt1)).toBe(true);
    expect(dt1.isSameDay(dt1)).toBe(true);
    expect(dt1.isSameMonth(dt2)).toBe(true);
    expect(dt1.isSameYear(dt2)).toBe(true);
  });

  it('deve suportar internacionalização', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z', { locale: 'pt-BR' });
    expect(dt.options.locale).toBe('pt-BR');
    expect(dt.format('DD/MM/YYYY')).toBe('22/05/2025');
    dt.setLocale('en');
    expect(dt.options.locale).toBe('en');
  });

  it('deve suportar métodos utilitários', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    expect(typeof dt.toISOString()).toBe('string');
    expect(typeof dt.toDate()).toBe('object');
    expect(typeof dt.toString()).toBe('string');
  });
});
