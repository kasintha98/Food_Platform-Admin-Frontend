import React from "react";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import Footer from "../Footer";
import { useSelector } from "react-redux";

function Layout(props) {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Header></Header>
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    <i class="fa fa-home"></i>
                    &nbsp; Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>
                    <i class="fa fa-info-circle"></i>
                    &nbsp; Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/restaurants"}>
                    <i class="fa fa-coffee"></i>
                    &nbsp; Restaurants
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>
                    <i class="fa fa-cutlery"></i>
                    &nbsp; Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/delivery-charges"}>
                    <i class="fa fa-motorcycle"></i>
                    &nbsp; Delivery Charges
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to={"/employee"}>
                    <i class="fa fa-user"></i>
                    &nbsp; Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to={"/order-auto"}>
                    <i class="fa fa-sort"></i>
                    &nbsp; Order Automation
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to={"/user-entitle"}>
                    <i class="fa fa-address-card"></i>
                    &nbsp; User Entitlement
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/reports"}>
                    <i class="fa fa-pie-chart"></i>
                    &nbsp; Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/inventory"}>
                    <i class="fa fa-suitcase"></i>
                    &nbsp; Inventory Mgmt
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/customer"}>
                    <i class="fa fa-child"></i>
                    &nbsp; Customer
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/kds"}>
                    <i class="fa fa-clone"></i>
                    &nbsp; KDS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/delivery-boy"}>
                    <i class=" 	fa fa-flash"></i>
                    &nbsp; Delivery Boy
                  </NavLink>
                </li>
                {/* {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink exact to={"/employee"}>
                      <i class="fa fa-user"></i>
                      &nbsp; Employee Users
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/categories"}>
                      <i class="fa fa-cubes"></i>
                      &nbsp; Categories
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/products"}>
                      <i class="fa fa-cutlery"></i>
                      &nbsp; Products
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <NavLink to={"/orders"}>
                    <i class="fa fa-motorcycle"></i>
                    &nbsp; Orders
                  </NavLink>
                </li>
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/reports"}>
                      <i class="fa fa-pie-chart"></i>
                      &nbsp; Reports
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role !== "deliveryrider" ? (
                  <li>
                    <NavLink to={"/inventory"}>
                      <i class="fa fa-suitcase"></i>
                      &nbsp; Inventory
                    </NavLink>
                  </li>
                ) : null}
                {auth.user.role === "admin" || auth.user.role === "manager" ? (
                  <li>
                    <NavLink to={"/purchases"}>
                      <i class="fa fa-money"></i>
                      &nbsp; Purchases
                    </NavLink>
                  </li>
                ) : null} */}
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", padding: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
