const inquirer = require("inquirer");
const changePassword = require("../helper_functions/changePassword");

let admin;
// Keep user login info
const storeUser = (user) => {
    admin = user;
    AdminChoices();
}

const AdminChoices = async () => {
    const adminAnswers = await promptAdmin();

    switch (adminAnswers.choices) {
        case "Change Password":
            const change = await changePassword(admin);
            AdminChoices();
            break;
        case "Exit":
            quitApp();
            break;
    }
}

const promptAdmin = () => {
    return inquirer.prompt([{
        name: "choices",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Change Password", "Edit Menu", "Access logs", "Exit"]
    }])
}

const quitApp = () => {
    return;
}

module.exports = storeUser;