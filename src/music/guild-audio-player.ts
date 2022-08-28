import {
  AudioPlayer,
  AudioPlayerStatus,
  AudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import { Guild, TextChannel } from 'discord.js';
import { videoInfo } from 'ytdl-core';

export default class GuildAudioPlayer extends AudioPlayer {
  private connection: VoiceConnection | null = null;

  private textChannel?: TextChannel;

  private queue: [videoInfo, AudioResource][] = [];

  constructor(
    private guild: Guild,
  ) {
    super();

    this.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);

      this.log('Something went wrong, playing next song!');
      this.next();
    });

    this.on(AudioPlayerStatus.Idle, () => {
      this.next();
    });
  }

  public connect(textChannel: TextChannel, voiceChannelId: string) {
    this.textChannel = textChannel;

    this.connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: this.guild.id,
      adapterCreator: this.guild.voiceAdapterCreator,
    });

    this.connection!.subscribe(this);
  }

  public enqueue(info: videoInfo, resource: AudioResource) {
    if (!this.connection) {
      this.stop();
    }

    this.queue.push([info, resource]);

    if (this.state.status === AudioPlayerStatus.Idle) {
      this.next();
    }
  }

  public leave() {
    this.connection?.destroy();
    this.stop();

    this.connection = null;
    this.textChannel = undefined;
    this.queue = [];
  }

  private log(message: string) {
    this.textChannel?.send(message);
  }

  private next() {
    if (this.queue.length === 0) {
      this.log('Queue is empty, pausing...');
      return;
    }

    const [info, song] = this.queue.shift()!;

    this.log(`Now playing ${info.videoDetails.title}`);
    super.play(song);
  }
}
