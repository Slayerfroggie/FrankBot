const Discord = require('discord.js')
const { token, } = require('./auth.json')
const client = new Discord.Client()
client.login(token);

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
    console.log("------------------")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { //Prevent bot from responding to its own messages
        return
    }
    if (receivedMessage.content.startsWith("!fr")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    console.log("Full command: " + fullCommand)
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments
    if(primaryCommand == "frroll") {
        diceRollCommand(arguments, receivedMessage)
    }
}

function diceRollCommand(arguments, receivedMessage) {
    console.log("Dice roll command run on the server: " + receivedMessage.guild.name + "\n------------------")
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