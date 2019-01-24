import React, { Component } from 'react';
import { Table, Row, Col, Button, Form, FormGroup, ControlLabel, FormControl, Panel } from "react-bootstrap";

class Sale extends Component {
  constructor() {
    super();
    this.state = {
      listProduct: [],
      amount: '',
      person: '',
      type: 'Sale',
      //poner como predeterminado uno 'NN'
      namePerson: '',
      _id: '',
      quantityProduct: '',
      codeProduct: '',
      _idProduct: '',
      nameProduct: ''
    };

    this.addMove = this.addMove.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }


  nameProductHandler(e) {
    this.setState({ nameProduct: e.target.value });
  }

  quantityProductHandler(e) {
    this.setState({ quantityProduct: e.target.value });
  }

  personHandler(e) {
    this.setState({ person: e.target.value });
  }

  codeProductHandler(e) {
    this.setState({ codeProduct: e.target.value });
  }

  addMove(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    fetch('/api/move', {
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
        //window.M.toast({ html: 'Promotion Cargado', classes: 'rounded' });
        this.setState({ _id: data._id });
      })
      .catch(err => console.error(err));
  }

  addProduct(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.state._id === '') {
      alert('Primero debe cargar el Proveedor')
    }
    if (this.state._idProduct) {
      fetch(`/api/oneMove/${this.state._idProduct}`, {
        method: 'PUT',
        body: JSON.stringify({
          //aca va el id del product
          product: this.state.nameProduct,
          name: this.state.nameProduct,
          quantity: this.state.quantityProduct,
          //tiene que ir un calculo
          amount: this.state.amount,
          father: this.state._id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          //window.M.toast({ html: 'Producto Editado', classes: 'rounded' });
          this.nullStateProduct();
          this.fetchProduct();
        });
    } else {
      fetch('/api/oneMove', {
        method: 'POST',
        body: JSON.stringify({
          //aca va el id del product
          product: this.state.nameProduct,
          name: this.state.nameProduct,
          quantity: this.state.quantityProduct,
          amount: this.state.codeProduct,
          father: this.state._id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Product Cargado', classes: 'rounded' });
          this.nullStateProduct();
          this.fetchProduct();
        })
        .catch(err => console.error(err));
    }
  }

  deleteSale(id) {
    if (confirm('¿Seguro que desea cancelar la Venta?')) {
      fetch(`/api/move/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //window.M.toast({ html: 'Move Eliminado', classes: 'rounded' });
          this.nullState();
        });
    }
  }

  deleteProduct(id) {
    if (confirm('¿Seguro que desea eliminar?')) {
      fetch(`/api/oneMove/${id}`, {
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

  editProduct(id) {
    fetch(`/api/oneMove/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          nameProduct: data.name,
          quantityProduct: data.quantity,
          _idProduct: data._id,
          codeProduct: data.amount
        });
      });
  }

  nullState() {
    this.setState({ _id: '', person: '', namePerson: '', listProduct: [], amount: '' });
    this.nullStateProduct();
  }

  nullStateProduct() {
    this.setState({ nameProduct: '', codeProduct: '', quantityProduct: '', _idProduct: '' });
  }

  about() {
    if (this.state._id) {
      this.deleteSale(this.state._id);
    } else {
      this.nullState();
    }
  }

  componentDidMount() {
    //this.fetchProduct();
  }

  fetchProduct() {
    fetch(`/api/oneMove/father/${this.state._id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ listProduct: data });
        console.log(this.state.listProduct);
      });
  }


  render() {
    return (
      <div>
        <div className="container" id="table-buy" >
          <div className="section">
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Nueva Venta</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form inline>
                  <FormGroup controlId="formName">
                    <ControlLabel>Cliente</ControlLabel>{' '}
                    <FormControl type="text" value={this.state.person} onChange={(e) => this.personHandler(e)} required />
                  </FormGroup>{' '}

                  <FormGroup controlId="formAmount">
                    <ControlLabel>Total</ControlLabel>{' '}
                    <FormControl type="number" value={this.state.amount} disabled />
                  </FormGroup>{' '}
                  <Button type="submit" bsStyle="primary" onClick={this.addMove}>Cargar</Button>
                </Form>
                <Col sm={12}>
                  <Button type="submit" bsStyle="primary" onClick={() => this.nullState()} style={{ float: 'right' }}>Guardar</Button>
                  <Button onClick={() => this.about()} style={{ float: 'right', marginRight: '4px' }}>Cancelar</Button>
                </Col>
              </Panel.Body>

            </Panel>

            <Panel bsStyle="info">
              <Panel.Heading>
                <Panel.Title componentClass="h6">Producto</Panel.Title>
              </Panel.Heading>
              <Panel.Body>

                <Form inline>
                  <FormGroup controlId="formProduct">
                    <ControlLabel>Producto</ControlLabel>{' '}
                    <FormControl type="text" value={this.state.nameProduct} onChange={(e) => this.nameProductHandler(e)} required />
                  </FormGroup>{' '}

<FormGroup controlId="formPrice">
                    <ControlLabel>Código</ControlLabel>{' '}
                    <FormControl type="text" value={this.state.codeProduct} onChange={(e) => this.codeProductHandler(e)} required />
                  </FormGroup>{' '}

                  <FormGroup controlId="formQuantity">
                    <ControlLabel>Cantidad</ControlLabel>{' '}
                    <FormControl type="number" min="0" value={this.state.quantityProduct} onChange={(e) => this.quantityProductHandler(e)} required />
                  </FormGroup>{' '}
                  <Button type="submit" onClick={this.addProduct}>Agregar</Button>
                </Form>
              </Panel.Body>
            </Panel>
          </div>
          <div className="row">
            <Col sm={12} smHidden>
              <h4>Lista de los productos agregados:</h4>
              <Table condensed responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
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
            </Col>
          </div>
        </div>
      </div>
    );
  }
}


export default Sale;