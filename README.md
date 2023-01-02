# LZO: i18n

> Support for i18n in Node.js

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

## Installation

```bash
npm install lzo-i18n OR yarn add lzo-i18n
```

## Support for drivers

- [x] Redis
- [x] File System (FS)

## Configuration

Please input the credentials of your Redis server in the `.env` file.

> See the example in the `.env.example` file.

```bash
REDIS_URL="redis://IP:PORT"
REDIS_PORT=6379
REDIS_PASSWORD="PASSWORD"
```

## Usage

```typescript
import { I18n } from 'lzo-i18n';

const locale = I18n({
  locale: {
    main: 'en',
    languages: ['en', 'pt'],
    driver: 'fs'
  }
});

await locale.defineProperty('en', {
    say: {
      hi: 'Hi $1, how are you?',
    }
}); // Define a property in the language.

console.log(await locale.translate('say.hi', 'GuilhermeSantos001')); // Hi GuilhermeSantos001, how are you?
```

## API

`I18n.setLocale(locale: string): Promise<void>`

> Set the current locale

`I18n.getLocale(): string`

> Get the current locale

`I18n.getLocales(): string[]`

> Get all locales

`I18n.resetLocales(): Promise<void>`

> Reset all locales

`I18n.removeLocale(locale: string): Promise<number | void>`

> Remove a locale

`I18n.defineProperty<T>(locale: string, prop: T): Promise<false | void | "OK">`

> Define a property in a locale

`I18n.removeProperty(locale: string, ...props: string[]): Promise<false | void | "OK">`

> Remove a property in a locale

`I18n.translate(phrase: string, ...params: string[]): Promise<string>`

> Translate a phrase in the current locale

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/Lack-Zillions-Over/i18n/blob/main/LICENSE) file for details.

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.12.1-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[gha-badge]: https://github.com/Lack-Zillions-Over/i18n/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Lack-Zillions-Over/i18n/actions/workflows/nodejs.yml
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Lack-Zillions-Over/i18n/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Lack-Zillions-Over
