const tmi = require('tmi.js');

// Define configuration options
const opts = {
    connection: {
        reconnect: true,
        secure:true
    },
    identity: {
    username: 'thebottomlessteamug',
    password: 'oauth:cc5xmx935scxsjoqnpsrazfxe7biwn'
    },
    channels: [
    'thematchyman'
                    ]
                  };
                  
// Create a client with our options
const client = new tmi.client(opts);
                  
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
                  
// Connect to Twitch:
client.connect();

function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

function ball() {
    const sides = 8;
    const result = Math.floor(Math.random() * sides) + 1;

    switch (result) {
        case 1:
            return 'As I see it, yes';
            break
        case 2:
            return 'Ask again later'
            break
        case 3:
            return 'Better not tell you now';
            break
        case 4:
            return 'Cannot predict now';
            break
        case 5:
            return 'Concentrate and ask again';
            break
        case 6:
            return 'Dont count on it';
            break
        case 7:
            return 'It is certain';
            break
        case 8:
            return 'It is decidedly so';
            break
        default:
            return result;

    }
}

function shoutout(msg) {
    const a = msg.slice(0, 3);
    return a;
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self,) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }

    //Shoutout command using slice to get username
    if (msg.toLowerCase().startsWith(`!so`) === true) {
        const name = shoutout(msg);
        client.say(`Boo ${ msg } ${name}`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }

    // Pack name
    if (commandName === `!pack`) {
        client.say(target, ` This pack is Engineer's Life, you can find it on the Twitch Launcher`)
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
    if (msg.toLowerCase().startsWith(`!ball`) === true) {
        const saying = ball();
        client.say(target, `${context.username} ${saying}`);
    }
    
    // Hello messages
    /*if (msg.toLowerCase().startsWith(`hello`) === true) {
        client.say(target, `Hello ${context.username}`);
    }
    if (msg.toLowerCase().startsWith(`hi`) === true) {
        client.say(target, `Hi ${context.username}`);
    }
    if (msg.toLowerCase().startsWith(`hey`) === true) {
        client.say(target, `Hey ${context.username}`);
    }

    
    */
}

















// Follower to channel
client.on("follower", (channel,username) => {
    client.say(channel, `${username} Thanks for following!`)
});

// Sub to channel
client.on("subscription", (channel, username, method, message, userstate) => {
    client.say(channel, `${username} Thanks for subscribing, enjoy the tea and emotes matchy1Tea`);
});

//Resub to channel
client.on("resub", (channel, username, months, message, userstate, methods) => {
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
    client.say(channel, `${username} Thanks for resubscribing for ${cumulativeMonths} months enjoy more tea`);
});
// Gifted sub to channel

client.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    client.say(channel, `Thanks to ${username} for gifing a sub to ${recipient}, enjoy your tea and emotes`)
});

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
    let senderCount = ~~userstate["msg-param-sender-count"];
    client.say(channel, `${username} has gifted ${numbOfSubs} to the channel, enjoy your tea and emotes`)
});
// Cheer to channel
client.on("cheer", (channel, userstate, message) => {
    client.say(channel, `${username} has cheered ${userstate.bits} Pog`)
});

// Host from user
client.on("hosted", (channel, username, viewers, autohost) => {
    client.say(channel, `${username} has hosted the channel for ${viewers} grab yourself a cup of tea and enjoy the stream`);
});

// Raid from user
client.on("raided", (channel, username, viewers) => {
    client.say(channel, `${username} is raiding the channel with ${viewers} viewers, the kettle has boiled plenty of tea for everone!`);
    client.say(channel, `Go follow ${username} at twitch.tv/${username}`);
});

// Continuing gift sub recieved
client.on("anongiftpaidupgrade", (channel, username, userstate) => {
    client.say(channel, `${username} is continuing their sub to the channel, Thank you very much`);
});
