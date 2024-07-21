import fs from 'fs'
import FileUtil from '../../FileUtil'
interface DateSummary {
  key: Date,
  value: string
}

interface DateCode {
  [key: string]: string[]
}
var venues = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10'
]

export default function GetRaceCode(today: string): string[]{
  try
  {
    const folder: string = '../calendar'

    const files = fs.readdirSync(folder)
    const regex = /.ics/
    var icsFiles = files.filter(x => x.match(regex))
    let input : string[] = []
    for (var file of icsFiles){
      if (file != null){
        var value = FileUtil.ReadFileSync(`${folder}/${file}`, 'utf8')
        input = input.concat(value)
      }
    }
    var date = new Date()
    var Year = date.getFullYear()
    var regexYear = new RegExp(`${Year}`)
    var DTSTART = ''
    var DTEND = ''
    var SUMMARY = ""
    var keyValues: DateSummary[] = []
    var keyValue: DateSummary = {key: new Date(), value: ''}
    var diff = 0
    for (var line of input){
      if (line.match(/DTSTART/) && line.match(regexYear)){
        diff = 0
        DTSTART = line.replace(/DTSTART;VALUE=DATE:/, '')
        var parseDate = parseDateString(DTSTART)
        parseDate?.setDate(parseDate?.getDate() + 1)
        if (parseDate){
          keyValue.key = parseDate
        }
      }
      else if (line.match(/DTEND/)){
        DTEND = line.replace(/DTEND;VALUE=DATE:/, '')
        var parseDate = parseDateString(DTEND)
        parseDate?.setDate(parseDate?.getDate() + 1)
        if (parseDate != null){
          diff = dateDiffInDays(parseDate, keyValue.key) - 1
        }
      } else if (line.match(/SUMMARY/)){
        SUMMARY = line.replace(/SUMMARY:/, '')
        keyValue.value = GetCode(SUMMARY)
      }
      if(keyValue.value != ''){
        keyValues.push(keyValue)
        while (diff > 0) {
          var nextKeyValue: DateSummary = {key: new Date(), value: ''}
          nextKeyValue.key = new Date(keyValue.key)
          nextKeyValue.key.setDate(nextKeyValue.key.getDate() + diff)
          nextKeyValue.value = keyValue.value
          keyValues.push(nextKeyValue)
          diff--
        }
        keyValue = {key: new Date(), value: ''}
      }
    }
    keyValues = sortRaceEvents(keyValues)
    var dateCode: DateCode = {}
    for (var venue of venues){
      var hold = 1
      var day = 0
      var num = 0
      var counter = false
      for (var race of keyValues){
        if (venue == race.value){
          day = day + 1
          counter = true
          num = 0
          var id = `${race.key.getFullYear()}${venue}${hold < 10 ? 0 + `${hold}` : hold}${day < 10 ? 0 +`${day}` : day}`
          if (dateCode[formatDateString(race.key)] == undefined) {
            dateCode[formatDateString(race.key)] = []
          }
          dateCode[formatDateString(race.key)].push(id)
        } else {
          num++
        }
        if (counter && (num > 2 || (day == 8 && venue == '10') || day == 12) ){
          hold++
          counter = false
          day = 0
          num = 0
        }
      }
    }
    return dateCode[today]
  }catch(e)
  {
    console.log(e)
    throw e
  }
}
function GetCode(venue: string){
  var sapporo = /札幌/
  var hakodate = /函館/
  var hukushima = /福島/
  var nigata = /新潟/
  var tokyo = /東京/
  var nakayama = /中山/
  var tyukyo = /中京/
  var kyoto = /京都/
  var hanshin = /阪神/
  var kokura = /小倉/
  if (venue.match(sapporo)){
    return '01'
  } else if (venue.match(hakodate)){
    return '02'
  } else if (venue.match(hukushima)){
    return '03'
  } else if (venue.match(nigata)){
    return '04'
  } else if (venue.match(tokyo)){
    return '05'
  } else if (venue.match(nakayama)){
    return '06'
  } else if (venue.match(tyukyo)){
    return '07'
  } else if (venue.match(kyoto)){
    return '08'
  } else if (venue.match(hanshin)){
    return '09'
  } else if (venue.match(kokura)){
    return '10'
  } else {
    return ''
  }
}
function parseDateString(dateString: string): Date | null {
  if (dateString.length !== 8) {
    console.error("Invalid date string format. Expected 8 characters.");
    return null;
  }

  const year = +dateString.substring(0, 4);
  const month = +dateString.substring(4, 6) - 1; // JS Dateの月は0から11で表現されるため、1を引く
  const day = +dateString.substring(6, 8);

  // Dateオブジェクトを生成
  const date = new Date(year, month, day);

  // 有効な日付かどうかを確認する（月や日が不正な場合、Dateオブジェクトは自動的に補正するため）
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    console.error("Invalid date values.");
    return null;
  }

  return date;
}

function dateDiffInDays(date1: Date, date2: Date): number {
  // 1日のミリ秒数
  const oneDayMs = 24 * 60 * 60 * 1000;

  // 日付をミリ秒数に変換して差を求める
  const timeDiffMs = Math.abs(date2.getTime() - date1.getTime());

  // 日数に変換して返す
  return Math.round(timeDiffMs / oneDayMs);
}

function sortRaceEvents(events: DateSummary[]): DateSummary[] {
  return events.sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
  });
}
function formatDateString(date: Date): string {

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}
