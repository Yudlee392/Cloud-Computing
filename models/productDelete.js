var pg_conn = require("./pg_config")
async function deleteProduct(id, shopId) {
    const delete_query = {
        text: 'DELETE FROM public.products WHERE id = $1 AND shop = $2; ',
        values: [id, shopId]
    }
    try {
        var query_data = await pg_conn.query(delete_query)
        return 'Deleted successfully'
    } catch (err) {
        console.log(err.message)
        return 'Delete failed'
    }
}
module.exports = deleteProduct;