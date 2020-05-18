const Discord = require('discord.js')
const { token, } = require('./auth.json')
const { youtubeAuth, } = require('./youtube-auth.json')
const client = new Discord.Client()

client.music = require("discord.js-musicbot-addon")
client.music.start(client, {
    youtubeKey: youtubeAuth,
    insertMusic: true
})

client.login(token);

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
})

client.on('guildMemberAdd', guildMember => {
    // Set the member's roles to a new single role
    const guild = client.guilds.get('308190520994430976')
        if (guild.id = "308190520994430976") {
            guildMember.setRoles(['387154651365113866']).catch(console.error);
            client.guilds.get('308190520994430976').channels.get("593021188838522900").send("Welcome to the server <@" + guildMember.id + "> you have successfully been given the role of Baguette.")
            //guildMember.displayName + "> you have successfully been given the role of Baguette.") old one just in case new one is a no go
        }
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { //Prevent bot from responding to its own messages
        return
    }
    let dadCommand = receivedMessage.content //gets message before the command identifier
    let dadArguments = dadCommand.split(" ") //splits the message to detect the keywords
    processImDad(dadArguments, receivedMessage, dadCommand)//functions that search messages for dad joke triggers
    processDadKYS(dadArguments, receivedMessage)
    if (receivedMessage.content.startsWith("!fr")) { //searching message for command starter
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    console.log("Full command: " + fullCommand)// the command and arguments combined
    console.log("Command received: " + primaryCommand)// the command itself
    console.log("Arguments: " + arguments) // logs the arguments for the command
    if (primaryCommand == "frhelp") {
        helpCommand(arguments, receivedMessage, fullCommand)
    } else if (primaryCommand == "frplay") {
        musicPlayCommand(arguments, receivedMessage)
    } else if (primaryCommand == "frmultiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "frroll") {
        diceRollCommand(arguments, receivedMessage)
    } else if (primaryCommand == "fr8ball") {
        eightBallCommand(arguments, receivedMessage)
    } else if (primaryCommand == "frhex") {
        hexColorCommand(receivedMessage)
    } else {
        receivedMessage.channel.send("I don't know that command. Try `!frhelp`, `!frmultiply`, or `!frroll`")// if none of the above commands are found
    }
}

function helpCommand(arguments, receivedMessage, fullCommand) {
    console.log("Help command run on the server: " + receivedMessage.guild.name)
    if (arguments[0] == "multiply") {
        receivedMessage.channel.send("to multiply 2 or more numbers together, try typing [!frmultiply # #]")
    } else if (arguments[0] == "roll") {
        receivedMessage.channel.send("to roll a dice, try typing [!frroll #d#] `e.g. 1d4 or 3d12`")
    } else if (arguments[0] == undefined) {
        receivedMessage.channel.send("Not giving me anything to work with is really not helpful.")
    } else {
        let badCommand = fullCommand.split("frhelp ")
        receivedMessage.channel.send("I do not know what '" + badCommand[1]+ "' means. Try using `!frhelp [command]` with the command multiply or roll")
    }
}

function musicPlayCommand(arguments, receivedMessage) {
    client.music.playFunction(arguments)
    receivedMessage.channel.send("music play hopefully")
}

function multiplyCommand(arguments, receivedMessage) {
    console.log("Multiply command run on the server: " + receivedMessage.guild.name)
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!frmultiply 2 4 10` or `!frmultiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

function diceRollCommand(arguments, receivedMessage) {
    console.log("Dice roll command run on the server: " + receivedMessage.guild.name)
    if (arguments.length != 1) {
        receivedMessage.channel.send("Incorrect dice roll input. For correct input please type the quantity of dice being rolled, followed by a 'd' and the dice. `e.g. 1d4 or 3d12`")
        return
    }
    let diceRollInput = arguments[0].split("d")
    let rollResult = ""
    if (diceRollInput.length != 2) {
        receivedMessage.channel.send("Incorrect dice roll input. For correct input please type the quantity of dice being rolled, followed by a 'd' and the dice. `e.g. 1d4 or 3d12`")
        return
    } else {
        if (diceRollInput[0] > 0 && diceRollInput[0] <= 10000) {
            if(diceRollInput[1] > 1 && diceRollInput[1] <= 10000) {
                for (i = 1; i <= diceRollInput[0]; i++) {
                    rollResult = rollResult + " " + (Math.floor(Math.random() * diceRollInput[1]) + 1)
                }
                var splitRollResult = rollResult.split(" ").map(Number)
                var rollTotal = splitRollResult.reduce(function(total, amount) {
                    return total + amount
                });
                if (diceRollInput[0] <= 30) {
                    receivedMessage.channel.send(receivedMessage.author.toString() + " rolled **" + rollTotal + "** " + "(" + rollResult + " )")
                } else {
                    receivedMessage.channel.send(receivedMessage.author.toString() + " rolled **" + rollTotal + "**")
                }
            } else {
                receivedMessage.channel.send("Invalid number of die faces. Please enter a dice that is in the range of 2-10000")
            }
        } else {
            receivedMessage.channel.send("Invalid quanitity of dice. Please enter a dice quantity of 1-10000")
        }
    }
}

function eightBallCommand(arguments, receivedMessage) {
    firstWord = arguments[0]
    var questionStarters = ["do", "does", "did", "am", "are", "is", "was", "were",
	"have", "has", "had", "will", "would", "shall", "should", "can", "could", "may", "might",
	"Do", "Does", "Did", "Am", "Are", "Is", "Was", "Were", "Have", "Had", "Will", "Would", "Shall",
    "Should", "Can", "Could", "May", "Might"]
    if(questionStarters.includes(firstWord)) {
        eightBallRun(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Not a question")
    }
    function eightBallRun(arguments, receivedMessage) {
        var responses = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.",
        "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
        "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
        "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful"]
        var dateTime = new Date()
		//dateTime.setHours(0,0,0,0)
        var dateTimeValue = Date.parse(dateTime)
        var questionNumber = dateTimeValue
        for(i = 0; i <= arguments.length; i++) { 
            if(i == 0) {
                question = arguments[i]
            } else {
                question = question + arguments[i]
            }
        }
        for(i = 0; i < question.length; i++) {
            questionNumber += question.charCodeAt(i)
        }
        var randomNumber = (questionNumber % 19)
        receivedMessage.channel.send(responses[randomNumber])
    }
}

function processImDad(dadArguments, receivedMessage, dadCommand) {
    for (i = 0; i <= dadArguments.length; i++)
    {
        if (dadArguments[i] == "i'm" || dadArguments[i] == "im" || dadArguments[i] == "I'm" ||dadArguments[i] == "Im" ) { //detecting the keyword
            if (dadArguments[i + 1] == "dad" || dadArguments[i + 1] == "Dad") {
                console.log("Dad comeback command run on the server: " + receivedMessage.guild.name)
                receivedMessage.channel.send("No you're not, you're " + receivedMessage.author.username + ".", {tts: true})
            } else {
                console.log("Dad comeback command run on the server: " + receivedMessage.guild.name)
                dadString = dadCommand.split(dadArguments[i])//spliting the same string in the start of the loop, but spliting by the keyword
                dadComeback = dadString[1] //putting the string after the keyword into the 
                receivedMessage.channel.send("Hi" + dadComeback + ", I'm Dad!")
            }   
            break //breaks the loop to avoid several keywords triggering several messages
        }
    }
}

function processDadKYS(dadArguments, receivedMessage) {
    for (i = 0; i <= dadArguments.length; i++){ // for loop on words in message array
        if (dadArguments[i] == "KYS" || dadArguments[i] == "kys") { //finding kys in array
            console.log("Dad kys command run on the server: " + receivedMessage.guild.name) //console log if a kys command was triggered
            receivedMessage.channel.send("Alright "+ receivedMessage.author.username + ", that was very rude. Instead, take your own advice.", {tts: true}) //printing response message
            break // break to make sure the for stops scanning the message as well as ending the function
        }
    }
}

function hexColorCommand(receivedMessage) {
    function makeid(length) {
        var result           = '';
        var characters       = 'abcdef0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result;
    }
    randomColor = makeid(6)
    R = hexToR("#" + randomColor);
    G = hexToG("#" + randomColor);
    B = hexToB("#" + randomColor);
    function hexToR(h) {
        return parseInt((cutHex(h)).substring(0,2),16)
    }
    function hexToG(h) {
        return parseInt((cutHex(h)).substring(2,4),16)
    }
    function hexToB(h) {
        return parseInt((cutHex(h)).substring(4,6),16)
    }
    function cutHex(h) {
        return (h.charAt(0)=="#") ? h.substring(1,7):h
    }
    let embed = new Discord.RichEmbed()
        .setTitle("Here is your cool new colour")
        .setDescription("Hex: **#" + randomColor + "**\nRGB: (" + R + ", " + G + ", " + B + ")")
        .setColor("#" + randomColor)
        .setURL("https://www.w3schools.com/colors/colors_picker.asp?colorhex=" + randomColor)
    receivedMessage.channel.send(embed)
}