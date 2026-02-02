const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const FOLDER = "../data"
const FILE = 'data.json'

const filepath = path.resolve(__dirname, FOLDER, FILE);

const passwordGenerate = async (newuser) => {
    try{
        const raw_data = await fs.readFile(filepath, {encoding:'utf8', flag: 'r'})
        const data = JSON.parse(raw_data);
        
        const filtered_data = data.users.filter(users => users.email === newuser.email)
        if (filtered_data.length === 0){
            //GENERATE PASSWORD FOR NEWUSER
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(newuser.password, salt);
            newuser.password = password;
            data.users.push(newuser)

            //WRITE TO FILE
            await fs.writeFile(filepath, JSON.stringify(data, null, 2), {flag: 'w'})
            return {success: true, message: `User with email ${newuser.email} added successfully`}
        }
        else{
            return {success: false, message: `User with email ${newuser.email} already exists`}
        }
    }
    catch(err){
        console.error('Error generating salt:', err);
    }
}

module.exports = passwordGenerate;