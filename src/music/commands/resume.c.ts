import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../core/types';
import { getAudioPlayer } from '../audio-player-manager';

export default {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes audio playing.'),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      throw TypeError();
    }

    getAudioPlayer(guild).unpause();

    await interaction.reply('Resumed audio playing.');
  },
} as Command;
