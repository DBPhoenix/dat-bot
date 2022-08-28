import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../core/types';
import { getAudioPlayer } from '../audio-player-manager';

export default {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses audio playing.'),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      throw TypeError();
    }

    getAudioPlayer(guild).pause();

    await interaction.reply('Paused music playing.');
  },
} as Command;
