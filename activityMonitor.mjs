
import {type} from "node:os";
import {spawn} from "node:child_process";
import {appendFile } from "node:fs";
import {stdout} from "node:process";

// one min - setInterval / 1000
const timer = 59;

let startTimer = new Date();


const appendOutput = (fullData) => {
  const unixtime = Math.floor(new Date().getTime() / 1000);
  
  appendFile("activityMonitor.log", `${unixtime} : ${fullData}`, (err) => {
    if (err) throw err;
  });
}

const spawnProcess = () => {
  const usedOS = type();
  const winOS = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
  const unixOS = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
  const command = usedOS == "Windows_NT" ? winOS : unixOS;

  const getOutput = spawn(command, {
    shell: true
  });
  let fullData = '';

  getOutput.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  getOutput.stdout.on("data", (data) => {
    fullData += data;
  });
  
  getOutput.stdout.on("end", () => {
    let endTimer = new Date();
    stdout.write(fullData.replace(/\n/g, "\r"));
    
    const delay = endTimer - startTimer;
    const roundedNumber = Math.floor(delay/1000);

    if(roundedNumber === timer) {
      appendOutput(fullData);
      startTimer = new Date();
    }

  });
   
}

setInterval(spawnProcess, 100)