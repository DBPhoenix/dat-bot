import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => void;
};

type Event = {
  name: string;
  once: boolean;
  execute: (...args: unknown[]) => void;
};
