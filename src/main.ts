import express from 'express'
import bodyparser from "body-parser"
import GetJRAtohyoData from "./router/GetJRAtohyoData"
import JRAtohyoLogin from "./router/JRAtohyoLogin"

export const app = express()
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", 'http://192.168.102.163:9099');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});
app.use(GetJRAtohyoData)
app.use(JRAtohyoLogin)

export default app.listen(9999, () => {
    console.log("App is running at http://localhost:9999")
});