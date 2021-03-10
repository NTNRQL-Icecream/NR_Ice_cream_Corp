const inquirer = require("inquirer");
const fetch = require("node-fetch");

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
    pendTransfer();
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


module.exports = { login }