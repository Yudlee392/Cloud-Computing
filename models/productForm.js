var pg_conn = require("./pg_config")
async function dataProduct(productId) {
    const product_query = {
        text: 'SELECT * FROM products WHERE id =$1',
        values: [productId]
    }
    var query_data = await pg_conn.query(product_query)
    let formString = ''
    query_data.fields.forEach(field => {
        if (field.name == 'id' || field.name == 'shop') {
            formString += `
            <div class="form-group">
                <label for="${field.name}-product">${field.name.toUpperCase()}</label>
                <input readonly type="text" value="${query_data.rows[0][field.name]}" class="form-control" id="${field.name}-product" name="${field.name}" placeholder="${field.name.toUpperCase()} PRODUCT">
            </div>
        `
        } else {
            formString += `
            <div class="form-group">
                <label for="${field.name}-product">${field.name.toUpperCase()}</label>
                <input type="text" value="${query_data.rows[0][field.name]}" class="form-control" id="${field.name}-product" name="${field.name}" placeholder="${field.name.toUpperCase()} PRODUCT">
            </div>
        `
        }
    })
    return formString
}

module.exports = dataProduct