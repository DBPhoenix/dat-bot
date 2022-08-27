import { Client, GatewayIntentBits } from 'discord.js';
import { glob } from 'glob';
import { resolve } from 'path';

import { commands, token } from './src/core/data';
import type { Command, Event } from './src/core/types';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const files = glob.sync('src/**/*.[c,e].js');

files.forEach((file) => {
  // Is Command file?
  if (file.endsWith('.c.js')) {
    // eslint-disable-next-line
    const command = require(resolve(file)).default as Command;

    commands[command.data.name] = command;
  }

  // Is Event file?
  if (file.endsWith('.e.js')) {
    // eslint-disable-next-line
    const event = require(resolve(file)).default as Event;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
});

client.login(token);
