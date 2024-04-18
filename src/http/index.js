import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const mulipartApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "multipart/form-data",
    Accept: "application/json",
  },
});

// list of all the endpoints

//[ ] Product Apis [ ]
export const getProductsApi = () => api.get("/admin/products");

export const getProductApi = (id) => api.get(`/admin/product/${id}`);

export const getProductStocksApi = (id) =>
  api.get(`/admin/product-stocks/${id}`);

export const getProductCategoriesApi = (id) =>
  api.get(`/admin/product-categories/${id}`);

export const getProductBrandsApi = (id) =>
  api.get(`/admin/product-brands/${id}`);

export const createProductApi = (data) =>
  mulipartApi.post("/admin/product", data);

export const addCategoryToProductApi = (productId, catId) =>
  api.put(`/admin/product-add-cat/${productId}/${catId}`);

export const removeCategoryFromProductApi = (productId, catId) =>
  api.put(`/admin/product-remove-cat/${productId}/${catId}`);

export const addBrandToProductApi = (productId, brandId) =>
  api.put(`/admin/product-add-brand/${productId}/${brandId}`);

export const removeBrandFromProductApi = (productId, brandId) =>
  api.put(`/admin/product-remove-brand/${productId}/${brandId}`);

// [ ]Stock Apis[ ]
export const createStockApi = (data, id) =>
  mulipartApi.post(`/admin/stock/${id}`, data);

// [ ]Brand Apis[ ]
export const createBrandApi = (data) => mulipartApi.post(`/admin/brand`, data);
export const getBrandApi = () => api.get("/admin/brand");
export const deleteBrandApi = (id) => api.delete(`/admin/brand/${id}`);

// [ ] categories Apis [ ]
export const getCategoriesApi = () => api.get("/admin/category");
export const createCategoriesApi = (data) => api.post("/admin/category", data);
export const deleteCategoryApi = (id) => api.delete(`/admin/category/${id}`);

// [ ] Offer Apis [ ]
export const getOffersApi = () => api.get(`/admin/offer`);
export const createOfferApi = (data) => api.post(`/admin/offer`, data);
export const deleteOfferApi = (id) => api.delete(`/admin/offer/${id}`);

export const addOfferToProductApi = (productId, offerId) =>
  api.put(`/admin/add-offer/${productId}/${offerId}`);
export const removeOfferFromProductApi = (productId, offerId) =>
  api.put(`/admin/remove-offer/${productId}/${offerId}`);

// Interceptors
// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       originalRequest &&
//       !originalRequest._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
//           withCredentials: true,
//         });
//         return api.request(originalRequest);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     throw error;
//   }
// );
export default api;
