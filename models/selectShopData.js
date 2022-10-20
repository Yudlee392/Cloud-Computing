var pg_conn = require("./pg_config")
const tableProduct = require("./tableProduct")

async function selectShopData(selectValue) {
    let shop_query;
    let query_data;
    let dataSelectedShop = ``
    if (selectValue == 'all') {
        shop_query = `SELECT shops.id, users.role FROM shops 
                            INNER JOIN users ON users.shop = shops.id
                            WHERE users.role = 'shop';`
        query_data = await pg_conn.query(shop_query)
        for (let i = 0; i < query_data.rowCount; i++) {
            let shopId = query_data.rows[i].id
            let shopTable = await tableProduct(shopId, 'admin')
            dataSelectedShop += shopTable;
        }
    } else {
        shop_query = {
            text: `SELECT shops.id, users.role FROM shops 
                            INNER JOIN users ON users.shop = shops.id
                            WHERE users.role = 'shop' AND shops.name = $1;`,
            values: [selectValue]
        }
        query_data = await pg_conn.query(shop_query)
        let shopTable = await tableProduct(query_data.rows[0].id, 'admin')
        dataSelectedShop += shopTable
    }

    return dataSelectedShop;
}

module.exports = selectShopData;