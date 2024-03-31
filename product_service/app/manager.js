const logger = require('../logger')
const MySQLClient = require('./dbConnection')
const {sha256} = require('js-sha256')
const utils = require('./utils')


const getProduct = async(req, res) =>{
    const query = req?.query
    let sql;

    if(query?.product_id)
     {sql = `SELECT * FROM product where id = ${query?.product_id}`; }
    else
     {sql = `SELECT * FROM product where merchant_id = ${query?.merchant_id}`; }

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

const addProduct = async(req, res) => {
    const data = req.body
    const keys = Object.keys(data)
    keys.push("inserted_at") 
    keys.push("updated_at")
    const insertClause = keys.join(', ');
    const sql = `INSERT INTO product (${insertClause}) VALUES ?`;
    const values = Object.values(data)
    values.push(new Date())
    values.push(new Date())

    MySQLClient.db.query(sql, [[values]], (err, result, fields) => {
        if (err) {
          console.log(`#########\n ERROR: ${err}\n ############`);
          return
        }
        console.log('Number of records inserted: ', result.affectedRows);
        res.send('Record(s) inserted.');
      });

}

const updateProduct = async(req, res) => {
    const id = req.params.id;
    const newData  = req.body;
    const keys = Object.keys(newData)
    keys.push(["updated_at"])
    const setClause = keys.map(Key => `${Key} = ?`).join(', ');
    const values = Object.values(newData);
    values.push(new Date())
    values.push(id)
    const sql = `UPDATE product SET ${setClause} WHERE id = ?`;
    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records updated: ', result.affectedRows);
        res.send('Record updated.');
    });
}

module.exports = {
    getProduct,
    addProduct,
    updateProduct
}