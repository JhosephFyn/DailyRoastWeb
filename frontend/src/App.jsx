import './App.css';
import Navbar from './components/common/Navbar';
import ProductoTable from './components/productos/ProductoTable';

function App() {
  return (
    <div className="app">

      {/* Barra de navegación principal */}
      <Navbar />

      <main>

        {/* Página de inicio */}
        <section id="inicio" className="hero">
          <h1>Bienvenido a Daily Roast</h1>

          <p>
            Disfruta de nuestros productos de café y realiza
            tus pedidos de manera fácil y rápida.
          </p>

          <button type="button">
            Ver productos
          </button>
        </section>

        {/* Sección de productos */}
        <section id="productos" className="productos">
          <ProductoTable />
        </section>

        {/* Sección de pedidos */}
        <section id="pedidos" className="productos">
          <h2>Pedidos</h2>

          <p>
            En esta sección se gestionarán los pedidos de Daily Roast.
          </p>
        </section>

        {/* Sección de inicio de sesión */}
        <section id="login" className="productos">
          <h2>Iniciar sesión</h2>

          <p>
            Próximamente estará disponible el formulario de inicio de sesión.
          </p>
        </section>

      </main>

    </div>
  );
}

export default App;