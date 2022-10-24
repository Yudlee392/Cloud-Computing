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
    let heading = 'Shop '
    shopField.forEach(field => {
        let fieldName = field.name
        if (fieldName) {
            heading += `${fieldName.toUpperCase()}: ${shopInfo[fieldName]}; `
        }
    })
    if (role == 'shop') { heading += '<a style="text-shadow: none;" href="/logout" class="btn btn-outline-danger btn-logout">Log out</a>' }

    //! Heading of table
    let tableHeading = ''
    productsField.forEach(field => {
        tableHeading += `<th scope="col">${field.name.toUpperCase()}</th>`
    })
    if (role == 'shop') {
        tableHeading += `<th scope="col">Action</th>`
    }

    //! Body of table
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
                <td style="display: flex;">
                <form action ="/users/delete" method = "post">
                    <button type="submit" class="btn btn-outline-danger" data-mdb-ripple-color="dark" name="delete" value ="${productsInfo[i].id}">Delete</button>
                </form>
                <form action ="/users/update" method = "post">
                    <button type="submit" class="btn btn-outline-primary ml-3" data-mdb-ripple-color="dark" name ="update" value ="${productsInfo[i].id}">Update</button>
                </form>
                </td>`
        }
        tableBody += `</tr>`
    }
    if (role == 'shop') {
        tableBody += `<tr> <form method = "post" action ="/users/insert">`
        tableBody += `
                <td>
                    <input type="text" class="form-control" readonly>
                </td>
            `
        for (let i = 1; i < productsField.length - 1; i++) {
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
        tableBody += `<td><button style="width: 160px !important;" type="submit" class="btn btn-outline-success" data-mdb-ripple-color="dark" name="insert" value ="insert">Insert</button></td>
                    </form> </tr>
        `
    }

    //? Table HTML
    let tableString = `
        <div class="intro">
            <div class="gradient-custom-1 h-100">
                <div class="mask d-flex align-items-center h-100">
                    <div class="container">
                        <div class="row justify-content-center">
                            <h4 class="retroshd">${heading}</h4>
                            <div class="col-12">
                                <div class="table-responsive bg-white">
                                    <table class="table mb-0">
                                        <thead class="">
                                            <tr>${tableHeading}</tr>
                                        </thead>
                                        <tbody>
                                            ${tableBody}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return tableString
}
module.exports = tableString;