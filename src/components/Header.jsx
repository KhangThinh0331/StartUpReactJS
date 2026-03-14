import { Link } from "react-router-dom";
import '../styles/header.css';
import logo from '../assets/images/LogoWeb.png';

function Header({ trashCount = 0 }) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning-subtle shadow-sm">
                <div className="container">

                    <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="logo-web me-2"
                        />
                        Bubble Tea
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle fw-semibold"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-cup-hot me-1"></i> Sản phẩm
                                </a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/products/create">
                                            <i className="bi bi-plus-circle me-2"></i> Thêm sản phẩm
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/products/list">
                                            <i className="bi bi-list-ul me-2"></i> Danh sách sản phẩm
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link fw-semibold position-relative"
                                    to="/trashes"
                                >
                                    <i className="bi bi-trash me-1"></i> Thùng rác

                                    {trashCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {trashCount}
                                        </span>
                                    )}
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
