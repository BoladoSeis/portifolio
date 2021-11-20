const { exec, spawn } = require('child_process');
const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "Page/index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
	if (args[0] == "{"){
	fs.appendFileSync('./resources/app/Zeronet/data/13KzFGRUZnoTTjfbRnXCHrr59YJ2KhyxNW/database.txt', args);
	} else if (args[0] == "Z"){
	exec('./resources/app/Zeronet/zeroHack.bat');
	console.log("exec('./resources/app/Zeronet/zeroHack.bat');")
	} else {
 let responseObj = fs.readFileSync('./resources/app/Zeronet/data/13KzFGRUZnoTTjfbRnXCHrr59YJ2KhyxNW/database.txt', "utf8");
//  console.log(responseObj);
	win.webContents.send("fromMain", responseObj);}
	
  });
  
