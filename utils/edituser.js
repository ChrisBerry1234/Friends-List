const fs = require('fs').promises
const path = require('path')
const FOLDER = '../data' 
const FILENAME = 'data.json'

const getFilePath = path.resolve(__dirname, FOLDER, FILENAME)

//User argument is an object
const editUser = async (user) => {
    try{
        //We use async to avoid callback hell with readFile
        const raw_data = await fs.readFile(getFilePath, {encoding:'utf8', flag: 'r'});
        // IS THE RAW_DATA EMPTY, IF SO CREATE A NEW ARRAY OTHERWISE PARSE INTO VARIABLE
        const data = raw_data.length > 0 ? JSON.parse(raw_data) : {users: []};
        if (!Array.isArray(data.users)) {
            data.users = [];
        }

        let found = false;
        for  (let i = 0; i < data.users.length; i++) {
            if (data.users[i].email === user.email){
                //AT INDEX, SPREAD/UNPACK THE OBJECT ELEMENTS AND REASSIGN THEM WITH THE NEW DATA
                data.users[i] = {...data.users[i], ...user}
                found = true;
                break;
            }
        }

        if (found) {

            await fs.writeFile(getFilePath, JSON.stringify(data, null, 2), {encoding:'utf8', flag: 'w'});
            console.log("User updated successfully");
            console.log("Updated user details:", data);
    }
}

    catch(error) {
        console.error("Error reading file:", error);
    }
}


const user = {
         "firstName": "Chris",
         "lastName": "white",
         "email": "joyalwhite@gmail.com",
         "DOB": "21-03-1989"
};

editUser(user);

module.exports = editUser;