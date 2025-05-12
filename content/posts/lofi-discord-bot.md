---
title: "Build a Lo-fi Cafe for Your Discord Server in Minutes"
excerpt: "Create a chill co-working space on Discord with a bot that plays lo-fi music automatically. Simple Node.js setup with code and deployment steps."
date: "2024-08-05"
readingTime: "4 min read"
coverImage: "discord-lofi-setup"
---

Ever wanted a dedicated chill zone in your Discord server? A virtual space where you and your friends can co-work, relax, or just vibe together with some smooth lo-fi beats playing in the background? Let's build just that!

We'll create a simple Discord bot using Node.js that automatically joins a specific voice channel when someone enters, starts streaming lo-fi music, and politely leaves after a short period of inactivity.

**TL;DR:** The complete code is available on GitHub with a one-click deploy button for Heroku if you want to jump straight in.

## Prerequisites

*   Node.js LTS installed.
*   A Discord account and a server where you have "Manage Server" permissions.
*   Your favorite code editor (like VS Code).

## Setup Steps

1.  **Initialize Your Project:**
    ```bash
    mkdir lofi-bot
    cd lofi-bot
    npm init -y
    npm install discord.js@^12.5.3 dotenv ytdl-core-discord lodash # Using discord.js v12 for compatibility with example
    ```
    *Note: discord.js v12 is used here to match the original post's likely context. Newer versions have significant changes.*

2.  **Create a Discord Bot Application:**
    *   Go to the [Discord Developer Portal](https://discord.com/developers/applications).
    *   Click "New Application". Give it a name (e.g., "Lofi Cafe Bot").
    *   Navigate to the "Bot" tab in the left menu.
    *   Click "Add Bot" and confirm.
    *   Under the bot's username, click "Copy" to get the **Bot Token**. **Keep this secret!**

3.  **Configure Environment Variables:**
    *   Create a file named `.env` in your project root.
    *   Add your bot token:
        ```dotenv
        # .env
        DISCORD_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
        DISCORD_GUILD_ID="YOUR_SERVER_ID_HERE"
        DISCORD_CHANNEL_NAME="lofi-cafe" # Or your desired channel name
        # Find some YouTube lo-fi stream URLs (Live streams work best)
        VOICE_URLS="https://www.youtube.com/watch?v=jfKfPfyJRdk,https://www.youtube.com/watch?v=5qap5aO4i9A"
        ```
    *   Find your Server ID (Right-click server icon -> Copy ID. Enable Developer Mode in Discord settings if needed).
    *   Create a voice channel in your server with the name specified in `DISCORD_CHANNEL_NAME`.

4.  **Invite the Bot:**
    *   Go back to the Developer Portal -> Your Application -> OAuth2 -> URL Generator.
    *   Select the `bot` scope.
    *   In "Bot Permissions," select:
        *   `Connect`
        *   `Speak`
        *   `View Channels`
        *   `Use Voice Activity`
    *   Copy the generated URL at the bottom.
    *   Paste the URL in your browser, select your server, and authorize the bot.

5.  **Ignore Files:**
    *   Create a `.gitignore` file:
        ```gitignore
        # .gitignore
        node_modules/
        .env
        ```

## Coding the Bot

**`client.js`:** Sets up and logs in the Discord client.

```javascript
// client.js
const Discord = require('discord.js');
require('dotenv').config(); // Load variables from .env

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN)
  .catch(err => {
    console.error("Login failed:", err);
    process.exit(1); // Exit if login fails
  });

module.exports = client;
```

**`index.js`:** Contains the main bot logic.

```javascript
// index.js
const client = require('./client');
const ytdl = require('ytdl-core-discord');
const _ = require('lodash');
require('dotenv').config();

const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CHANNEL_NAME = process.env.DISCORD_CHANNEL_NAME;
const VOICE_URLS = process.env.VOICE_URLS.split(',');
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

let inactivityTimer = null; // To track inactivity timeout

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Ready to play lo-fi.`);
  // Optionally set bot status
  client.user.setActivity('lo-fi beats', { type: 'LISTENING' })
    .catch(console.error);
});

// Function to play music
const play = async (connection) => {
  try {
    const stream = await ytdl(_.sample(VOICE_URLS), { filter: 'audioonly', quality: 'highestaudio' });
    const dispatcher = connection.play(stream, { type: 'opus', highWaterMark: 50, volume: 0.6 });

    dispatcher.on('finish', () => {
      console.log('Song finished, playing next...');
      // Simple loop: play next immediately. Add delay if needed.
      play(connection).catch(err => console.error("Error playing next track:", err));
    });

    dispatcher.on('error', (error) => {
      console.error('Dispatcher error:', error);
      // Try playing again after a short delay
      setTimeout(() => play(connection).catch(err => console.error("Retry play failed:", err)), 5000);
    });

    console.log(`Now playing in ${connection.channel.name}`);

  } catch (error) {
    console.error("Error getting audio stream or playing:", error);
    // Handle specific errors like video unavailable if possible
    if (connection.channel) {
       // Maybe leave if persistent errors occur? For now, just log.
    }
  }
};


// Main logic handler
const lofiCafeHandler = async (oldState, newState) => {
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) return console.error("Guild not found!");

  const voiceChannel = guild.channels.cache.find(ch => ch.name === CHANNEL_NAME && ch.type === 'voice');
  if (!voiceChannel) return console.error(`Voice channel "${CHANNEL_NAME}" not found!`);

  const botMember = guild.members.cache.get(client.user.id);
  if (!botMember) return console.error("Bot member not found in guild cache.");

  const botCurrentChannel = botMember.voice.channel;

  // User joins the target channel
  if (newState.channelId === voiceChannel.id && oldState.channelId !== voiceChannel.id) {
    console.log(`${newState.member.user.tag} joined ${voiceChannel.name}`);
    clearTimeout(inactivityTimer); // Clear inactivity timer if someone joins

    // If bot is not already in the channel, join and play
    if (!botCurrentChannel || botCurrentChannel.id !== voiceChannel.id) {
      try {
        const connection = await voiceChannel.join();
        console.log(`Joined ${voiceChannel.name}`);
        await play(connection); // Start playing
      } catch (error) {
        console.error(`Could not join or play in ${voiceChannel.name}:`, error);
      }
    }
  }
  // User leaves the target channel OR switches away from it
  else if (oldState.channelId === voiceChannel.id && newState.channelId !== voiceChannel.id) {
     console.log(`${oldState.member.user.tag} left ${voiceChannel.name}`);
     // Check if the channel is now empty (only bot left)
     if (botCurrentChannel && botCurrentChannel.id === voiceChannel.id && voiceChannel.members.size === 1) {
       console.log(`Channel ${voiceChannel.name} is empty. Starting inactivity timer.`);
       clearTimeout(inactivityTimer); // Clear previous timer just in case
       inactivityTimer = setTimeout(() => {
         if (voiceChannel.members.size === 1 && botMember.voice.channelId === voiceChannel.id) {
            console.log(`Inactivity timeout reached. Leaving ${voiceChannel.name}.`);
            voiceChannel.leave();
         } else {
            console.log(`Inactivity timer cancelled (someone joined or bot left).`);
         }
       }, INACTIVITY_TIMEOUT);
     }
  }
};

client.on('voiceStateUpdate', lofiCafeHandler);

// Optional: Handle disconnects gracefully
client.on('disconnect', () => {
    console.log('Bot disconnected, attempting to reconnect...');
});
client.on('reconnecting', () => {
    console.log('Bot reconnecting...');
});

console.log('Bot script loaded, waiting for client ready event...');
```

## Running the Bot

```bash
node index.js
```

Your bot should log in and announce itself in the console. When someone joins the designated voice channel, the bot should join and start playing lo-fi music! It will leave automatically after 5 minutes if the channel becomes empty (except for the bot).

## Deployment (Example: Heroku)

1.  **Install Heroku CLI** and log in (`heroku login`).
2.  **Create Heroku App:** `heroku create your-lofi-bot-name`
3.  **Add Procfile:** Create a file named `Procfile` (no extension) in your root:
    ```Procfile
    worker: node index.js
    ```
4.  **Set Config Vars:** In your Heroku app dashboard (Settings -> Config Vars), add:
    *   `DISCORD_BOT_TOKEN`: Your bot token
    *   `DISCORD_GUILD_ID`: Your server ID
    *   `DISCORD_CHANNEL_NAME`: Your channel name
    *   `VOICE_URLS`: Your comma-separated YouTube URLs
5.  **Push to Heroku:**
    ```bash
    git init # If not already a git repo
    git add .
    git commit -m "Initial lofi bot setup"
    heroku git:remote -a your-lofi-bot-name
    git push heroku main # Or your default branch name
    ```
6.  **Scale the Worker:** In Heroku dashboard (Resources tab), enable the `worker` dyno.

Enjoy your new virtual lo-fi cafe! 🎉
