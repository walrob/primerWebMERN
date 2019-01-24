import React, { Component } from 'react';
import { Col, Table, Button, Form, FormGroup, ControlLabel, FormControl, Panel } from "react-bootstrap";

class Promotion extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      listProduct: [],
      price: '',
      dateHome: '',
      dateEnd: '',
      stock: '',
      _id: '',
      nameProduct: '',
      codeProduct: '',
      quantityProduct: '',
      _idProduct: '',
      searchResult: []
    };

    this.addPromotion = this.addPromotion.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }


  nameHandler(e) {
    this.setState({ name: e.target.value });
  }

  stockHandler(e) {
    this.setState({ stock: e.target.value });
  }

  priceHandler(e) {
    this.setState({ price: e.target.value });
  }

  dateHomeHandler(e) {
    this.setState({ dateHome: e.target.value });
  }

  dateEndHandler(e) {
    this.setState({ dateEnd: e.target.value });
  }

  nameProductHandler(e) {
    this.setState({ nameProduct: e.target.value });
  }

  codeProductHandler(e) {
    this.setState({ codeProduct: e.target.value });
  }

  quantityProductHandler(e) {
    this.setState({ quantityProduct: e.target.value });
  }


  addPromotion(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.state._id) {
    /*  fetch(`/api/promotion/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.state.name,
          listProduct: this.state.listProduct,
          price: this.state.price,
          dateHome: this.state.dateHome,
          dateEnd: this.state.dateEnd,
          stock: this.state.stock
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
          this.nullStateProduct();
          this.fetchProduct();
        });*/
    } else {
      fetch('/api/promotion', {
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
  }

  addProduct(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    if (this.state._id === '') {
      alert('Primero debe cargar datos de la Promoción')
    }

    if (this.state._idProduct) {
      fetch(`/api/oneMove/${this.state._idProduct}`, {
        method: 'PUT',
        body: JSON.stringify({
          product: this.state.codeProduct,
          name: this.state.nameProduct,
          quantity: this.state.quantityProduct,
          amount: this.state.price,
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
          product: this.state.codeProduct,
          name: this.state.nameProduct,
          quantity: this.state.quantityProduct,
          amount: this.state.price,
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
          _idProduct: data._id
          //amountProduct: data.amount
        });
      });
  }

  nullState() {
    this.setState({ _id: '', name: '', listProduct: [], stock: '', price: '', dateHome: '', dateEnd: '' });
    this.nullStateProduct();
  }

  nullStateProduct() {
    this.setState({ nameProduct: '', codeProduct: '', quantityProduct: '', _idProduct: '' });
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

  getValidationState() {
    const home = this.state.dateHome;
    const end = this.state.dateEnd;
    if (home === '', end === '') return null;
    else if (home <= end) return 'success';
    else if (home > end) return 'error';
  }

  showResuls() {
    console.log(this.state.nameProduct);
    fetch(`/api/product/search/${this.state.nameProduct}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchResult: data });
        console.log(this.state.searchResult);
      });
  }

  render() {
    return (
      <div>
        <div className="container" id="table-promotion" >
          <div className="section">
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Nueva Promoción</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Form horizontal onSubmit={this.addPromotion}>
                  <FormGroup controlId="formName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Nombre
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" value={this.state.name} onChange={(e) => this.nameHandler(e)} required />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formName" validationState={this.getValidationState()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Fecha desde
                    </Col>
                    <Col sm={10}>
                      <FormControl type="date" value={this.state.dateHome} onChange={(e) => this.dateHomeHandler(e)} />
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formName" validationState={this.getValidationState()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Fecha hasta
                    </Col>
                    <Col sm={10}>
                      <FormControl type="date" value={this.state.dateEnd} onChange={(e) => this.dateEndHandler(e)} required />
                      <FormControl.Feedback />
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
                  <Button type="submit" bsStyle="primary" onClick={this.addPromotion} style={{ float: 'right' }}>Cargar</Button>
                  <Button onClick={() => this.nullState()} style={{ float: 'right', marginRight: '4px' }}>Cancelar</Button>
                </Col>

              </Panel.Body>
            </Panel>

            <Panel bsStyle="info">
              <Panel.Heading>
                <Panel.Title componentClass="h6">Producto</Panel.Title>
              </Panel.Heading>
              <Panel.Body>

                <Form inline>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>Nombre</ControlLabel>{' '}
                    <FormControl type="text" value={this.state.nameProduct} onChange={(e) => this.nameProductHandler(e)} onKeyUp={() => this.showResuls()} />
                  </FormGroup>{' '}

                  <FormGroup controlId="formInlineCode">
                    <ControlLabel>Código</ControlLabel>{' '}
                    <FormControl type="text" value={this.state.codeProduct} onChange={(e) => this.codeProductHandler(e)} />
                  </FormGroup>{' '}

                  <FormGroup controlId="formInlineCant">
                    <ControlLabel>Cantidad</ControlLabel>{' '}
                    <FormControl type="number" min="0" value={this.state.quantityProduct} onChange={(e) => this.quantityProductHandler(e)} />
                  </FormGroup>{' '}

                  <Button type="submit" onClick={this.addProduct}>Agregar</Button>
                </Form>
              </Panel.Body>
            </Panel>
            <div className="row">
            <Col sm={12} smHidden>
              <h4>Lista de los productos en la Promoción:</h4>
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
      </div>
    );
  }
}


export default Promotion;