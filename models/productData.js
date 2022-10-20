var pg_conn = require("./pg_config")
async function showProduct(shopId) {
    const product_query = {
        text: 'SELECT * FROM products WHERE shop =$1',
        values: [shopId]
    }
    var query_data = await pg_conn.query(product_query)
    return [query_data.rows, query_data.rowCount, query_data.fields];
}
module.exports = showProduct;