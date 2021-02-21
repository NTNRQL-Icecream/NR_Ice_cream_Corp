const csv = require("csv-parser");
const inquirer = require("inquirer");
const fs = require("fs");

let results = [];
let usernameAnswer;
let passwordAnswer;

let loginStatus = false;

const getAdminInfo = async () => {
    fs.createReadStream('Admin-login/login.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            //Call register function
            await login()
            await compareLoginInfo();
            await pendTransfer();
        });
}

const login = async () => {
    // Get user input for username and password
    usernameAnswer = await getUsername();
    passwordAnswer = await getPassword();
}

const getUsername = () => {
    return inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "Enter username: ",
        }
    ])
}

const getPassword = () => {
    return inquirer.prompt([
        {
            name: "password",
            type: "password",
            message: "Enter password: ",
        }
    ])
}

const compareLoginInfo = () => {
    for (obj of results) {
        if (obj.Username === usernameAnswer.username && obj.Password === passwordAnswer.password) {
            uniqueID = obj.UniqueID;
            loginStatus = true;
            return;
        }
    }
    console.log("Incorrect username or password");
}

const pendTransfer = () => {
    if (loginStatus) {
        let dots = ".."
        // Add some dots after login for fun.
        const interval = setInterval(() => {
            process.stdout.write(`${dots}\r`);
            dots += "."
            if (dots === ".......") {
                clearInterval(interval);
                console.log("You've successfully logged in!");
                transfer();
            }
        }, 500)
    }
}

const transfer = () => {
    console.log("-------\n");
}


module.exports = { getAdminInfo }