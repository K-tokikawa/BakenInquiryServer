import GetRaceCode from "../predict/GetRaceCode";
const date = new Date()
const Year: number = date.getFullYear()
const Month: number = date.getMonth() + 1
const HoldDay: number = date.getDate()

GetRaceCode(`${Year}${Month < 10 ? `0${Month}` : `${Month}`}${HoldDay < 10 ? `0${HoldDay}` : HoldDay}`)