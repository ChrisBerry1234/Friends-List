const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const FOLDER = "../data"
const FILE = 'data.json'

const filepath = path.resolve(__dirname, FOLDER, FILE);

const addPassword = async() => {
    try{
        const raw_data = await fs.readFile(filepath, {encoding:'utf8', flag: 'r'})
        const data = JSON.parse(raw_data);
        
        for (let i = 0; i < data.users.length; i++){
            let salt = await bcrypt.genSalt(10)
            let password = await bcrypt.hashSync("myPassword", salt);
            data.users[i] = {...data.users[i], password: password}
        }
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    }
    catch(err){
        console.error('Error generating salt:', err);
    }
}

addPassword();