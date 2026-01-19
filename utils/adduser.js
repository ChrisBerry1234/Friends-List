const path = require('path')
const fs = require('fs').promises
const FOLDER = '../data'
const FILENAME = 'data.json'

const data_path = path.resolve(__dirname, FOLDER, FILENAME, );

const addNewUser = async (user) => {
    try{
        const raw_data = await fs.readFile(data_path, {encoding:'utf8', flag: 'r'});
        //CHECK IF DATA EXISTS, IF NOT CREATE NEW ARRAY
        const data = raw_data.length > 0 ? JSON.parse(raw_data) : { user: [] }
        if (!Array.isArray(data.users)) data.users = [];
        //Add New User
        data.users.push(user);
        //NOW WE CAN WRITE NEW USERS TO JSON FILE
        await fs.writeFile(data_path, JSON.stringify(data.users, null, 3), {flag: 'w'});
    }
    catch(err)
    {
        console.error("Error during file write:", err.message);
    }
}

module.exports = addNewUser;
