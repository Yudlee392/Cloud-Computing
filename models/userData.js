var pg_conn = require("./pg_config")
const shopData = require("./shopData")

async function userData(user, shopId) {
    let [shopInfo, shopField] = await shopData(shopId)
    let userData = `
        <header id="header">
            <div class="d-flex flex-column">

                <div class="profile">
                    <img src="assets/img/profile-img.jpg" alt="" class="img-fluid rounded-circle">
                    <h1 class="text-light"><a href="index.html">${user}</a></h1>
                    <div class="social-links mt-3 text-center">
                        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                    </div>
                </div>

                <nav id="navbar" class="nav-menu navbar">
                    <ul>
                        <li><a href="#" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Shop: ${shopInfo.name}</span></a>
                        </li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>${shopInfo.contact}</span></a>
                        </li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-user"></i> <span>${shopInfo.address}</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-file-blank"></i> <span>Resume</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-book-content"></i>
                                <span>Portfolio</span></a></li>
                        <li><a href="#" class="nav-link scrollto"><i class="bx bx-server"></i> <span>Services</span></a></li>
                    </ul>
                </nav><!-- .nav-menu -->
            </div>
        </header>
    `
    return userData;
}
module.exports = userData;