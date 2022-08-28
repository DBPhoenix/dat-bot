import type { Guild } from 'discord.js';

import GuildAudioPlayer from './guild-audio-player';

const audioPlayers: { [guildId: string]: GuildAudioPlayer } = {};

export function getAudioPlayer(guild: Guild) {
  if (!audioPlayers[guild.id]) {
    audioPlayers[guild.id] = new GuildAudioPlayer(guild);
  }

  return audioPlayers[guild.id];
}
