import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

// Busca produtos de uma categoria específica
export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
};

// Busca produtos de várias categorias em paralelo e junta o resultado
export const getProductsByCategories = async (categories) => {
  const requests = categories.map((cat) => getProductsByCategory(cat));
  const results = await Promise.all(requests);
  return results.flat();
};

// Busca detalhes de um produto pelo ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export default api;
