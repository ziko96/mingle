import { readFileSync } from 'fs';
import { join } from 'path';

export const sslConfig = {
  key: readFileSync(join(process.cwd(), 'ssl', 'private.key')),
  cert: readFileSync(join(process.cwd(), 'ssl', 'certificate.crt')),
  ca: readFileSync(join(process.cwd(), 'ssl', 'ca_bundle.crt'))
};