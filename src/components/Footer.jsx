import { Link } from "react-router-dom";
import "../styles/footer.css";
import logo from "../assets/images/LogoWeb.png";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer mt-5">
            <div className="container py-4">
                <div className="row">

                    {/* Logo & Info */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title d-flex align-items-center">
                            <img
                                src={logo}
                                alt="logo"
                                className="logo-web me-2"
                            />
                            Bubble Tea
                        </h5>
                        <p className="footer-text">
                            Hệ thống quản lý cửa hàng cà phê giúp bạn
                            quản lý sản phẩm, đơn hàng và doanh thu hiệu quả.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title">Liên kết nhanh</h5>
                        <ul className="footer-links list-unstyled">
                            <li>
                                <Link to="/">
                                    <i className="bi bi-house-door me-2"></i> Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/products/list">
                                    <i className="bi bi-box-seam me-2"></i> Sản phẩm
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Working time */}
                    <div className="col-md-4 mb-3">
                        <h5 className="footer-title">Giờ mở cửa</h5>
                        <p className="footer-text">
                            <i className="bi bi-calendar-week me-2"></i> Thứ 2 – Chủ nhật
                        </p>
                        <p className="footer-text">
                            <i className="bi bi-clock me-2"></i> 07:00 – 22:00
                        </p>
                        <p className="footer-text">
                            <i className="bi bi-geo-alt me-2"></i> TP. Hồ Chí Minh
                        </p>
                    </div>

                </div>

                <hr />

                <div className="text-center footer-bottom">
                    © {year} Bubble Tea Coffee. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
