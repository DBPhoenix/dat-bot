import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

export default {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Get development link.'),
  async execute(interaction) {
    await interaction.reply('Join development at https://github.com/DBPhoenix/dat-bot');
  },
} as Command;
