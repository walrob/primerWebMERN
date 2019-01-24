import React, { Component } from 'react';
import { Nav, NavItem, Table, Tab, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class Move extends Component {
  constructor() {
    super();
    this.state = {
      listProduct: [],
      date: '',
      person: '',
      type: '',
      amount: '',
      _id: '',
      moveBuy: [],
      moveSale: [],
      move: [],
      show: false,
      dateHome: '',
      dateEnd: ''
    };

    this.filterMove = this.filterMove.bind(this);
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  dateHomeHandler(e) {
    this.setState({ dateHome: e.target.value });
  }

  dateEndHandler(e) {
    this.setState({ dateEnd: e.target.value });
  }

  nullState() {
    this.setState({ _id: '', listProduct: [], amount: '', date: '', person: '', type: '' });
  }

  nullDate() {
    this.setState({ dateHome: '', dateEnd: '' });
  }

  componentDidMount() {
    this.fetchMove();
  }

  modalMove(id) {
    fetch(`/api/move/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          listProduct: data.listProduct,
          amount: data.amount,
          date: data.date,
          person: data.person,
          type: data.type,
          _id: data._id
        });
      });
    this.handleShow();
  }

  filterMove(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.getValidationState() === 'success') {
      this.fetchMove();
    }
  }

  fetchMove() {
    if (this.state.dateEnd === '') {
      fetch(`/api/move`)
        .then(res => res.json())
        .then(data => {
          this.setState({ move: data });
          console.log(this.state.move);
        });
      fetch(`/api/move/type/Buy`)
        .then(res => res.json())
        .then(data => {
          this.setState({ moveBuy: data });
        });
      fetch(`/api/move/type/Sale`)
        .then(res => res.json())
        .then(data => {
          this.setState({ moveSale: data });
        });
    } else {
      const daH = new Date(this.state.dateHome);
      const daE = new Date(this.state.dateEnd);
      fetch(`/api/move/${daH}/${daE}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ move: data });
          console.log(this.state.move);
        });
      fetch(`/api/move/type/Buy/${daH}/${daE}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ moveBuy: data });
        });
      fetch(`/api/move/type/Sale/${daH}/${daE}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ moveSale: data });
        });
    }
  }

  getValidationState() {
    const home = this.state.dateHome;
    const end = this.state.dateEnd;
    if (home === '', end === '') return null;
    else if (home <= end) return 'success';
    else if (home > end) return 'error';
  }

  fechaCorta(date) {
    const fec = new Date(date);
    return `${fec.getFullYear()}-${fec.getMonth() +1}-${fec.getDate()}`
  }

  fecha(date) {
    //const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const meses = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
    const f = new Date(date);
    return (f.getDate() + " " + meses[f.getMonth()] + " " + f.getFullYear());
  }

  /* NO SE PUEDE OCUPAR PORQUE TARDA MUCHO EN DEVOLVER
  namePerson(id){
    fetch(`/api/person/${id}`)
      .then(res => res.json())
      .then(data => {
        return (data.firstname + " " + data.lastname);
      });
  }*/


  render() {
    return (
      <div>
        <div className="container" >
          <div className="section">

            <div>
              <Form inline>
                <FormGroup controlId="formDateHome" validationState={this.getValidationState()}>
                  <ControlLabel>Desde </ControlLabel>{' '}
                  <FormControl type="date" value={this.state.dateHome} onChange={(e) => this.dateHomeHandler(e)} required />
                </FormGroup>{' '}
                <FormGroup controlId="formDateEnd" validationState={this.getValidationState()}>
                  <ControlLabel>Hasta </ControlLabel>{' '}
                  <FormControl type="date" value={this.state.dateEnd} onChange={(e) => this.dateEndHandler(e)} required />
                  <FormControl.Feedback />
                </FormGroup>{' '}
                <Button type="submit" bsStyle="primary" onClick={this.filterMove}>Filtrar</Button>
              </Form>
            </div>

            <Tab.Container id="tabs-with" defaultActiveKey="first" style={{ marginTop: '10px' }}>
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="first">Todos</NavItem>
                    <NavItem eventKey="second">Ventas</NavItem>
                    <NavItem eventKey="third">Compras</NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <div className="row">
                        <div className="col s12">
                          <Table condensed hover responsive>
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Persona</th>
                                <th>Importe</th>
                                <th>Tipo</th>
                                <th>Productos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.move.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{this.fecha(prod.date)}</td>
                                      <td>{prod.person}</td>
                                      <td>$ {prod.amount}</td>
                                      <td><font color="#14B177">{prod.type}</font></td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.modalMove(prod._id)}>
                                          <i className="material-icons">pageview</i>
                                        </Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="row">
                        <div className="col s12">
                          <Table condensed hover responsive>
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Persona</th>
                                <th>Importe</th>
                                <th>Productos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.moveSale.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{this.fecha(prod.date)}</td>
                                      <td>{prod.person}</td>
                                      <td>$ {prod.amount}</td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editProduct(prod._id)}>
                                          <i className="material-icons">pageview</i>
                                        </Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div className="row">
                        <div className="col s12">
                          <Table condensed hover responsive>
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Persona</th>
                                <th>Importe</th>
                                <th>Productos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.moveBuy.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{this.fecha(prod.date)}</td>
                                      <td>{prod.person}</td>
                                      <td>$ {prod.amount}</td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editProduct(prod._id)}>
                                          <i className="material-icons">pageview</i>
                                        </Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Detalle del movimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><small>Persona: </small>{this.state.person}</p>
              <p><small>Fecha: </small>{this.fecha(this.state.date)}</p>
              <p><small>Tipo: </small>{this.state.type}</p>
              <p><small>Importe: </small>{this.state.amount}</p>

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
              <Button onClick={() => this.handleClose()}>Cerrar</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    );
  }
}

export default Move;