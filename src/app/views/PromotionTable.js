import React, { Component } from 'react';
import { Nav, NavItem, Table, Tab, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";


class PromotionTable extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      listProduct: [],
      stock: '',
      price: '',
      dateHome: '',
      dateEnd: '',
      _id: '',
      promotionEnabled: [],
      promotionDisabled: [],
      promotion: [],
      show: false,
      show2: false,
      search: ''
    };

    this.addPromotion = this.addPromotion.bind(this);
  }


  searchHandler(e) {
    this.setState({ search: e.target.value });
  }

  stockHandler(e) {
    this.setState({ stock: e.target.value });
  }

  priceHandler(e) {
    this.setState({ price: e.target.value });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose2() {
    this.setState({ show2: false });
  }

  handleShow2() {
    this.setState({ show2: true });
  }

  dateHomeHandler(e) {
    this.setState({ dateHome: e.target.value });
  }

  dateEndHandler(e) {
    this.setState({ dateEnd: e.target.value });
  }

  addPromotion(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    fetch(`/api/promotion/${this.state._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        listProduct: this.state.listProduct,
        stock: this.state.stock,
        price: this.state.price,
        dateHome: this.state.dateHome,
        dateEnd: this.state.dateEnd
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        //window.M.toast({ html: 'Promotion Editado', classes: 'rounded' });
        this.setState({ _id: '', name: '', listProduct: '', stock: '', price: '', dateHome: '', dateEnd: '', show: false, show2: false });
        this.fetchPromotion();
      });
  }

  deletePromotion(id) {
    if (confirm('¿Seguro que desea eliminar?')) {
      fetch(`/api/promotion/${id}/${false}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Promotion Eliminado', classes: 'rounded' });
          this.fetchPromotion();
        });
    }
  }

  enterPromotion(id) {
    if (confirm('¿Seguro que desea agregar la promoción?')) {
      fetch(`/api/promotion/${id}/${true}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Promotion Agregado', classes: 'rounded' });
          this.fetchPromotion();
        });
    }
  }

  editPromotion(id) {
    fetch(`/api/promotion/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          name: data.name,
          stock: data.stock,
          price: data.price,
          listProduct: data.listProduct,
          dateHome: data.dateHome,
          dateEnd: data.dateEnd,
          _id: data._id
        });
      });
    this.handleShow();
  }

  modalMove(id) {
    fetch(`/api/promotion/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          price: data.price,
          listProduct: data.listProduct,
          _id: data._id
        });
      });
    this.handleShow2();
  }

  componentDidMount() {
    this.fetchPromotion();
  }

  fetchPromotion() {
    fetch(`/api/promotion`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotion: data });
        console.log(this.state.promotion);
      });
    fetch(`/api/promotion/enabled/false`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotionDisabled: data });
      });
    fetch(`/api/promotion/enabled/true`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotionEnabled: data });
      });
  }

  fechaCorta(date) {
    const fec = new Date(date);
    return `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`
  }

  fecha(date) {
    //const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
    const f = new Date(date);
    return (f.getDate() + " " + meses[f.getMonth()] + " " + f.getFullYear());
  }

  showResults() {
    console.log(this.state.search);
    fetch(`/api/promotion/search/${this.state.search}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotion: data });
        console.log(this.state.promotion);
      });
    fetch(`/api/promotion/search/${this.state.search}/true`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotionEnabled: data });
        console.log(this.state.promotionEnabled);
      });
    fetch(`/api/promotion/search/${this.state.search}/false`)
      .then(res => res.json())
      .then(data => {
        this.setState({ promotionDisabled: data });
        console.log(this.state.promotionDisabled);
      });
  }


  render() {
    return (
      <div>
        <div className="container" id="table-promotion" >
          <div className="section">
            <Row className="clearfix">
              <FormGroup controlId="formSearch">
                <Col sm={5} xs={8}>
                  <FormControl type="search" value={this.state.search} onChange={(e) => this.searchHandler(e)} placeholder="Buscar..." />
                </Col>
                <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.showResults()}>
                  <i className="material-icons">search</i>
                </Button>
              </FormGroup>
            </Row>
          </div>
          <div style={{ paddingTop: '10px' }}>
            <Tab.Container id="tabs-with" defaultActiveKey="second">
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="first">Todos</NavItem>
                    <NavItem eventKey="second">Habilitados</NavItem>
                    <NavItem eventKey="third">Deshabilitados</NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <Table condensed hover responsive>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Stock</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.promotion.map(prom => {
                              return (
                                <tr key={prom._id}>
                                  <td>{prom.name}</td>
                                  <td>{this.fecha(prom.dateHome)}</td>
                                  <td>{this.fecha(prom.dateEnd)}</td>
                                  <td>{prom.stock}</td>
                                  <td>$ {prom.price}</td>
                                  <td>
                                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.modalMove(prom._id)} >
                                      <i className="material-icons">pageview</i>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Table condensed hover responsive>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Stock</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.promotionEnabled.map(prom => {
                              return (
                                <tr key={prom._id}>
                                  <td>{prom.name}</td>
                                  <td>{this.fecha(prom.dateHome)}</td>
                                  <td>{this.fecha(prom.dateEnd)}</td>
                                  <td>{prom.stock}</td>
                                  <td>$ {prom.price}</td>
                                  <td>
                                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editPromotion(prom._id)} style={{ margin: '4px' }}>
                                      <i className="material-icons">edit</i>
                                    </Button>
                                    <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.deletePromotion(prom._id)} style={{ margin: '5px' }}>
                                      <i className="material-icons">delete</i>
                                    </Button>
                                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.modalMove(prom._id)} >
                                      <i className="material-icons">pageview</i>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Table condensed hover responsive>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Stock</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.promotionDisabled.map(prom => {
                              return (
                                <tr key={prom._id}>
                                  <td>{prom.name}</td>
                                  <td>{this.fecha(prom.dateHome)}</td>
                                  <td>{this.fecha(prom.dateEnd)}</td>
                                  <td>{prom.stock}</td>
                                  <td>$ {prom.price}</td>
                                  <td>
                                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editPromotion(prom._id)} style={{ margin: '4px' }}>
                                      <i className="material-icons">edit</i>
                                    </Button>
                                    <Button bsStyle="success" bsSize="xsmall" onClick={() => this.enterPromotion(prom._id)} style={{ margin: '5px' }}>
                                      <i className="material-icons">add</i>
                                    </Button>
                                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.modalMove(prom._id)} >
                                      <i className="material-icons">pageview</i>
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Promoción</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form horizontal>
                <FormGroup controlId="formDateHome">
                  <Col componentClass={ControlLabel} sm={2}>
                    Fecha desde
                  </Col>
                  <Col sm={10}>
                    <FormControl type="date" required value={this.fechaCorta(this.state.dateHome)} onChange={(e) => this.dateHomeHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formDateEnd">
                  <Col componentClass={ControlLabel} sm={2}>
                    Fecha hasta
                  </Col>
                  <Col sm={10}>
                    <FormControl type="date" required value={this.fechaCorta(this.state.dateEnd)} onChange={(e) => this.dateEndHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formStock">
                  <Col componentClass={ControlLabel} sm={2}>
                    Stock
                  </Col>
                  <Col sm={10}>
                    <FormControl type="number" min="0" required value={this.state.stock} onChange={(e) => this.stockHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formPrice">
                  <Col componentClass={ControlLabel} sm={2}>
                    Precio
                  </Col>
                  <Col sm={10}>
                    <FormControl type="number" min="0" step=".01" required value={this.state.price} onChange={(e) => this.priceHandler(e)} />
                  </Col>
                </FormGroup>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.handleClose()}>Cerrar</Button>
              <Button bsStyle="primary" onClick={this.addPromotion}>Guardar</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.show2} onHide={() => this.handleClose2()}>
            <Modal.Header closeButton>
              <Modal.Title>Productos en la Promoción</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><small>Promoción: </small>{this.state.name}</p>
              <p><small>Importe: </small>{this.state.price}</p>

              <Table condensed responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.listProduct.map(prod => {
                      return (
                        <tr key={prod._id}>
                          <td>{prod.name}</td>
                          <td>{prod.quantity}</td>
                          <td>$ {prod.amount}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.handleClose2()}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PromotionTable;