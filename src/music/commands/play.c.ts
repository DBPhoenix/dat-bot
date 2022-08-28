import { ChannelType, SlashCommandBuilder } from 'discord.js';
import { createAudioResource, StreamType } from '@discordjs/voice';

import ytdl, { validateURL } from 'ytdl-core';

import { Command } from '../../core/types';
import { getAudioPlayer } from '../audio-player-manager';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play the specified link from YouTube.')
    .addStringOption((option) => option
      .setName('url')
      .setDescription('YouTube song link.')
      .setRequired(true)),
  async execute(interaction) {
    const { channel, guild, user } = interaction;

    if (!channel || channel.type !== ChannelType.GuildText || !guild) {
      throw TypeError();
    }

    const guildId = guild.id;
    const member = guild.members.resolve(user.id);

    if (!member) {
      throw TypeError();
    }

    const voiceChannelId = member.voice.channelId;

    if (!voiceChannelId) {
      await interaction.reply('Please join a Voice Channel first.');
      return;
    }

    const player = getAudioPlayer(guild);
    player.connect(channel, voiceChannelId);

    // Play YouTube URL
    const url = interaction.options.get('url', true).value;

    if (typeof url !== 'string' || !guildId) {
      throw TypeError();
    }

    if (!validateURL(url)) {
      await interaction.reply('Invalid URL');
      return;
    }

    const info = await ytdl.getBasicInfo(url);
    const stream = ytdl(url, { filter: (format) => format.container === 'webm', quality: 'highestaudio' });

    const resource = createAudioResource(stream, {
      inputType: StreamType.WebmOpus,
    });

    player.enqueue(info, resource);

    await interaction.reply(`Added to queue.\n${url}!`);
  },
} as Command;
