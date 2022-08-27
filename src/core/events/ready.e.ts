import type { Client } from 'discord.js';

import { Event } from '../types';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    // eslint-disable-next-line no-console
    console.log(`Ready! Logged in as ${client.user!.tag}`);
  },
} as Event;
