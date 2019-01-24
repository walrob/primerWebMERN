import React, { Component } from 'react';
import { Nav, NavItem, Table, Tab, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class ProductTable extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      make: '',
      code: '',
      stock: '',
      price: '',
      _id: '',
      product: [],
      productEnabled: [],
      productDisabled: [],
      show: false,
      search: '',
      searchResult: [],
    };

    //this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  searchHandler(e) {
    this.setState({ search: e.target.value });
  }

  nameHandler(e) {
    this.setState({ name: e.target.value });
  }

  makeHandler(e) {
    this.setState({ make: e.target.value });
  }

  codeHandler(e) {
    this.setState({ code: e.target.value });
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

  /*
    ESTÁ MODIFICADO SOLO PARA EDITAR PRODUCTOS, NO CARGAR NUEVOS
  */
  addProduct(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    fetch(`/api/product/${this.state._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        make: this.state.make,
        code: this.state.code,
        stock: this.state.stock,
        price: this.state.price
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        //window.M.toast({ html: 'Producto Editado', classes: 'rounded' });
        this.setState({ _id: '', name: '', make: '', code: '', stock: '', price: '', show: false });
        this.fetchProduct();
      });
  }

  deleteProduct(id) {
    if (confirm('¿Seguro que desea eliminar?')) {
      fetch(`/api/product/${id}/${false}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Producto Eliminado', classes: 'rounded' });
          this.fetchProduct();
        });
    }
  }

  enterProduct(id) {
    if (confirm('¿Seguro que desea agregar el producto?')) {
      fetch(`/api/product/${id}/${true}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Producto Agregado', classes: 'rounded' });
          this.fetchProduct();
        });
    }
  }

  editProduct(id) {
    fetch(`/api/product/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          name: data.name,
          make: data.make,
          code: data.code,
          stock: data.stock,
          price: data.price,
          _id: data._id
        });
      });
    this.handleShow();
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    fetch(`/api/product`)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
        console.log(this.state.product);
      });
    fetch(`/api/product/enabled/true`)
      .then(res => res.json())
      .then(data => {
        this.setState({ productEnabled: data });
        console.log(this.state.productEnabled);
      });
    fetch(`/api/product/enabled/false`)
      .then(res => res.json())
      .then(data => {
        this.setState({ productDisabled: data });
        console.log(this.state.productDisabled);
      });
  }

  showResults() {
    console.log(this.state.search);
    fetch(`/api/product/search/${this.state.search}`)
      .then(res => res.json())
      .then(data => {
        /*
        this.setState({ searchResult: data });
        console.log(this.state.searchResult);
        */
        this.setState({ product: data });
        console.log(this.state.product);
      });
    fetch(`/api/product/search/${this.state.search}/true`)
      .then(res => res.json())
      .then(data => {
        this.setState({ productEnabled: data });
        console.log(this.state.productEnabled);
      });
    fetch(`/api/product/search/${this.state.search}/false`)
      .then(res => res.json())
      .then(data => {
        this.setState({ productDisabled: data });
        console.log(this.state.productDisabled);
      });
  }

  render() {
    return (
      <div>
        <div className="container" id="table-product" >
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
                      <div className="row">
                        <div className="col s12">
                          <Table condensed hover responsive>
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Código</th>
                                <th>Stock</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.product.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{prod.name}</td>
                                      <td>{prod.make}</td>
                                      <td>{prod.code}</td>
                                      <td>{prod.stock}</td>
                                      <td>$ {prod.price}</td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editProduct(prod._id)}>
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
                                <th>Marca</th>
                                <th>Código</th>
                                <th>Stock</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.productEnabled.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{prod.name}</td>
                                      <td>{prod.make}</td>
                                      <td>{prod.code}</td>
                                      <td>{prod.stock}</td>
                                      <td>$ {prod.price}</td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editProduct(prod._id)} style={{ margin: '4px' }}>
                                          <i className="material-icons">edit</i>
                                        </Button>
                                        <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.deleteProduct(prod._id)}>
                                          <i className="material-icons">delete</i>
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
                                <th>Marca</th>
                                <th>Código</th>
                                <th>Stock</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.productDisabled.map(prod => {
                                  return (
                                    <tr key={prod._id}>
                                      <td>{prod.name}</td>
                                      <td>{prod.make}</td>
                                      <td>{prod.code}</td>
                                      <td>{prod.stock}</td>
                                      <td>$ {prod.price}</td>
                                      <td>
                                        <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.editProduct(prod._id)} style={{ margin: '4px' }}>
                                          <i className="material-icons">edit</i>
                                        </Button>
                                        <Button bsStyle="success" bsSize="xsmall" onClick={() => this.enterProduct(prod._id)}>
                                          <i className="material-icons">add</i>
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
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form horizontal>
                <FormGroup controlId="formName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Nombre
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" required value={this.state.name} onChange={(e) => this.nameHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formMake">
                  <Col componentClass={ControlLabel} sm={2}>
                    Marca
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" required value={this.state.make} onChange={(e) => this.makeHandler(e)} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formCode">
                  <Col componentClass={ControlLabel} sm={2}>
                    Código
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" required value={this.state.code} onChange={(e) => this.codeHandler(e)} />
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
              <Button bsStyle="primary" onClick={this.addProduct}>Guardar</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ProductTable;