import React, { Component } from 'react';
import { Nav, NavItem, Table, Tab, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class TablePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion = props.promotion,
      button = props.button
    };

  }

  render() {
    return (
      <div>
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
                    <td>{this.state.button}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TablePromotion;