import { Client, GatewayIntentBits } from 'discord.js';
import { glob } from 'glob';
import { resolve } from 'path';

import { commands, token } from './src/core/data';
import type { Command, Event } from './src/core/types';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const files = glob.sync('dist/src/**/*.[c,e].js');
console.log(files);

files.forEach((file) => {
  // Is Command file?
  if (file.endsWith('.c.js')) {
    const command = require(resolve(file)).default as Command;
    console.log(command);

    commands[command.data.name] = command;
  }

  // Is Event file?
  if (file.endsWith('.e.js')) {
    const event = require(resolve(file)).default as Event;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
});

client.login(token);
