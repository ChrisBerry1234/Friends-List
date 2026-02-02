const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const FOLDER = '../data'
const FILE = 'data.json'

const file_path = path.resolve(__dirname, FOLDER, FILE);

const authenticateUser = async (userCredentials) => {
    try {
        const raw_data = await fs.promises.readFile(file_path, {encoding: 'utf8', flag: 'r'});
        //ERROR HANDLE
        const data = raw_data.length > 0 && JSON.parse(raw_data)
        const users = data.users;
        
        //DECONSTRUCT USERNAME OBJECT
        const {email, password} = userCredentials;

        const user = users.find(person => person.email === email);
        if(!user){
            return {"Success": false, "message": "User not found, Please register first"};
        }
        //ELSE
        try{
            if(await bcrypt.compare(password,user.password)) return {"Success": true, "message": "User authenticated"};
            else return {"Success": false, "message": "Password incorrect, User not Allowed"};
        }
        catch(err){
            return err.message;
        }
    }
    catch(err){
        console.log(err.message)
    }
}

//RETURN A PROMISE THAT NEEDS TO BE FULLFILLED

module.exports = authenticateUser; 