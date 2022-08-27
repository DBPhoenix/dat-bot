import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
} as Command;
