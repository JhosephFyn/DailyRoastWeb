import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../../services/productoService';

function ProductoTable() {

    // Lista de productos
    const [productos, setProductos] = useState([]);

    // Estado de carga
    const [cargando, setCargando] = useState(true);

    // Mensaje de error
    const [error, setError] = useState('');

    // Controla la ventana emergente
    const [dialogVisible, setDialogVisible] = useState(false);

    // Producto que se está creando o editando
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Indica si estamos creando un producto
    const [modoCrear, setModoCrear] = useState(false);


    // =====================================================
    // CARGAR PRODUCTOS
    // =====================================================

    useEffect(() => {
        cargarProductos();
    }, []);


    const cargarProductos = async () => {

        try {

            setCargando(true);

            const respuesta = await listarProductos();

            setProductos(respuesta.data);
            setError('');

        } catch (error) {

            console.error('Error al cargar productos:', error);

            setError('No fue posible cargar los productos.');

        } finally {

            setCargando(false);
        }
    };


    // =====================================================
    // CREAR PRODUCTO
    // =====================================================

    const abrirCrear = () => {

        setProductoSeleccionado({
            nombre: '',
            descripcion: '',
            precio: 0,
            categoria: '',
            stock: 0
        });

        setModoCrear(true);
        setDialogVisible(true);
        setError('');
    };


    // =====================================================
    // EDITAR PRODUCTO
    // =====================================================

    const abrirEditar = (producto) => {

        setProductoSeleccionado({
            ...producto
        });

        setModoCrear(false);
        setDialogVisible(true);
        setError('');
    };


    // =====================================================
    // CAMBIAR CAMPOS DEL FORMULARIO
    // =====================================================

    const cambiarCampo = (campo, valor) => {

        setProductoSeleccionado({
            ...productoSeleccionado,
            [campo]: valor
        });
    };


    // =====================================================
    // GUARDAR PRODUCTO
    // =====================================================

    const guardarCambios = async () => {

        try {

            if (modoCrear) {

                // Crear producto mediante POST
                await crearProducto(productoSeleccionado);

            } else {

                // Actualizar producto mediante PUT
                await actualizarProducto(
                    productoSeleccionado._id,
                    productoSeleccionado
                );
            }

            // Cerrar ventana
            setDialogVisible(false);

            // Limpiar datos
            setProductoSeleccionado(null);
            setModoCrear(false);

            // Actualizar la tabla
            await cargarProductos();

        } catch (error) {

            console.error('Error al guardar producto:', error);

            setError('No fue posible guardar el producto.');
        }
    };


    // =====================================================
    // ELIMINAR PRODUCTO
    // =====================================================

    const eliminar = async (id) => {

        const confirmar = window.confirm(
            '¿Está seguro de que desea eliminar este producto?'
        );

        if (!confirmar) {
            return;
        }

        try {

            await eliminarProducto(id);

            await cargarProductos();

        } catch (error) {

            console.error('Error al eliminar producto:', error);

            setError('No fue posible eliminar el producto.');
        }
    };


    // =====================================================
    // BOTONES DE ACCIONES
    // =====================================================

    const acciones = (producto) => {

        return (
            <div
                style={{
                    display: 'flex',
                    gap: '8px'
                }}
            >

                <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    severity="warning"
                    onClick={() => abrirEditar(producto)}
                />

                <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => eliminar(producto._id)}
                />

            </div>
        );
    };


    // =====================================================
    // PIE DE LA VENTANA
    // =====================================================

    const pieDialog = (

        <div>

            <Button
                label="Cancelar"
                icon="pi pi-times"
                severity="secondary"
                onClick={() => {
                    setDialogVisible(false);
                    setProductoSeleccionado(null);
                    setModoCrear(false);
                }}
            />

            <Button
                label="Guardar"
                icon="pi pi-check"
                onClick={guardarCambios}
            />

        </div>
    );


    // =====================================================
    // INTERFAZ
    // =====================================================

    return (

        <div className="producto-table">

            <h2>Productos Daily Roast</h2>

            {/* Botón para crear producto */}

            <Button
                label="Nuevo producto"
                icon="pi pi-plus"
                onClick={abrirCrear}
                style={{
                    marginBottom: '15px'
                }}
            />


            {/* Mensaje de carga */}

            {cargando && (
                <p>Cargando productos...</p>
            )}


            {/* Mensaje de error */}

            {error && (
                <p>{error}</p>
            )}


            {/* Tabla */}

            {!cargando && !error && (

                <DataTable
                    value={productos}
                    stripedRows
                    showGridlines
                    emptyMessage="No hay productos registrados."
                >

                    <Column
                        field="_id"
                        header="ID"
                    />

                    <Column
                        field="nombre"
                        header="Nombre"
                    />

                    <Column
                        field="descripcion"
                        header="Descripción"
                    />

                    <Column
                        field="precio"
                        header="Precio"
                    />

                    <Column
                        field="categoria"
                        header="Categoría"
                    />

                    <Column
                        field="stock"
                        header="Stock"
                    />

                    <Column
                        header="Acciones"
                        body={acciones}
                    />

                </DataTable>

            )}


            {/* =================================================
                VENTANA PARA CREAR / EDITAR
            ================================================= */}

            <Dialog
                header={
                    modoCrear
                        ? 'Nuevo producto'
                        : 'Editar producto'
                }
                visible={dialogVisible}
                style={{
                    width: '450px'
                }}
                footer={pieDialog}
                onHide={() => {
                    setDialogVisible(false);
                    setProductoSeleccionado(null);
                    setModoCrear(false);
                }}
            >

                {productoSeleccionado && (

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}
                    >

                        {/* Nombre */}

                        <div>

                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '5px'
                                }}
                            >
                                Nombre
                            </label>

                            <InputText
                                value={
                                    productoSeleccionado.nombre
                                }
                                onChange={(e) =>
                                    cambiarCampo(
                                        'nombre',
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: '100%'
                                }}
                            />

                        </div>


                        {/* Descripción */}

                        <div>

                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '5px'
                                }}
                            >
                                Descripción
                            </label>

                            <InputText
                                value={
                                    productoSeleccionado.descripcion
                                }
                                onChange={(e) =>
                                    cambiarCampo(
                                        'descripcion',
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: '100%'
                                }}
                            />

                        </div>


                        {/* Precio */}

                        <div>

                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '5px'
                                }}
                            >
                                Precio
                            </label>

                            <InputNumber
                                value={
                                    productoSeleccionado.precio
                                }
                                onValueChange={(e) =>
                                    cambiarCampo(
                                        'precio',
                                        e.value
                                    )
                                }
                                style={{
                                    width: '100%'
                                }}
                            />

                        </div>


                        {/* Categoría */}

                        <div>

                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '5px'
                                }}
                            >
                                Categoría
                            </label>

                            <InputText
                                value={
                                    productoSeleccionado.categoria
                                }
                                onChange={(e) =>
                                    cambiarCampo(
                                        'categoria',
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: '100%'
                                }}
                            />

                        </div>


                        {/* Stock */}

                        <div>

                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '5px'
                                }}
                            >
                                Stock
                            </label>

                            <InputNumber
                                value={
                                    productoSeleccionado.stock
                                }
                                onValueChange={(e) =>
                                    cambiarCampo(
                                        'stock',
                                        e.value
                                    )
                                }
                                style={{
                                    width: '100%'
                                }}
                            />

                        </div>

                    </div>

                )}

            </Dialog>

        </div>
    );
}

export default ProductoTable;