import { config } from 'dotenv';

import { I18n, Config } from '../controllers/index';

config();

export default (options: Config) => {
  return new I18n(options);
};
