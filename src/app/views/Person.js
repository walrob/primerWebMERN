import React, { Component } from 'react';
import { Nav, NavItem, Table, Tab, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl, Glyphicon } from "react-bootstrap";

class Person extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      dni: '',
      address: '',
      phone: '',
      type: '',
      _id: '',
      person: [],
      personCli: [],
      personPro: [],
      show: false,
      nameShow: ''
    };

    this.addPerson = this.addPerson.bind(this);
  }

  firstnameHandler(e) {
    this.setState({ firstname: e.target.value });
  }

  lastnameHandler(e) {
    this.setState({ lastname: e.target.value });
  }

  dniHandler(e) {
    this.setState({ dni: e.target.value });
  }

  addressHandler(e) {
    this.setState({ address: e.target.value });
  }

  phoneHandler(e) {
    this.setState({ phone: e.target.value });
  }

  typeHandler(e) {
    this.setState({ type: e.target.value });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  addPerson(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.state._id) {
      fetch(`/api/person/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          address: this.state.address,
          phone: this.state.phone,
          dni: this.state.dni,
          type: this.state.type
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          //window.M.toast({ html: 'Persona Editada', classes: 'rounded' });
          this.setState({ _id: '', lastname: '', firstname: '', dni: '', address: '', phone: '', type: '', show: false });
          this.fetchPerson();
        });
    } else {
      fetch('/api/person', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Persona Cargada', classes: 'rounded' });
          this.setState({ lastname: '', firstname: '', dni: '', address: '', phone: '', type: '', show: false });
          this.fetchPerson();
        })
        .catch(err => console.error(err));
    }
  }

  deletePerson(id) {
    if (confirm('¿Seguro que desea eliminar?')) {
      fetch(`/api/person/${id}/${false}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Persona Eliminada', classes: 'rounded' });
          this.fetchPerson();
        });
    }
  }

  editPerson(id) {
    fetch(`/api/person/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          firstname: data.firstname,
          lastname: data.lastname,
          dni: data.dni,
          address: data.address,
          phone: data.phone,
          type: data.type,
          _id: data._id
        });
      });
    this.setState({ nameShow: 'Editar Persona' });
    this.handleShow();
  }

  modalAddPerson(){
    this.setState({ _id: '', lastname: '', firstname: '', dni: '', address: '', phone: '', type: '', nameShow: 'Agregar Persona' });
    this.handleShow();
  }

  componentDidMount() {
    this.fetchPerson();
  }

  fetchPerson() {
    fetch(`/api/person`)
      .then(res => res.json())
      .then(data => {
        this.setState({ person: data });
        console.log(this.state.person);
      });
    fetch(`/api/person/type/Client`)
      .then(res => res.json())
      .then(data => {
        this.setState({ personCli: data });
      });
    fetch(`/api/person/type/Provider`)
      .then(res => res.json())
      .then(data => {
        this.setState({ personPro: data });
      });
  }


  render() {
    return (
      <div>
        <div className="container" id="table-product" >
          <div className="section">
            <Row>
              <Button style={{ float: 'right' }} bsStyle="success"  onClick={() => this.modalAddPerson()}><Glyphicon glyph="plus"/> Persona</Button>
            </Row>
            <div>
              <Tab.Container id="tabs-with" defaultActiveKey="first">
                <Row className="clearfix">
                  <Col sm={12}>
                    <Nav bsStyle="tabs">
                      <NavItem eventKey="first">Todos</NavItem>
                      <NavItem eventKey="second">Clientes</NavItem>
                      <NavItem eventKey="third">Proveedores</NavItem>
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
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                                  <th>DNI/CUIT</th>
                                  <th>Dirección</th>
                                  <th>Teléfono</th>
                                  <th>Tipo</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  this.state.person.map(pers => {
                                    return (
                                      <tr key={pers._id}>
                                        <td>{pers.firstname}</td>
                                        <td>{pers.lastname}</td>
                                        <td>{pers.dni}</td>
                                        <td>{pers.address}</td>
                                        <td>{pers.phone}</td>
                                        <td><font color="#14B177">{pers.type}</font></td>
                                        <td>
                                          <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editPerson(pers._id)}>
                                            <i className="material-icons">edit</i>
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
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                                  <th>DNI/CUIT</th>
                                  <th>Dirección</th>
                                  <th>Teléfono</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  this.state.personCli.map(pers => {
                                    return (
                                      <tr key={pers._id}>
                                        <td>{pers.firstname}</td>
                                        <td>{pers.lastname}</td>
                                        <td>{pers.dni}</td>
                                        <td>{pers.address}</td>
                                        <td>{pers.phone}</td>
                                        <td>
                                          <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editPerson(pers._id)}>
                                            <i className="material-icons">edit</i>
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
                                  <th>Nombre</th>
                                  <th>Apellido</th>
                                  <th>DNI/CUIT</th>
                                  <th>Dirección</th>
                                  <th>Teléfono</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  this.state.personPro.map(pers => {
                                    return (
                                      <tr key={pers._id}>
                                        <td>{pers.firstname}</td>
                                        <td>{pers.lastname}</td>
                                        <td>{pers.dni}</td>
                                        <td>{pers.address}</td>
                                        <td>{pers.phone}</td>
                                        <td>
                                          <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editPerson(pers._id)}>
                                            <i className="material-icons">edit</i>
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
          </div>

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.nameShow}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form horizontal>
                <FormGroup controlId="formFirstName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Nombre
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" value={this.state.firstname} onChange={(e) => this.firstnameHandler(e)} required />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formLastName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Apellido
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" value={this.state.lastname} onChange={(e) => this.lastnameHandler(e)} required />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formDni">
                  <Col componentClass={ControlLabel} sm={2}>
                    DNI/CUIT
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" value={this.state.dni} onChange={(e) => this.dniHandler(e)} required />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formAddress">
                  <Col componentClass={ControlLabel} sm={2}>
                    Dirección
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" value={this.state.address} onChange={(e) => this.addressHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formPhone">
                  <Col componentClass={ControlLabel} sm={2}>
                    Teléfono
                  </Col>
                  <Col sm={10}>
                    <FormControl type="number" value={this.state.phone} onChange={(e) => this.phoneHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formType">
                  <Col componentClass={ControlLabel} sm={2}>
                    Tipo
                  </Col>
                  <Col sm={10}>
                    <FormControl componentClass="select" value={this.state.type} onChange={(e) => this.typeHandler(e)}>
                      <option value="Client">Cliente</option>
                      <option value="Provider">Proveedor</option>
                    </FormControl>
                  </Col>
                </FormGroup>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.handleClose()}>Cerrar</Button>
              <Button bsStyle="primary" onClick={this.addPerson}>Guardar</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    );
  }
}

export default Person;