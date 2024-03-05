
import {type} from "node:os";
import {spawn} from "node:child_process";
import {appendFile, appendFileSync } from "node:fs";
import {stdout} from "node:process";

const oneMin = 240;
let count = 0;

const spawnProcess = () => {
  console.log("spawnProcess")
  const usedOS = type();
  const winOS = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
  const unixOS = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
  const command = usedOS == "Windows_NT" ? winOS : unixOS;

  const getOutput = spawn(command, {
    shell: true
  });
  let fullData = '';
  count++;
  getOutput.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  getOutput.stdout.on("data", (data) => {
    fullData += data;
  });
  
  getOutput.stdout.on("end", () => {
    stdout.write(fullData.replace(/\n/g, "\r"));
    const start = process.hrtime.bigint();
      if(count === oneMin) {
        count = 0;
        appendFile("activityMonitor.log", `${start} : ${fullData}`, (err) => {
          if (err) throw err;
        });
      }
  });
   
}

setInterval(spawnProcess, 100)