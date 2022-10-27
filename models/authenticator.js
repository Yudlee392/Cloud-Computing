var pg_conn = require("./pg_config")

async function authen(user, pass) {
    var authenticated = false;
    var shop_id = 0;
    var role = ''
    const acc_query = {
        text: 'SELECT * FROM users WHERE name =$1 AND password =$2',
        values: [user, pass]
    }
    var query_data = await pg_conn.query(acc_query)
    if (query_data.rowCount == 1) {
        authenticated = true
        shop_id = query_data.rows[0].shop 
        role = query_data.rows[0].role
    }
    return [authenticated,shop_id,role]
}
authen('yudlee', 'duyle392002')
module.exports = authen;