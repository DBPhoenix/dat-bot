import { Guild } from 'discord.js';
import { config } from '../data';
import { Event } from '../types';

export default {
  name: 'guildCreate',
  once: false,
  execute(guild: Guild) {
    if (!config.guilds.includes(guild.id)) {
      guild.systemChannel?.send('Please ask for permission before using this bot.');
      guild.leave();
    }
  },
} as Event;
