import { BaseInteraction } from 'discord.js';

import { commands } from '../data';
import { Event } from '../types';

export default {
  name: 'interactionCreate',
  once: false,
  execute(interaction: BaseInteraction) {
    if (!interaction.isChatInputCommand()) return;

    commands[interaction.commandName]
      .execute(interaction)
      .catch((reason) => {
        // eslint-disable-next-line no-console
        console.error(reason);
      });
  },
} as Event;
