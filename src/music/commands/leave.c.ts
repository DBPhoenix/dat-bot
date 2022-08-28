import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../core/types';
import { getAudioPlayer } from '../audio-player-manager';

export default {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Stops playing and leaves Voice Channel.'),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      throw TypeError();
    }

    getAudioPlayer(guild).leave();

    await interaction.reply('Leaving Voice Channel...');
  },
} as Command;
