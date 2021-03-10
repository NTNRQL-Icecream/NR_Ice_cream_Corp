const inquirer = require("inquirer");
const inqurer = require("inquirer");
const fetch = require("node-fetch");

const changePassword = async (user) => {
    const passwords = await promptPasswords();
    const body = {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
    }

    const fetchResults = await fetch(`http://localhost:3000/admin/admin/changePassword/${user.admin_id}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
    const resultsJSON = await fetchResults.json();

    // Wrong password or something went wrong
    if (fetchResults.status === 401 || fetchResults.status === 500 || fetchResults.status === 404) {
        console.log("\n" + resultsJSON.message + "\n");
        return;
    }

    if (fetchResults.status === 200) {
        console.log("\nYou have successfully updated your password.\n");
        return;
    }
}

const promptPasswords = () => {
    return inquirer.prompt([
        {
            name: "oldPassword",
            type: "password",
            message: "Enter current password",
        },
        {
            name: "newPassword",
            type: "password",
            message: "Enter new password"
        }
    ])
}

module.exports = changePassword;