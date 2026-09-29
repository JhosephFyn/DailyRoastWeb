import axios from 'axios';

const API_URL = 'http://localhost:3001/api/productos';

// Listar productos
export const listarProductos = () => {
    return axios.get(API_URL);
};

// Buscar producto por ID
export const buscarProducto = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Crear producto
export const crearProducto = (producto) => {
    return axios.post(API_URL, producto);
};

// Actualizar producto
export const actualizarProducto = (id, producto) => {
    return axios.put(`${API_URL}/${id}`, producto);
};

// Eliminar producto
export const eliminarProducto = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
