const request = require('supertest');

const api = request('http://127.0.0.1:3001');

describe('Prueba de integración del CRUD de productos', () => {
    let productoId;

    const producto = {
        nombre: `Producto de prueba ${Date.now()}`,
        descripcion: 'Creado por una prueba automatizada',
        precio: 12.5,
        categoria: 'Café',
        stock: 10
    };

    afterAll(async () => {
        if (productoId) {
            await api.delete(`/api/productos/${productoId}`);
        }
    });

    test('crear, consultar, actualizar y eliminar un producto', async () => {
        // Crear
        const creado = await api
            .post('/api/productos')
            .send(producto);

        expect(creado.statusCode).toBe(201);
        expect(creado.body.producto.nombre).toBe(producto.nombre);

        productoId = creado.body.producto._id;
        expect(productoId).toBeDefined();

        // Consultar por ID
        const consultado = await api.get(`/api/productos/${productoId}`);

        expect(consultado.statusCode).toBe(200);
        expect(consultado.body.nombre).toBe(producto.nombre);

        // Actualizar
        const actualizado = await api
            .put(`/api/productos/${productoId}`)
            .send({ precio: 15, stock: 20 });

        expect(actualizado.statusCode).toBe(200);
        expect(actualizado.body.producto.precio).toBe(15);
        expect(actualizado.body.producto.stock).toBe(20);

        // Eliminar
        const eliminado = await api.delete(`/api/productos/${productoId}`);

        expect(eliminado.statusCode).toBe(200);

        // Confirmar que ya no existe
        const respuestaFinal = await api.get(`/api/productos/${productoId}`);

        expect(respuestaFinal.statusCode).toBe(404);

        // Ya se eliminó correctamente
        productoId = null;
    });
});