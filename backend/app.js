// Importamos Express
const express = require('express');

// Importamos CORS
const cors = require('cors');

// Importamos Morgan
const morgan = require('morgan');

// Importamos las rutas de productos
const productoRoutes = require('./routes/productoRoutes');

// Creamos la aplicación Express
const app = express();

// Configuramos los middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'DailyRoastWeb API funcionando correctamente'
    });
});

// Rutas de productos
app.use('/api/productos', productoRoutes);

// Exportamos la aplicación para utilizarla en el servidor y las pruebas
module.exports = app;
