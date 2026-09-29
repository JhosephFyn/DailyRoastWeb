// Importamos Mongoose
const mongoose = require('mongoose');

// Definimos la estructura de los productos
const productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            required: true,
            trim: true
        },

        precio: {
            type: Number,
            required: true,
            min: 0
        },

        categoria: {
            type: String,
            required: true,
            trim: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

// Creamos y exportamos el modelo
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
