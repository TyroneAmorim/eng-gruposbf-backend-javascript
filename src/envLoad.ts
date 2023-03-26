import * as dotenv from 'dotenv';
import * as path from 'path';
import { env } from 'process';

const fileEnv =
  env.NODE_ENV === 'development' ? '.env.development' : '.env.production';
const pathFile = path.join(__dirname, '../../', fileEnv);

dotenv.config({
  path: pathFile,
});
