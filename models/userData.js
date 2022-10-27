var pg_conn = require("./pg_config")
const shopData = require("./shopData")

async function userData(user, shopId) {
    let [shopInfo, shopField] = await shopData(shopId)
    let userData = `
        <header id="header">
            <div class="d-flex flex-row">
                <div class="profile">
                    <h1 class="text-light"><a href="/user">${user}</a></h1>
                </div>

                <nav id="navbar" class="nav-menu navbar">
                    <ul>
                        <li><a href="#" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Shop: ${shopInfo.name}</span></a>
                        </li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>${shopInfo.contact}</span></a>
                        </li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-user"></i> <span>User</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Resume</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-book-content"></i>
                                <span>Portfolio</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-server"></i> <span>${shopInfo.address}</span></a></li>
                    </ul>
                </nav><!-- .nav-menu -->
            </div>
        </header>  
    `
    return userData;
}
module.exports = userData;