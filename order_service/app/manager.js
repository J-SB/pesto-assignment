const logger = require('../logger')
const MySQLClient = require('./dbConnection')
const {sha256} = require('js-sha256')
const utils = require('./utils')
const _ = require('lodash')


const getOrder = async(req, res) =>{
    const query = req?.query
    let sql;

    if(query?.order_id)
     {sql = `SELECT * FROM order where id = ${query?.order_id}`; }
    else if(query?.buyer_id)
     {sql = `SELECT * FROM order where user_id = ${query?.buyer_id}`; }
    else
     {sql = `SELECT * FROM order where merchant_id = ${query?.merchant_id}`; }

    MySQLClient.db.query(sql, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        if(result.length){
            res.status(200).send({product: result})
        }
        else{
            logger.info('No record Found !!!')
            res.send({})
        }

      });
}

const updateProductRecord = async (product_id, quantity=1) => {
    sql = `SELECT count, price, updated_at from product where id=${product_id}`;
    let product;
    MySQLClient.db.query(sql, (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
        }
        if(result.length){
           product = result[0]
        }
        else{
            logger.info('No record Found !!!')
            product = {}
        }
      });

      if(product.count < 1){
        throw new Error('Product out of Stock')
      }
      if(product.count - quantity < 1){
        throw new Error('Not Enough Products left !!!')
      }

      update_sql = `UPDATE product SET count= ? , updated_at= ? where id= ? and updated_at= ? ;`
      MySQLClient.db.query(sql, [product.count - quantity, new Date(), product_id, product.updated_at], (err, result, fields) => {
        if (err) {
            console.log(`#########\n ERROR: ${err}\n ############`);
            return false
        }
        console.log('Number of records updated: ', result.affectedRows);

        if(result.affectedRows > 0)
            return true

        return false
    });

}


const addOrder = async(req, res) => {
    const data = req.body

    if(!data.hasOwnProperty('product_id'))
    {
        console.error(`Product id is not available to place the order`)
        return
    }

    const res = updateProductRecord(data['product_id'], data['quantity'])

    if(!res)
    return

    const keys = Object.keys(data)
    keys.push(["inserted_at", "updated_at"])
    const insertClause = keys.join(', ');
    const sql = `INSERT INTO order (${insertClause}) VALUES ?`;
    const values = Object.values(data)
    values.push(new Date())
    values.push(new Date())

    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
          console.log(`#########\n ERROR: ${err}\n ############`);
        }
        console.log('Number of records inserted: ', result.affectedRows);
        res.send('Record(s) inserted.');
      });

}

const updateOrder = async(req, res) => {
    const id = req.params.id;
    const newData  = req.body;
    const keys = Object.keys(newData)
    keys.push(["updated_at"])
    const setClause = keys.map(Key => `${Key} = ?`).join(', ');
    const values = Object.values(newData);
    values.push(new Date())
    values.push(id)
    const sql = `UPDATE order SET ${setClause} WHERE id = ?`;
    MySQLClient.db.query(sql, values, (err, result, fields) => {
        if (err) {
            console.error(`#########\n ERROR: ${err}\n ############`);
            return
        }
        console.log('Number of records updated: ', result.affectedRows);
        res.send('Record updated.');
    });
}

module.exports = {
    getOrder,
    addOrder,
    updateOrder
}