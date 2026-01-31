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
        //ERROR HANDLING
        for (const person of data.users){
            if(user.email === person.email)
            {
                console.log("Person Already Exists");
                return { success: false, message: "Person Already Exists"};
            }
        }
        data.users.push(user);
        //NOW WE CAN WRITE NEW USERS TO JSON FILE
        await fs.writeFile(data_path, JSON.stringify(data, null, 3), {flag: 'w'});
        return { success: true, message: "User added successfully"}
        }
    catch(err){
        return { success: false, message: "Error during file write:" + err.message}
    }
}

module.exports = addNewUser;
