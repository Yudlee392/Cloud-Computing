//* import library
const pg_conn = require("./pg_config")
const productData = require("./productData")
const shopData = require("./shopData")
const authen = require("./authenticator")

async function tableString(shopId, role) {
    //* get data from table products and shops
    let [productsInfo, productsRowCount, productsField] = await productData(shopId)
    let [shopInfo, shopField] = await shopData(shopId)

    //* shop info
    let heading = ''
    shopField.forEach(field => {
        let fieldName = field.name
        heading += `${fieldName.toUpperCase()}: ${shopInfo[fieldName]}; `
    })

    //* Heading of table
    let tableHeading = ''
    if (role == 'shop') tableHeading += `
        <form method="POST" action="/addProduct">
            <button type="submit" class="btn btn-success">Add product</button>
        </form>
        <form method="POST" action="/updateProduct">
            <button type="submit" class="btn btn-success ml-1">Update product</button>
        </form>
        <form method="POST" action="/deleteProduct">
            <button type="submit" class="btn btn-success ml-1">Delete product</button>
        </form>
    `
    productsField.forEach(field => {
        tableHeading += `<th scope="col">${field.name}</th>`
    })

    //* Body of table
    let tableBody = ''
    for (let i = 0; i < productsRowCount; i++) {
        tableBody += '<tr>'
        for (let j = 0; j < productsField.length; j++) {
            let fieldName = productsField[j].name
            tableBody += `
                <td>${productsInfo[i][fieldName]}</td>
            `
        }
        tableBody += '</tr>'
    }

    //? Table HTML
    let tableString = `
        <blockquote class="blockquote mt-4">
            <p class="mb-0">${heading}</p>
        </blockquote>
        <table class="table mt-4">
        <thead class="thead-dark">
            <tr>${tableHeading}</tr>
        </thead>
        <tbody>
            ${tableBody}
        </tbody>
        </table>
    `

    return tableString
}
module.exports = tableString;