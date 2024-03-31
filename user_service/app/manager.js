const logger = require('../logger')
const MySQLClient = require('./dbConnection')
const {sha256} = require('js-sha256')
const utils = require('./utils')

const getToken = async (req, res) => {
    const username = req?.body?.username
    const password = req?.body?.password

    const sql = `SELECT * FROM user where username = ? ;`;

    MySQLClient.db.query(sql, [username], (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        if(result.length){
            if(sha256(password)===result[0].password_hash){
                const user = {
                    user_id: result[0].id,
                    username: result[0].usename,
                    user_type: result[0].user_type,
                    email: result[0].email,
                    phone: result[0].phone
                }

                const token = utils.createToken(user)
                res.send({token: token})
            }
        }
        else{
            logger.info('No user Found !!!')
            res.send({})
        }

      });
}

const getUserbyId = async(req, res) =>{
    const user_id = req.params.id

    const sql = `SELECT * FROM user where id = ${user_id}`;

    MySQLClient.db.query(sql, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        if(result.length){
            const user = {
                user_id: result[0].id,
                username: result[0].usename,
                user_type: result[0].user_type,
                email: result[0].email,
                phone: result[0].phone,
                name: result[0].name
            }
            res.send({user: user})
        }
        else{
            logger.info('No user Found !!!')
            res.send({})
        }

      });
}

const createUser = async(req, res) => {
    const data = req.body
    const sql = 'INSERT INTO user (username, password_hash, name, email, phone, user_type) VALUES ?';
    const values = data.map(item => [item.username, sha256(item.password), item.name, item.email, item.phone, item.user_type]);

    MySQLClient.db.query(sql, [values], (err, result, fields) => {
        if (err) {
          console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records inserted: ', result.affectedRows);
        res.send('Record(s) inserted.');
      });

}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const newData  = req.body;
    const setClause = Object.keys(newData).map(Key => `${Key} = ?`).join(', ');
    const values = Object.values(newData);
    values.push(id)
    const sql = `UPDATE user SET ${setClause} WHERE id = ?`;
    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records updated: ', result.affectedRows);
        res.send('Record updated.');
    });
}

const getAddress = async(req, res) =>{
    const user_id = req.user.user_id

    const sql = `SELECT * FROM address where id = ${user_id}`;

    MySQLClient.db.query(sql, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        if(result.length){
            res.status(200).send({result: result})
        }
        else{
            logger.info('No record Found !!!')
            res.send({})
        }

      });
}

const addAddress = async(req, res) => {
    const user_id = req.user.user_id
    const data = req.body
    const keys = Object.keys(data)
    keys.push(["user_id", "inserted_at", "updated_at"])
    const insertClause = keys.join(', ');
    const sql = `INSERT INTO address (${insertClause}) VALUES ?`;
    const values = Object.values(data)
    values.push([user_id, Date.now(), Date.now()])

    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
          console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records inserted: ', result.affectedRows);
        res.send('Record(s) inserted.');
      });

}

const updateAddress = async(req, res) => {
    const id = req.params.id;
    const newData  = req.body;
    const keys = Object.keys(newData)
    keys.push(["updated_at"])
    const setClause = keys.map(Key => `${Key} = ?`).join(', ');
    const values = Object.values(newData);
    values.push([Date.now(), id])
    const sql = `UPDATE address SET ${setClause} WHERE id = ?`;
    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records updated: ', result.affectedRows);
        res.send('Record updated.');
    });
}

module.exports = {
    getToken,
    getUserbyId,
    createUser,
    updateUser,
    getAddress,
    addAddress,
    updateAddress
}