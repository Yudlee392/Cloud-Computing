var pg_conn = require("./pg_config")

async function idShop(user, pass) {
    const acc_query = {
        text: 'SELECT shop FROM users WHERE name =$1 AND passwd =$2',
        values: [user, pass]
    }
    var query_data = await pg_conn.query(acc_query)
    
    if (query_data.rowCount == 1) {
        return query_data.rows[0].shop
    }
    return 0;
}

module.exports = idShop;