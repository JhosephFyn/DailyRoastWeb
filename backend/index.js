// Cargamos las variables de entorno
require('dotenv').config();

const app = require('./app');
const conectarBaseDatos = require('./database');

const PORT = process.env.PORT || 3001;

// Conectamos la base de datos e iniciamos el servidor
const iniciarServidor = async () => {
    await conectarBaseDatos();

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
};

iniciarServidor();