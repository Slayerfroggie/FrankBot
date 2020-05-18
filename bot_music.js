const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
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

    console.log("full command: " + fullCommand)
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "frhelp") {
        helpCommand(arguments, receivedMessage, fullCommand)
    } else {
        receivedMessage.channel.send("Can you even type? Try typing `!frhelp` you dumbass")
    }
}

function helpCommand(arguments, receivedMessage, fullCommand) {
    //if(arguments[1] == ""){
    //receivedMessage.channel.send("I'm not sure what you need help with. Try `!frhelp [topic/command]`")
    if (arguments[0] == "multiply"){
        receivedMessage.channel.send("to multiply 2 or more numbers together type [!frmultiply # #]")
    } else {
        let badCommand = fullCommand.split("frhelp ")
        //console.log("Bad help command: " + badCommand[1])
        receivedMessage.channel.send("What the fuck does '" + badCommand[1]+ "' mean? Can you try using `!frhelp [command]` with an actual command")
    }
}

client.login("NTkzMDA4NzIwMzM0Njg0MTYw.XRKbcg.DrD8A8JZ-pyeWQf4-webNdQnloU")