import { readFileSync } from 'fs';
import common from './common';
import dev from './dev';
import local from './local';
import prod from './prod';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

let conf = {};

console.log(`${process.cwd()}/envs/config.yaml`);

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml}`, 'utf8'),
) as Record<string, any>;

if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

export default () => ({
  ...common,
  ...conf,
  ...yamlConfig,
});
