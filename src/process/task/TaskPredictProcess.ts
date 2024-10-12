import { exit } from "process";
import predictprocess from "../predict/GetRacePredict";
import dotenv from "dotenv";
import { Client, TextChannel } from "discord.js";
import Discord from "discord.js";

let channel_rate : TextChannel | null = null
let channel : TextChannel | null = null
const races: string[] = []
dotenv.config()
const client = new Client({
  intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.GuildMembers, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.MessageContent],
})

client.once('ready', async ()=> {
    console.log('Ready!')
    console.log(client.user?.tag)
    channel_rate = await client.channels.fetch('1213421544827527198') as TextChannel
    channel = await client.channels.fetch('1216572418060193873') as TextChannel
});
client.login(process.env.TOKEN)
Execute()
async function Execute() {
  const text = await BatProcess()
  if (text != '') {
    // console.log(text)
    if (channel_rate != null) {
      channel_rate = channel_rate as TextChannel
      await channel_rate.send(text)
    }
    if (channel != null) {
      channel = channel as TextChannel
      await channel.send(text)
    }
  }
  setTimeout(async() => {
    Execute()
  }, 1000)
}



async function BatProcess(){
  try
  {
      const date = new Date()
      const Year: number = date.getFullYear()
      const Month: number = date.getMonth() + 1
      const HoldDay: number = date.getDate()
      const Round: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const results = await predictprocess(Year, Month, HoldDay, Round, true)
      let resulttext = ''
      for (const result of Object.keys(results.root)) {
        if (!races.includes(results.root[Number(result)].data.Name)) {
          resulttext += results.root[Number(result)].data.text
          races.push(results.root[Number(result)].data.Name)
        }
      }
      return resulttext
  }catch(e)
  {
    console.log(e)
    return `${e}`
  }
}