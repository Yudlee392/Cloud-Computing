var pg_conn = require("./pg_config")
async function deleteProduct(id, shopId) {
    const delete_query = {
        text: 'DELETE FROM public.products WHERE id = $1 AND shop = $2; ',
        values: [id, shopId]
    }
    var query_data = await pg_conn.query(delete_query)
    console.log("Delete successfully")
}
module.exports = deleteProduct;