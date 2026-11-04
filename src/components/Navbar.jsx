
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)

  // Abre ou fecha o menu
  function alternarMenu() {
    setMenuAberto(!menuAberto)
  }

  // Fecha o menu ao navegar
  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-censo">
      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
          onClick={fecharMenu}
        >
          Censo Escolar PB 2025
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={alternarMenu}
          aria-controls="menuNavbar"
          aria-expanded={menuAberto}
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuAberto ? 'show' : ''
          }`}
          id="menuNavbar"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/"
                onClick={fecharMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/instituicoes"
                onClick={fecharMenu}
              >
                Instituições de Ensino
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
