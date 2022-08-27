import { Client, GatewayIntentBits } from 'discord.js';
import { token } from './secret.json';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(token);
