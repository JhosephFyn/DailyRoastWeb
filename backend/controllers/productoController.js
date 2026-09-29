// Importamos el modelo Producto
const Producto = require('../models/Producto');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// Obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el producto',
            error: error.message
        });
    }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto: productoGuardado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el producto',
            error: error.message
        });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto: productoActualizado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(
            req.params.id
        );

        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

// Exportamos las funciones
module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
