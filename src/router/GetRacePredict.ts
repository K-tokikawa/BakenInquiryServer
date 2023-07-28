import express from "express"
import process from "../process/GetRaceWeek";
import { PythonShell } from "python-shell";
const router: express.Router = express.Router();
// curl http://localhost:9999/GetJRAtohyoData -H "Content-Type:application/json" -d "{\"UID\":\"12345678\",\"PWD\":\"****\",\"PARS\":\"20XX\"}"
router.post('/GetRacePredict', function (req, res, next) {
    const Year: number = req.body.Year
    const Month: number = req.body.Month
    const HoldDay: number = req.body.HoldDay
    const shell = new PythonShell('./src/python/whilepredict.py')
    console.log(Year)
    console.log(Month)
    console.log(HoldDay)
    process(Year, Month, HoldDay, shell)
        .then(result => {
            res.send(result)
        })
})
export default router