const fs = require('fs')
const path = require('path')
const FOLDER = '../data' 
const FILENAME = 'data.json'

const data_path = path.resolve(__dirname, FOLDER, FILENAME)

const deleteUser = async (user) => {
    try{
        const raw_data = await fs.promises.readFile(data_path, {encoding: 'utf-8', flag: 'r'});
        const data = JSON.parse(raw_data);

        //FILTER THROUGH DATA ARRAY
        data.users = data.users.filter(person => person.email !== user.email);
        //GIVE US NEW ARRAY THAT DOES NOT INCLUDE THE EMAIL WE WANT REMOVED

        await fs.promises.writeFile(data_path, JSON.stringify(data, null, 2), {flag:'w'})
        return {success: true, message: "User deleted successfully!"} 
    }
    catch(error){
        return {success: false, message: error.message}
    }
}

module.exports = deleteUser;