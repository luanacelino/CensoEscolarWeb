import { Card, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Carrossel from '../components/Carrossel'

function Home() {

  const itensCarrossel = [
    {
      srcImagem: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
      titulo: 'Censo Escolar 2025',
      descricao: 'Conheça os dados das instituições de ensino da Paraíba.'
    },
    {
      srcImagem: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45',
      titulo: 'Educação na Paraíba',
      descricao: 'Informações sobre a rede de ensino paraibana.'
    },
    {
      srcImagem: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      titulo: 'Instituições de Ensino',
      descricao: 'Explore os dados do Censo Escolar 2025.'
    }
  ]

  const cards = [
    {
      titulo: 'Censo Escolar 2025',
      descricao: 'Conheça os dados educacionais utilizados para apresentar um panorama das instituições de ensino da Paraíba.',
      link: 'Conhecer os dados'
    },
    {
      titulo: 'Instituições de Ensino',
      descricao: 'Consulte informações sobre as instituições de ensino presentes na base de dados do Censo Escolar.',
      link: 'Consultar instituições'
    },
    {
      titulo: 'Matrículas',
      descricao: 'Confira o ranking das dez instituições com maior quantidade de matrículas na educação básica.',
      link: 'Ver ranking'
    }
  ]

  return (
    <Container className="mt-4 mb-5">

      {/* Carrossel principal */}
      <Carrossel itensCarrossel={itensCarrossel} />

      {/* Apresentação dos conteúdos */}
      <div className="text-center mt-5 mb-4">
        <h2>Explore os dados da educação paraibana</h2>

        <p className="text-muted">
          Acesse informações e conheça um pouco mais sobre a educação
          na Paraíba a partir dos dados do Censo Escolar 2025.
        </p>
      </div>

      {/* Cards informativos */}
      <Row className="g-4">

        {cards.map((card, indice) => (
          <Col md={4} key={indice}>

            <Card className="h-100 shadow-sm border-0">

              <Card.Body className="d-flex flex-column">

                <Card.Title className="fw-bold">
                  {card.titulo}
                </Card.Title>

                <Card.Text className="text-muted">
                  {card.descricao}
                </Card.Text>

                <div className="mt-auto pt-3">
                  <Card.Link
                    as={Link}
                    to="/instituicoes"
                    className="text-decoration-none fw-semibold"
                  >
                    {card.link} →
                  </Card.Link>
                </div>

              </Card.Body>

            </Card>

          </Col>
        ))}

      </Row>

    </Container>
  )
}

export default Home