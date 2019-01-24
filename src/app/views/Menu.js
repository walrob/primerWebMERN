import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

// en el navbar probar -> fluid y sacar inverse
// color light-blue darken-4
// para Tab de productTable z-depth-3
export const Menu = () => (
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">App Kiosco</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/person">
            <NavItem>Personas</NavItem>
          </LinkContainer>
          <NavDropdown title="Producto" id="prod-nav-dropdown">
            <LinkContainer to="/product">
              <MenuItem>Nuevo</MenuItem>
            </LinkContainer>
            <LinkContainer to="/productTable">
              <MenuItem>Tabla</MenuItem>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title="Promoción" id="prom-nav-dropdown">
            <LinkContainer to="/promotion">
              <MenuItem>Nuevo</MenuItem>
            </LinkContainer>
            <LinkContainer to="/promotionTable">
              <MenuItem>Tabla</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>

        <Nav pullRight>
          <LinkContainer to="/buy">
            <NavItem>Compras</NavItem>
          </LinkContainer>
          <LinkContainer to="/sale">
            <NavItem>Ventas</NavItem>
          </LinkContainer>
          <LinkContainer to="/move">
            <NavItem>Movimientos</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);