
import { useState } from 'react'
import {
  Container,
  Table,
  Badge,
  Form,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import dadosInstituicoes from '../datasets/instituicoes_pb_2025.json'

function InstituicoesEnsino() {
  const [pesquisa, setPesquisa] = useState('')
  const [municipioSelecionado, setMunicipioSelecionado] = useState('')
  const [instituicaoSelecionada, setInstituicaoSelecionada] = useState(null)

  // Organiza as instituições pela quantidade de matrículas básicas
  const instituicoes = [...dadosInstituicoes]
    .sort(
      (a, b) =>
        Number(b.qt_mat_bas || 0) - Number(a.qt_mat_bas || 0)
    )
    .slice(0, 10)

  // Obtém os municípios sem repetição e em ordem alfabética
  const municipios = [
    ...new Set(
      dadosInstituicoes.map((instituicao) => instituicao.no_municipio)
    )
  ].sort((a, b) => a.localeCompare(b, 'pt-BR'))

  // Normaliza o texto para facilitar pesquisas com ou sem acentos
  function normalizarTexto(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  // Verifica se existe algum filtro ativo
  const existeFiltro = pesquisa.trim() !== '' || municipioSelecionado !== ''

  // Filtra as instituições pelo nome e município
  const resultadosPesquisa = existeFiltro
    ? dadosInstituicoes
        .filter((instituicao) => {
          const nome = normalizarTexto(instituicao.no_entidade)
          const municipio = normalizarTexto(instituicao.no_municipio)
          const termo = normalizarTexto(pesquisa.trim())

          const correspondePesquisa =
            !termo ||
            nome.includes(termo) ||
            municipio.includes(termo)

          const correspondeMunicipio =
            !municipioSelecionado ||
            instituicao.no_municipio === municipioSelecionado

          return correspondePesquisa && correspondeMunicipio
        })
        .sort((a, b) =>
          a.no_entidade.localeCompare(b.no_entidade, 'pt-BR')
        )
    : []

  // Formata números no padrão brasileiro
  function formatarNumero(valor) {
    return Number(valor || 0).toLocaleString('pt-BR')
  }

  // Define o destaque visual das três primeiras posições
  function obterDestaque(indice) {
    if (indice === 0) {
      return { cor: 'warning', texto: '1º lugar' }
    }

    if (indice === 1) {
      return { cor: 'secondary', texto: '2º lugar' }
    }

    if (indice === 2) {
      return { cor: 'danger', texto: '3º lugar' }
    }

    return null
  }

  // Limpa todos os filtros e a instituição selecionada
  function limparPesquisa() {
    setPesquisa('')
    setMunicipioSelecionado('')
    setInstituicaoSelecionada(null)
  }

  return (
    <Container className="mt-5 mb-5">

      {/* Cabeçalho */}
      <div className="text-center mb-4">
        <h2 className="mb-3">
          Instituições de Ensino da Paraíba
        </h2>

        <p className="text-muted">
          Consulte as instituições de ensino da Paraíba e confira
          os dados do Censo Escolar 2025.
        </p>
      </div>

      {/* Área de pesquisa e filtros */}
      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-2">
            Pesquisar instituição
          </h4>

          <p className="text-muted mb-4">
            Utilize o nome da instituição ou selecione um município
            para encontrar os registros na base de dados.
          </p>

          <Row className="g-3">
            {/* Pesquisa pelo nome */}
            <Col xs={12} md={7}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Nome da instituição
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ex.: Escola Municipal..."
                  value={pesquisa}
                  onChange={(e) => {
                    setPesquisa(e.target.value)
                    setInstituicaoSelecionada(null)
                  }}
                />

                <Form.Text className="text-muted">
                  A pesquisa funciona mesmo sem acentos.
                </Form.Text>
              </Form.Group>
            </Col>

            {/* Filtro por município */}
            <Col xs={12} md={5}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Município
                </Form.Label>

                <Form.Select
                  value={municipioSelecionado}
                  onChange={(e) => {
                    setMunicipioSelecionado(e.target.value)
                    setInstituicaoSelecionada(null)
                  }}
                >
                  <option value="">
                    Todos os municípios
                  </option>

                  {municipios.map((municipio) => (
                    <option key={municipio} value={municipio}>
                      {municipio}
                    </option>
                  ))}
                </Form.Select>

                <Form.Text className="text-muted">
                  Selecione um município da Paraíba.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {/* Resultados da pesquisa */}
          {existeFiltro && (
            <div className="mt-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
                <span className="fw-semibold">
                  Resultados encontrados: {resultadosPesquisa.length}
                </span>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={limparPesquisa}
                >
                  Limpar filtros
                </Button>
              </div>

              {resultadosPesquisa.length > 0 ? (
                <>
                  <div className="list-group">
                    {resultadosPesquisa.slice(0, 15).map((instituicao) => (
                      <button
                        type="button"
                        key={instituicao.co_entidade}
                        className={`list-group-item list-group-item-action ${
                          instituicaoSelecionada?.co_entidade === instituicao.co_entidade
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          setInstituicaoSelecionada(instituicao)
                        }
                      >
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-1">
                          <span className="fw-semibold text-start">
                            {instituicao.no_entidade}
                          </span>

                          <small>
                            {instituicao.no_municipio}
                          </small>
                        </div>

                        <small>
                          Código: {instituicao.co_entidade}
                        </small>
                      </button>
                    ))}
                  </div>

                  {resultadosPesquisa.length > 15 && (
                    <p className="text-muted small mt-2 mb-0">
                      Exibindo os primeiros 15 resultados.
                      Refine os filtros para encontrar uma instituição específica.
                    </p>
                  )}
                </>
              ) : (
                <div className="alert alert-warning mb-0">
                  Nenhuma instituição foi encontrada.
                  Verifique os filtros informados.
                </div>
              )}
            </div>
          )}

          {/* Dados da instituição selecionada */}
          {instituicaoSelecionada && (
            <Card className="mt-4 border-primary">
              <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
                  <div>
                    <Badge bg="success" className="mb-2">
                      Instituição selecionada
                    </Badge>

                    <Card.Title>
                      {instituicaoSelecionada.no_entidade}
                    </Card.Title>

                    <Card.Subtitle className="text-muted">
                      {instituicaoSelecionada.no_municipio} - PB
                    </Card.Subtitle>
                  </div>

                  <div className="text-md-end">
                    <small className="text-muted">
                      Código da instituição
                    </small>

                    <div className="fw-bold">
                      {instituicaoSelecionada.co_entidade}
                    </div>
                  </div>
                </div>

                <hr />

                <h5 className="mb-3">
                  Dados de matrículas
                </h5>

                <Row className="g-3">
                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100 bg-primary text-white">
                      <Card.Body>
                        <Card.Text>
                          Total de matrículas
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_matricula)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Educação básica
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_bas)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Educação infantil
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_inf)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Ensino fundamental
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_fund)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Ensino médio
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_med)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Educação profissional
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_prof)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Educação de jovens e adultos
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_eja)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Text>
                          Educação especial
                        </Card.Text>

                        <Card.Title>
                          {formatarNumero(instituicaoSelecionada.qt_mat_esp)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>

      {/* Ranking das dez maiores instituições */}
      <div className="mt-5">
        <div className="text-center mb-4">
          <h3>
            10 maiores instituições de ensino da Paraíba
          </h3>

          <p className="text-muted">
            Ranking estadual conforme a quantidade de matrículas
            na educação básica.
          </p>
        </div>

        <div className="bg-light border rounded p-3 mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <span className="fw-semibold">
              Ranking estadual
            </span>

            <Badge bg="primary" className="p-2">
              Top 10 instituições
            </Badge>
          </div>
        </div>

        <Table
          striped
          bordered
          hover
          responsive
          className="align-middle text-center"
        >
          <thead className="table-primary">
            <tr>
              <th scope="col">Posição</th>
              <th scope="col">Código</th>
              <th scope="col">Instituição</th>
              <th scope="col">Município</th>
              <th scope="col">Matrículas básicas</th>
            </tr>
          </thead>

          <tbody>
            {instituicoes.map((instituicao, indice) => {
              const destaque = obterDestaque(indice)

              return (
                <tr
                  key={instituicao.co_entidade}
                  className={indice < 3 ? 'fw-semibold' : ''}
                >
                  <td>
                    {destaque ? (
                      <Badge bg={destaque.cor}>
                        {destaque.texto}
                      </Badge>
                    ) : (
                      `${indice + 1}º`
                    )}
                  </td>

                  <td>
                    {instituicao.co_entidade}
                  </td>

                  <td className="text-start">
                    {instituicao.no_entidade}
                  </td>

                  <td>
                    {instituicao.no_municipio}
                  </td>

                  <td className="fw-bold">
                    {formatarNumero(instituicao.qt_mat_bas)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>

      {/* Fonte dos dados */}
      <p className="text-muted text-end mt-3">
        <small>
          Fonte: Censo Escolar 2025.
        </small>
      </p>

    </Container>
  )
}

export default InstituicoesEnsino
