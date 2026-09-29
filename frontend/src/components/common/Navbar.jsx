function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        Daily Roast
      </div>

      <nav className="menu">
        <a href="#inicio">Inicio</a>
        <a href="#productos">Productos</a>
        <a href="#pedidos">Pedidos</a>
        <a href="#login">Iniciar sesión</a>
      </nav>
    </header>
  );
}

export default Navbar;
