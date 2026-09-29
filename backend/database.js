// Importamos Mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Función encargada de conectar el proyecto con MongoDB
const conectarBaseDatos = async () => {

    try {

        // Obtenemos la dirección de MongoDB desde las variables de entorno
        await mongoose.connect(process.env.MONGODB_URI);

        // Confirmamos que la conexión fue exitosa
        console.log('Conexión con MongoDB establecida correctamente');

    } catch (error) {

        // Mostramos el error si la conexión falla
        console.error('Error al conectar con MongoDB:', error);

        // Detenemos la aplicación porque la base de datos es necesaria
        process.exit(1);
    }
};

// Exportamos la función para utilizarla desde index.js
module.exports = conectarBaseDatos;