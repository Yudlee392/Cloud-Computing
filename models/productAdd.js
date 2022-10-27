const e = require("express")
var pg_conn = require("./pg_config")
async function addProduct(name, price, quantity, shopId) {
    const add_query = {
        text: 'INSERT INTO public.products(name, price, quantity, shop) VALUES($1, $2 , $3, $4); ',
        values: [name, price, quantity, shopId]
    }
    try {
        var query_data = await pg_conn.query(add_query)
        return 'Insert successfully'
    } catch (err) {
        console.log(err.message)
        return 'Insert Failed'
    }
}
module.exports = addProduct;