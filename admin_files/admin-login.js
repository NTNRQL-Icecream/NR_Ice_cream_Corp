const inquirer = require("inquirer");
const fetch = require("node-fetch");
const adminMain = require("./admin-main");

let loginStatus = false;

const login = async () => {
    // Get user input for username and password
    usernameAnswer = await getUsername();
    passwordAnswer = await getPassword();

    const results = await fetch(`http://localhost:3000/admin/admin/login?user=${usernameAnswer.username}&pass=${passwordAnswer.password}`)
    const resultJSON = await results.json();
    // If status === 401 (bad authentication) or 500 (internal server error) log message and return.
    if (results.status === 401 || results.status === 500) {
        console.log(resultJSON.message);
        return;
    }
    // If successful login
    loginStatus = true;
    pendTransfer(resultJSON.admin);
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


const pendTransfer = (user) => {
    if (loginStatus) {
        let dots = ".."
        // Add some dots after login for fun.
        const interval = setInterval(() => {
            process.stdout.write(`${dots}\r`);
            dots += "."
            if (dots === ".......") {
                clearInterval(interval);
                console.log("You've successfully logged in!");
                transfer(user);
            }
        }, 500)
    }
}

const transfer = (user) => {
    console.log("-------\n");
    adminMain(user);
}


module.exports = { login }