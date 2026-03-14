import axiosClient from "./axiosClient";

export const getProducts = (params) => {
    return axiosClient.get("/products", { params });
};

export const getProductBySlug = (slug) => {
    return axiosClient.get(`/products/${slug}`);
};

export const getProductById = (id) => {
    return axiosClient.get(`/products/${id}/edit`);
}

export const createProduct = (formData) => {
    return axiosClient.post("/products/store", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const updateProduct = (id, formData) => {
    return axiosClient.put(`/products/${id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

export const softDeleteProduct = (id) => {
    return axiosClient.delete(`/products/${id}/delete`);
};

export const bulkSoftDeleteProducts = (ids) => {
    return axiosClient.delete(`/products/bulk-delete`, {
        data: { ids }
    });
};
