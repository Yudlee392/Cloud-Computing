var pg_conn = require("./pg_config")

async function signup(name, shop_id, password) {
    const acc_query = {
        text: `INSERT INTO public.users(name, shop, passwd, role) VALUES($1, $2, $3, 'shop');`,
        values: [name, shop_id, password]
    }
    var query_data = await pg_conn.query(acc_query)
    console.log('Sign up successfully')
}
module.exports = signup;