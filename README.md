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

## Internacionalização

Por padrão, inclui inglês (default) e português do Brasil. Para adicionar novos locais, basta criar um arquivo em `locales/` (ex: `es.js`).

## Testes

Testes unitários com Jest. Execute:

```
npm test
```

## Licença
MIT
