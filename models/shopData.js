var pg_conn = require("./pg_config")
async function showShop(shopId) {
    const shop_query = {
        text: 'SELECT * FROM shops WHERE id =$1',
        values: [shopId]
    }
    var query_data = await pg_conn.query(shop_query)
    return [query_data.rows[0],  query_data.fields];
}
module.exports = showShop;