
import { Link } from 'react-router-dom'

function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="footer-censo py-4 mt-auto">
      <div className="container">

        <div className="row align-items-center text-center text-md-start">

          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold mb-2">
              Censo Escolar PB
            </h5>

            <p className="text-white-50 mb-0">
              Informações sobre a educação na Paraíba.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <Link
              to="/"
              className="text-decoration-none me-3"
            >
              Home
            </Link>

            <Link
              to="/instituicoes"
              className="text-decoration-none"
            >
              Instituições de Ensino
            </Link>
          </div>

        </div>

        <hr className="border-secondary my-3" />

        <div className="text-center">
          <p className="text-white-50 small mb-1">
            Dados referentes ao Censo Escolar 2025.
          </p>

          <p className="text-white-50 small mb-0">
            © {anoAtual} Censo Escolar da Paraíba. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
