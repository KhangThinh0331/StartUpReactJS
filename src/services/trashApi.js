import axiosClient from "./axiosClient";

export const getTrashedProducts = (params) => {
    return axiosClient.get("/trashes", { params });
};

export const restoreProduct = (id) => {
    return axiosClient.patch(`/trashes/${id}/restore`);
};

export const bulkRestoreProducts = (ids) => {
    return axiosClient.patch("/trashes/bulk-restore", { ids });
};

export const deleteProduct = (id) => {
    return axiosClient.delete(`/trashes/${id}/force`);
};

export const bulkDeleteProducts = (ids) => {
    return axiosClient.delete("/trashes/bulk-force", {
        data: { ids }
    });
};

export const getTrashCount = () => {
    return axiosClient.get("/trashes/count");
};