import { I18n } from "../controllers/index";

const mockData: Record<string, string> = {};

jest.mock('fs', () => {
  return {
    writeFileSync: jest.fn((
      path: string,
      raw: string,
    ) => {
      return mockData[path] = raw;
    }),
    existsSync: jest.fn((path: string) => {
      return mockData[path];
    }),
    readFileSync: jest.fn((
      path: string
    ) => {
      return mockData[path];
    }),
    mkdirSync: jest.fn(),
    unlinkSync: jest.fn((path: string) => {
      delete mockData[path];
    }),
  }
});

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {
    return {
      set: jest.fn((key: string, value: string) => {
        return mockData[key] = value;
      }),
      get: jest.fn((key: string) => {
        return mockData[key];
      }),
      del: jest.fn((key: string) => {
        delete mockData[key];
        return true;
      }),
    }
  });
});

describe('I18n Suite Tests', () => {
  describe('Driver - File System', () => {
    let locale: I18n;

    beforeAll(() => {
      locale = new I18n({
        locale: {
          main: 'en',
          languages: ['en', 'pt'],
          driver: 'fs',
        }
      });
    });

    test('should translate phrase', async () => {
      await expect(locale.translate('hello', 'John Doe')).resolves.toBe('Hi John Doe');
    });

    test('should define property', async () => {
      await expect(locale.defineProperty('en', {
        say: {
          bye: 'Bye $1, see you later!',
        }
      })).resolves.toBeDefined();
    });

    test('should translate property', async () => {
      await expect(locale.translate('say.bye', 'John Doe')).resolves.toBe('Bye John Doe, see you later!');
    });

    test('should remove property', async () => {
      await expect(locale.removeProperty('en', 'say')).resolves.toBeDefined();
    });

    test('should not translate property deleted', async () => {
      await expect(locale.translate('say.bye', 'John Doe')).rejects.toBeDefined();
    });
  });

  describe('Driver - Redis', () => {
    let locale: I18n;

    beforeAll(() => {
      locale = new I18n({
        locale: {
          main: 'en',
          languages: ['en', 'pt'],
          driver: 'redis',
        }
      });
    });

    test('should translate phrase', async () => {
      await expect(locale.translate('hello', 'John Doe')).resolves.toBe('Hi John Doe');
    });

    test('should define property', async () => {
      await expect(locale.defineProperty('en', {
        say: {
          bye: 'Bye $1, see you later!',
        }
      })).resolves.toBeDefined();
    });

    test('should translate property', async () => {
      await expect(locale.translate('say.bye', 'John Doe')).resolves.toBe('Bye John Doe, see you later!');
    });

    test('should remove property', async () => {
      await expect(locale.removeProperty('en', 'say')).resolves.toBeDefined();
    });

    test('should not translate property deleted', async () => {
      await expect(locale.translate('say.bye', 'John Doe')).rejects.toBeDefined();
    });
  });
});
