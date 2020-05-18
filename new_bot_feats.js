const Discord = require('discord.js')
const client = new Discord.Client()

//client.on('ready', () => {
    //list of servers
    //console.log("Servers:")
    //client.guilds.forEach((guild) => {
        //console.log(" - " + guild.name)

        // giving the bot a channel to send to specifically from baguettes
        //var botTestChannel = client.channels.get("593021188838522900")

        // List all channels
        //guild.channels.forEach((channel) => {
        //    console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        //})

        //sending channels for a server specific messages
        //botTestChannel.send("Hello, world!")  

        //local path for a file
        //const localFileAttachment = new Discord.Attachment('D:\\bot things\\test_images\\12717305_492520414260805_2527906290600714850_n.jpg')
        
        //sending local files
        //botTestChannel.send(localFileAttachment)

        //internet files by URL
        //const webAttachment = new Discord.Attachment('https://image.shutterstock.com/z/stock-photo-fat-bad-boy-with-sausage-isolated-on-white-75804418.jpg')

        //sending the internet files
        //botTestChannel.send(webAttachment)
    //})
//})

client.on('message', (receivedMessage) => {
    //if loop to prevent bot replying to it's own messages
    if (receivedMessage.author == client.user){
        return
    }
    
    //basic messaging with user tagging
    //receivedMessage.channel.send("Message received from " + "receivedMessage.author.toString()" + ": " + receivedMessage.content)

    // Check if the bot's user was tagged in the message ** Only works if bot is not nicknamed **
    //if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        //receivedMessage.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)
        //console.log("@ Reply sent")
    //}
})
    
// login token
client.login("NTkzMDA4NzIwMzM0Njg0MTYw.XRKbcg.DrD8A8JZ-pyeWQf4-webNdQnloU")