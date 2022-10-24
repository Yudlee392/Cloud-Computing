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
        if (fieldName) {
            heading += `${fieldName.toUpperCase()}: ${shopInfo[fieldName]}; `
        }
    })
    if (role == 'shop') { heading += '<a href="/logout" class="btn btn-danger">Logout</a>' }

    //* Heading of table
    let tableHeading = ''
    productsField.forEach(field => {
        tableHeading += `<th scope="col">${field.name}</th>`
    })
    if (role == 'shop') {
        tableHeading += `<th scope="col">Action</th>`
    }
    
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
        if (role == 'shop') {
            tableBody += `
                <td>
                <form action ="http://127.0.0.1:3000/users/action" method = "post">
                    <button type="submit" class="btn btn-danger" name="delete" value ="${productsInfo[i].id}">Delete</button>
                    <button type="submit" class="btn btn-primary ml-1" name ="update" value ="${productsInfo[i].id}">Update</button>
                </form>
                </td>`
        }
        tableBody += `</tr>`
    }
    if (role == 'shop') {
        tableBody += `<tr> <form method = "post" action ="http://127.0.0.1:3000/users">`
        tableBody += `
                <td>
                    <input type="text" class="form-control" readonly>
                </td>
            `
        for (let i = 1; i < productsField.length -1; i++) {
            tableBody += `
                <td>
                    <input type="text" class="form-control" name="insert_${productsField[i].name}" placeholder="${productsField[i].name.toUpperCase()}">
                </td>
            `
        }
        tableBody += `
                <td>
                    <input type="text" class="form-control" readonly>
                </td>
            `
        tableBody += `<td><button style="width: 160px !important;" type="submit" class="btn btn-success" name="insert" value ="insert">Insert</button></td>
                    </form> </tr>
        `
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