const pg_conn = require("./pg_config")

async function allShopData() {
    const shop_query = `SELECT shops.name FROM shops 
                        INNER JOIN users ON users.shop = shops.id
                        WHERE users.role = 'shop';`
    let query_data = await pg_conn.query(shop_query)
    let fieldName = query_data.fields[0].name
    let optionSelect = ''
    query_data.rows.forEach(row => {
        optionSelect += `<option value="${row[fieldName]}">${row[fieldName]}</option>`
    })
    let selectString = `
        <form method ="POST" action ="">
            <h2 class="heading-select">Select shop</h2>
            <div class="optionbox">
                <select class="custom-select" name="selectShop">
                    <option value = "all" selected>All shop</option>
                    ${optionSelect}
                </select>
            </div>
            <button type="submit" class="btn btn-success btn-rounded button-select">Submit</button>
        </form>
    `
    return selectString;
}
module.exports = allShopData;