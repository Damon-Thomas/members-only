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

async function createUser(first, last, username, password, member, admin) {
    pool.query(`INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)`, [first, last, username, password, member, admin])
    console.log('all users', await pool.query('SELECT * FROM users;'))
    return rows;
}

async function setMember(id) {
    console.log("user before change", await pool.query(`SELECT * FROM users WHERE id=${id};`))
    await pool.query(`UPDATE users SET member=true WHERE id=${id};`)
    console.log("user after change", await pool.query(`SELECT * FROM users WHERE id=${id};`))
}


module.exports = {
    getMessages,
    getMessagesWithUsers,
    getUserByID,
    createUser,
    setMember
}