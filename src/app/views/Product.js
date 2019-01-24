import React, { Component } from 'react';
import { Table, Row, Col, Button, Form, FormGroup, ControlLabel, FormControl, Panel } from "react-bootstrap";

class Product extends Component {
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
      productDisabled: []
    };

    //this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
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

  getValidationState() {
    /*const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
    */
  }

  addProduct(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.state._id) {
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
          this.setState({ _id: '', name: '', make: '', code: '', stock: '', price: '' });
          this.fetchProduct();
        });
    } else {
      fetch('/api/product', {
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
          //window.M.toast({ html: 'Producto Cargado', classes: 'rounded' });
          this.setState({ name: '', make: '', code: '', stock: '', price: '' });
          this.fetchProduct();
        })
        .catch(err => console.error(err));
    }
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
  }

  nullState() {
    this.setState({ _id: '', name: '', make: '', code: '', stock: '', price: '' });
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
  }


  render() {
    return (
      <div>
        <div className="container" id="table-product" >
          <div className="section">
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Nuevo Producto</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal onSubmit={this.addProduct}>
                  <FormGroup controlId="formName" validationState={this.getValidationState()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Nombre
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" value={this.state.name} onChange={(e) => this.nameHandler(e)} required/>
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
                      <FormControl type="number" min="0" value={this.state.stock} onChange={(e) => this.stockHandler(e)} />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formPrice">
                    <Col componentClass={ControlLabel} sm={2}>
                      Precio
                  </Col>
                    <Col sm={10}>
                      <FormControl type="number" min="0" step=".01" value={this.state.price} onChange={(e) => this.priceHandler(e)} />
                    </Col>
                  </FormGroup>
                </Form>
                <Col sm={12}>
                  <Button type="submit" bsStyle="primary" onClick={this.addProduct} style={{ float: 'right' }}>Guardar</Button>
                  <Button onClick={() => this.nullState()} style={{ float: 'right', marginRight: '4px'}}>Cancelar</Button>
                </Col>
              </Panel.Body>
            </Panel>
          </div>
          <div className="row">
            <Col sm={12} smHidden>
              <h4>Lista de todos los productos:</h4>
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
            </Col>
          </div>
        </div>
      </div>
    );
  }
}


export default Product;