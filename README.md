# NGateDateTime

Biblioteca JavaScript minimalista para manipulação de datas e horários, com API moderna, intuitiva e compatível com NGateCore.

## Objetivo
Oferecer parsing, validação, manipulação e exibição de datas/horários de forma eficiente, com suporte a múltiplos idiomas e integração fácil.

## Instalação

```
npm install ngate-datetime
```

## Uso Básico

```js
import { NGateDateTime } from 'ngate-datetime';
const dt = new NGateDateTime("2025-05-22T09:30:00Z");
console.log(dt.format('YYYY-MM-DD HH:mm:ss'));
```

## Exemplos de API

```js
const dt = new NGateDateTime("2025-05-22T09:30:00Z");
const dt2 = new NGateDateTime("2025-11-22T09:30:00Z", { locale: 'pt-BR' });
const newDate = dt.addDays(5).subtractHours(3);
console.log(newDate.format('YYYY-MM-DD HH:mm:ss'));
```

## Internacionalização e Formatação

Por padrão, inclui inglês (default) e português do Brasil. Para adicionar novos locais, basta criar um arquivo em `locales/` (ex: `es.js`).

### Exemplo de formatação com locale e abreviação de mês (token MMM):

```js
const dtPT = new NGateDateTime('2025-05-22T09:30:00Z', { locale: 'pt-BR' });
console.log(dtPT.format('DD MMM YYYY')); // 22 Mai 2025

const dtEN = new NGateDateTime('2025-05-22T09:30:00Z', { locale: 'en' });
console.log(dtEN.format('DD MMM YYYY')); // 22 May 2025
```

- Suporte a tokens: YYYY, MM, DD, HH, mm, ss, MMM, MMMM, ddd, dddd, etc.
- Métodos para manipulação, comparação, diferença, acesso e conversão de datas.

## Exemplos Didáticos

Veja exemplos completos e didáticos em `examples/index.html`.
Cada exemplo mostra o código executado, o resultado esperado e o resultado obtido, cobrindo:
- Data atual
- Parsing e formatação
- Manipulação
- Internacionalização
- Utilitários
- Fallback de locale
- Demonstração de todos os métodos e propriedades

## Testes

Testes unitários com Jest. Execute:

```
npm test
```

## Licença
MIT
