import { ActivityType, Client } from 'discord.js';

import { Event } from '../types';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    client.user?.setActivity('/link', { type: ActivityType.Listening });
  },
} as Event;
