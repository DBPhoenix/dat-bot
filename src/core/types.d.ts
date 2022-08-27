import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

type Command = {
  data: SlashCommandBuilder;
  async execute: (interaction: CommandInteraction) => Promise<void>;
};

type Event = {
  name: string;
  once: boolean;
  execute: (...args: unknown[]) => void;
};
