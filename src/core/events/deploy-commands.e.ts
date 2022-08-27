import { type Client, REST, Routes } from 'discord.js';

import { commands, config, token } from '../data';
import { Event } from '../types';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    const json = Object.values(commands).map((command) => command.data.toJSON());

    const rest = new REST().setToken(token);

    config.guilds.forEach((guildId) => {
      rest.put(Routes.applicationGuildCommands(client.application!.id, guildId), { body: json });
    });
  },
} as Event;
