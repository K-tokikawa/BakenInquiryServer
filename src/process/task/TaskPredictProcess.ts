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
    const channel_rate = await client.channels.fetch('1213421544827527198') as TextChannel
    const channel = await client.channels.fetch('1216572418060193873') as TextChannel
    try {
      const text = await BatProcess()
      await channel_rate.send(text)
      await channel.send(text)
      console.log(text)
    } catch(e) {
    }
    exit()
});
client.login(process.env.TOKEN)


async function BatProcess(){
  try
  {
      const date = new Date()
      const Year: number = date.getFullYear()
      const Month: number = date.getMonth() + 1
      const HoldDay: number = date.getDate()
      const Round: number[] = [CheckRound(date.getHours(), date.getMinutes())]
      const results = await predictprocess(Year, Month, HoldDay, Round, true)
      let resulttext = ''
      for (const result of Object.keys(results.root)) {
          resulttext += results.root[Number(result)].data.text
      }
      return resulttext
  }catch(e)
  {
    console.log(e)
    return `${e}`
  }
}

function CheckRound(hour: number, minutes: number){
  const dic: {
    [hour: number]: {
      [minutes: number]: number
    }
  } = {
    7:[],
    8:[],
    9: [],
    10: [],
    11: [],
    
    12: [],
    13: [],
    14: [],
    15: [],
    19: []
  }
  dic[8][0] = 1
  dic[8][10] = 2

  
  dic[9][25] = 1
  dic[9][55] = 2
  dic[10][25]= 3
  dic[10][55] = 4
  dic[11][45] = 5
  dic[12][15] = 6
  dic[12][50]= 7
  dic[13][20] = 8
  dic[13][50] = 9
  dic[14][25] = 10
  dic[15][0] = 11
  dic[15][45] = 12

  // if (minutes <= 15) {
  //   minutes = 15
  // }
  // else if (minutes <= 27) {
  //   minutes = 25
  // } else if (minutes <= 32) {
  //   minutes = 30
  // } else if (minutes <= 42) {
  //   minutes = 40
  // } else if (minutes <= 47) {
  //   minutes = 45
  // } else if (minutes <= 52) {
  //   minutes = 50
  // } else if (minutes <= 59) {
  //   minutes = 55
  // }
  return dic[hour][minutes]
}