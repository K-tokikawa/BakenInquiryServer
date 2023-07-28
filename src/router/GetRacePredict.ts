import express from "express"
import process from "../process/GetRaceWeek";
import { PythonShell } from "python-shell";
const router: express.Router = express.Router();
// curl http://localhost:9999/GetJRAtohyoData -H "Content-Type:application/json" -d "{\"UID\":\"12345678\",\"PWD\":\"****\",\"PARS\":\"20XX\"}"
router.post('/GetRacePredict', function (req, res, next) {
    const Year: number = req.body.Year
    const Month: number = req.body.Month
    const HoldDay: number = req.body.HoldDay
    const Venue:number[] = req.body.Venue
    const Round: number[] = req.body.Rounds
    console.log(`${Year}_${Month}_${HoldDay}`)
    const shell = new PythonShell('./src/python/whilepredict.py')
    process(Year, Month, HoldDay, Venue, Round, shell)
        .then(result => {
            res.send(result)
        })
})
export default router