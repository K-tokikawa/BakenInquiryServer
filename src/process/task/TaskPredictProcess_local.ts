import { exit } from "process";
import predictprocess from "../predict/GetRacePredict";
import dotenv from "dotenv";
import { Client, TextChannel } from "discord.js";
import Discord from "discord.js";

dotenv.config()
const client = new Client({
  intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.GuildMembers, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.MessageContent],
})

client.once('ready', async ()=> {
    console.log('Ready!')
    console.log(client.user?.tag)
    try {
      const text = await BatProcess()
      console.log(text)
    } catch(e) {
    }
    exit()
});
client.login(process.env.TOKEN)


async function BatProcess(){
    const date = new Date()
    const Year: number = date.getFullYear()
    const Month: number = date.getMonth() + 1
    const HoldDay: number = date.getDate()
    const Venue:number[] = [2, 3, 10]
    const Round: number[] = [11]
    console.log(HoldDay)
    const results = await predictprocess(Year, Month, HoldDay, Venue, Round, true)
    let resulttext = ''
    for (const result of Object.keys(results.root)) {
        resulttext += results.root[Number(result)].data.text
    }
    return resulttext
}

