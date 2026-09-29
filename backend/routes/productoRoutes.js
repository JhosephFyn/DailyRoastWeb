// Importamos Express
const express = require('express');

// Creamos el router
const router = express.Router();

// Importamos las funciones del controller
const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Rutas de productos

// GET /api/productos
router.get('/', obtenerProductos);

// GET /api/productos/:id
router.get('/:id', obtenerProductoPorId);

// POST /api/productos
router.post('/', crearProducto);

// PUT /api/productos/:id
router.put('/:id', actualizarProducto);

// DELETE /api/productos/:id
router.delete('/:id', eliminarProducto);

// Exportamos las rutas
module.exports = router;
