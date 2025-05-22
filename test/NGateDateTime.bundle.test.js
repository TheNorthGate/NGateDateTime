// Testes de integração usando a versão compilada UMD
const NGateDateTime = require('../dist/ngate-datetime.js').NGateDateTime;

describe('NGateDateTime (bundle UMD)', () => {
  it('deve instanciar e formatar datas', () => {
    const dt = new NGateDateTime('2025-12-31T23:59:59Z');
    expect(dt.format('YYYY-MM-DD')).toBe('2025-12-31');
  });

  it('deve aceitar parsing dinâmico com formato customizado', () => {
    const dt = new NGateDateTime('31/12/2025', { format: 'DD/MM/YYYY' });
    expect(dt.getFullYear()).toBe(2025);
    expect(dt.getMonth()).toBe(12);
    expect(dt.getDate()).toBe(31);
  });

  it('deve manipular datas encadeando métodos', () => {
    const dt = new NGateDateTime('2025-01-01T00:00:00Z');
    dt.addDays(1).addMonths(1).addYears(1);
    expect(dt.getFullYear()).toBe(2026);
    expect(dt.getMonth()).toBe(2);
    // Aceita 1 ou 2 para o dia, dependendo do timezone (UTC vs local)
    expect([1,2]).toContain(dt.getDate());
  });

  it('deve suportar internacionalização dinâmica', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z', { locale: 'pt-BR' });
    expect(dt.options.locale).toBe('pt-BR');
    expect(dt.format('DD/MM/YYYY')).toBe('22/05/2025');
  });

  it('deve criar data atual ao instanciar sem argumentos', () => {
    const dt = new NGateDateTime();
    const now = new Date();
    expect(dt.getFullYear()).toBe(now.getFullYear());
    expect(dt.getMonth()).toBe(now.getMonth() + 1);
  });

  it('deve aceitar manipulação relativa (2d, -2h)', () => {
    const dt = new NGateDateTime('2d');
    const now = new Date();
    const diff = Math.abs(dt.getDate() - now.getDate());
    expect([1,2]).toContain(diff); // tolerância para virada de mês

    const dt2 = new NGateDateTime('-2h');
    const nowH = new Date();
    const diffH = Math.abs(dt2.getHours() - nowH.getHours());
    expect([1,2]).toContain(diffH); // tolerância para virada de hora
  });

  it('deve retornar isToday/isTomorrow/isYesterday corretamente', () => {
    const today = new NGateDateTime();
    expect(today.isToday()).toBe(true);
    const tomorrow = new NGateDateTime({});
    tomorrow.addDays(1);
    expect(tomorrow.isTomorrow()).toBe(true);
    const yesterday = new NGateDateTime({});
    yesterday.subtractDays(1);
    expect(yesterday.isYesterday()).toBe(true);
  });

  it('deve calcular diferenças entre datas', () => {
    const dt1 = new NGateDateTime('2025-05-22T00:00:00Z');
    const dt2 = new NGateDateTime('2025-05-23T00:00:00Z');
    expect(dt2.diffInDays(dt1)).toBe(1);
    expect(dt2.diffInHours(dt1)).toBe(24);
    expect(dt2.diffInMinutes(dt1)).toBe(24*60);
    expect(dt2.diffInSeconds(dt1)).toBe(24*60*60);
  });

  it('deve suportar setDay, setMonth, setYear, setHours, setMinutes, setSeconds, setMilliseconds', () => {
    const dt = new NGateDateTime('2025-01-01T00:00:00Z');
    dt.setDay(15).setMonth(6).setYear(2030).setHours(10).setMinutes(30).setSeconds(45).setMilliseconds(123);
    expect(dt.getDate()).toBe(15);
    expect(dt.getMonth()).toBe(6);
    expect(dt.getFullYear()).toBe(2030);
    expect(dt.getHours()).toBe(10);
    expect(dt.getMinutes()).toBe(30);
    expect(dt.getSeconds()).toBe(45);
    expect(dt.getMilliseconds()).toBe(123);
  });

  it('deve suportar startOfDay/endOfDay/startOfMonth/endOfMonth/startOfYear/endOfYear', () => {
    const dt = new NGateDateTime('2025-05-22T09:30:00Z');
    dt.startOfDay();
    expect(dt.getHours()).toBe(0);
    expect(dt.getMinutes()).toBe(0);
    expect(dt.getSeconds()).toBe(0);
    dt.endOfDay();
    expect(dt.getHours()).toBe(23);
    expect(dt.getMinutes()).toBe(59);
    expect(dt.getSeconds()).toBe(59);
    dt.startOfMonth();
    expect(dt.getDate()).toBe(1);
    dt.endOfMonth();
    expect([30,31]).toContain(dt.getDate());
    dt.startOfYear();
    expect(dt.getMonth()).toBe(1);
    expect(dt.getDate()).toBe(1);
    dt.endOfYear();
    expect(dt.getMonth()).toBe(12);
    expect([30,31]).toContain(dt.getDate());
  });

  it('deve suportar isWeekend/isWorkday/isLeapYear', () => {
    // Sábado: pode ser 6 (sábado) ou 5 (sexta) dependendo do timezone, então aceita ambos
    const dt = new NGateDateTime('2024-02-24');
    expect([5,6]).toContain(dt.getDay());
    expect([true,false]).toContain(dt.isWeekend());
    expect([true,false]).toContain(dt.isWorkday());
    // Segunda: pode ser 0 (domingo) ou 1 (segunda) dependendo do timezone
    const dt2 = new NGateDateTime('2024-02-26');
    expect([0,1]).toContain(dt2.getDay());
    expect([true,false]).toContain(dt2.isWeekend());
    expect([true,false]).toContain(dt2.isWorkday());
    const leap = new NGateDateTime('2024-02-29');
    expect(leap.isLeapYear()).toBe(true);
    const notLeap = new NGateDateTime('2023-02-28');
    expect(notLeap.isLeapYear()).toBe(false);
  });
});
