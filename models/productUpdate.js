var pg_conn = require("./pg_config")
async function updateProduct(id, name, price, quantity, shopId) {
    const update_query = {
        text: 'UPDATE public.products SET name= $2, price=$3, quantity= $4 WHERE id = $1 AND shop = $5; ',
        values: [id, name, price, quantity, shopId]
    }
    try {
        var query_data = await pg_conn.query(update_query)
        return 'Updated successfully'
    } catch (err) {
        console.log(err.message)
        return 'Update Failed'
    }
}
module.exports = updateProduct;