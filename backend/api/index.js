
const app = require('../app');
const conectarBaseDatos = require('../database');

let conexionPromise;

module.exports = async (req, res) => {
    try {
        if (!conexionPromise) {
            conexionPromise = conectarBaseDatos().catch((error) => {
                conexionPromise = null;
                throw error;
            });
        }

        await conexionPromise;
        return app(req, res);
    } catch (error) {
        console.error('Error al iniciar la API:', error.message);

        return res.status(500).json({
            mensaje: 'Error al conectar con la base de datos'
        });
    }
};