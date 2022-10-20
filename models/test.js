var pg_conn = require("./pg_config")
async function addProduct(name, price, quantity, shopId) {
    const add_query = {
        text: 'INSERT INTO public.products(name, price, quantity, shop) VALUES($1, $2 , $3, $4); ',
        values: [name, price, quantity, shopId]
    }
    var query_data = await pg_conn.query(add_query)
    console.log("Add successfully")
}

addProduct('bup be', 1000, 10, 1)