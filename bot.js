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
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { //Prevent bot from responding to its own messages
        return
    }
    let dadCommand = receivedMessage.content //gets message before the command identifier
    let dadArguments = dadCommand.split(" ") //splits the message to detect the keywords
    processImDad(dadArguments, receivedMessage, dadCommand)
    processDadKYS(dadArguments, receivedMessage)
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
    if (primaryCommand == "frhelp") {
        helpCommand(arguments, receivedMessage, fullCommand)
    } else if (primaryCommand == "frmultiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "frroll") {
        diceRollCommand(arguments, receivedMessage)
    } else if (primaryCommand == "fr8ball"){
        eightBallCommand(arguments, receivedMessage)
    } else if (primaryCommand == "frhex"){
        hexColorCommand(receivedMessage)
    } else {
        receivedMessage.channel.send("I don't know that command. Try `!frhelp`, `!frmultiply`, or `!frroll`")
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
        receivedMessage.channel.send("What the fuck does '" + badCommand[1]+ "' mean? Can you try using `!frhelp [command]` with an actual fucking command")
    }
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

function processImDad(dadArguments, receivedMessage, dadCommand){
    for (i = 0; i <= dadArguments.length; i++)
    {
        if (dadArguments[i] == "i'm" || dadArguments[i] == "im" || dadArguments[i] == "I'm" ||dadArguments[i] == "Im" ) { //detecting the keyword
            if (dadArguments[i + 1] == "dad" || dadArguments[i + 1] == "Dad") {
                console.log("Dad comeback command run on the server: " + receivedMessage.guild.name)
                receivedMessage.channel.send("No you're not, you're " + receivedMessage.author.username + ".")
            } else {
                console.log("Dad comeback command run on the server: " + receivedMessage.guild.name)
                dadString = dadCommand.split(dadArguments[i])//spliting the same string in the start of the loop, but spliting by the keyword
                dadComeback = dadString[1] //putting the string after the keyword into the 
                receivedMessage.channel.send("Hi" + dadComeback + ", I'm Dad!")
            }   
        }
        break //breaks the loop to avoid several keywords triggering several messages
    }
}

function processDadKYS(dadArguments, receivedMessage) {
    for (i = 0; i <= dadArguments.length; i++){
        if (dadArguments[i] == "KYS" || dadArguments[i] == "kys"){
            console.log("Dad kys command run on the server: " + receivedMessage.guild.name)
            receivedMessage.channel.send("Alright "+ receivedMessage.author.username + ", that was very rude. Instead, take your own advice.")
            break
        }
    }
}

function hexColorCommand(receivedMessage) {
    function makeid(length){
        var result           = '';
        var characters       = 'abcdef0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result;
    }
    randomColor = makeid(6)

    let embed = new Discord.RichEmbed()
        .setTitle("Here is your cool new colour")
        .setColor("#" + randomColor)
        .setURL("https://www.w3schools.com/colors/colors_picker.asp?colorhex=" + randomColor)
    receivedMessage.channel.send(embed)
}