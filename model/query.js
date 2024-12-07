const pool = require("./pool")

async function getMessages() {
    const {rows} = await pool.query('SELECT * FROM messages;')
    console.log('Query all messages plain', rows)
    return rows;
} 

async function getMessagesWithUsers() {
    const {rows} = await pool.query('SELECT * FROM messages LEFT JOIN users ON messages.userid = users.id;')
    console.log('Query all messages with users', rows)
    return rows;
} 

async function getUserByID(id) {
    const {rows} = await pool.query(`SELECT * FROM users WHERE id=${id};`)
    console.log('Get user by id', rows)
    return rows;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

async function createUser(first, last, username, password, member, admin) {
    
    pool.query(`INSERT INTO users (firstname, lastname, username, password, member, admin) VALUES ($1, $2, $3, $4, $5, $6)`, [capitalizeFirstLetter(first), capitalizeFirstLetter(last), username, password, member, admin])
    
    
}



async function setMember(id) {
    
    await pool.query(`UPDATE users SET member=true WHERE id=${id};`)
    
}


module.exports = {
    getMessages,
    getMessagesWithUsers,
    getUserByID,
    createUser,
    setMember,
    capitalizeFirstLetter
}