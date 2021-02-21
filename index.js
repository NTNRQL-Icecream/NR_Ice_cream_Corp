const inquirer = require("inquirer");

const init = () => {
    inquirer.prompt([
        {
            name: "consumerOrAdmin",
            type: "list",
            message: "Are you a consumer or admin?",
            choices: ["Consumer", "Admin"]
        }
    ]).then(answer => {
        callFunction(answer);
    })
}

const callFunction = (answer) => {
    if (answer.consumerOrAdmin === "Consumer") {
        console.log("you are a consumer");
    } else {
        console.log("admin")
    }
}

init();