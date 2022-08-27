import { Command } from './types';

import * as configJSON from '../../config.json';
import { token as tokenJSON } from '../../secret.json';

export const commands: { [name: string ]: Command } = {};

export const config = configJSON;

export const token = tokenJSON;
