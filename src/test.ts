import { PythonShell } from "python-shell";
import process from "./process/GetRaceWeek";
const shell = new PythonShell('./src/python/whilepredict.py')
process(2023, 8, 5, [1],[11], shell)