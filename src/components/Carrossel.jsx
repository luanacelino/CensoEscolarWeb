import { Carousel } from 'react-bootstrap'
import './Carrossel.css'

function Carrossel({ itensCarrossel }) {
  return (
    <Carousel
      className="carrossel-censo"
      interval={5000}
      pause="hover"
      keyboard
      touch
      wrap
    >
      {itensCarrossel.map(({ srcImagem, titulo, descricao }, indice) => (
        <Carousel.Item key={titulo}>
          <img
            className="carousel-img"
            src={srcImagem}
            alt={titulo}
            loading={indice === 0 ? 'eager' : 'lazy'}
          />

          <Carousel.Caption className="carrossel-legenda">
            <h3>{titulo}</h3>
            <p>{descricao}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Carrossel
