import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/admin/ProductList";
import ProductDetail from "../pages/ProductDetail";
import ProductCreate from "../pages/admin/ProductCreate";
import ProductUpdate from "../pages/admin/ProductUpdate";
import TrashList from "../pages/admin/TrashList";

const AppRoutes = ({ reloadTrashCount }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/list" element={<ProductList reloadTrashCount={reloadTrashCount} />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/:id/edit" element={<ProductUpdate />} />
            <Route path="/trashes" element={<TrashList reloadTrashCount={reloadTrashCount} />} />
        </Routes>
    );
};

export default AppRoutes;
