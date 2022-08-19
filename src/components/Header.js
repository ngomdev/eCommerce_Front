import logo from "../assets/logo.png";
import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {
    Navbar, Nav, Container, NavDropdown, Row, Col,
    NavItem, NavLink, Form, Button, Dropdown,
} from 'react-bootstrap';


const Header = () => {
    return (
        <header className="header">
            <div className="container-header">

                <marquee behavior="scroll" direction="left" width="100%" bgcolor="#6883bc">
                    <h4 style={{ color: 'white' }}>Bienvenue sur le meilleur site e-commerce friend's Business services </h4>
                </marquee>



            </div>
            <div className='navbare'>
                <Navbar bg="white" variant='white' expand="lg" collapseOnSelect>

                    <Container className='navbar-container'>
                        <LinkContainer to="/">
                            <Navbar.Brand><img src={logo} alt="" className='fbs-logo' /></Navbar.Brand>
                        </LinkContainer>
                        <Form className="d-flex form">
                            <Form.Control
                                type="search"
                                placeholder="Rechercher un produit..."
                                className="me-2 input-seach"
                                aria-label="Search"
                            />
                            <Button className='btn-seach' variant="outline-info"><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </Form>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto nav" >
                                <LinkContainer to="/vendre" style={{ color: 'black' }}>
                                    <Nav.Link><buttton className='btn' style={{
                                        border: 'none',
                                        borderradius: '10%',
                                        background: '#6883bc',
                                        color: 'white',
                                        outline: 'none',
                                        borderRadius: '30px ',

                                        marginLeft: '20px',


                                    }}>Vendre</buttton> </Nav.Link>
                                </LinkContainer>
                                <Dropdown>
                                    <Dropdown.Toggle style={{
                                        border: 'none',
                                        borderradius: '10%',
                                        background: '#8a307f',
                                        color: 'white',
                                        outline: 'none',
                                        borderRadius: '30px ',
                                        padding: '10px',
                                        marginLeft: '20px'


                                    }} variant="success" id="dropdown-basic">
                                        catégories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ outline: 'none' }}>
                                        <Dropdown.Item href="#/action-1">Electronique</Dropdown.Item>
                                        <Dropdown.Item href="#/action-1">Chaussures</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Chemises</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Montre</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>





                                <LinkContainer to="/login" style={{ color: 'black', marginLeft: '20px' }}>
                                    <Nav.Link style={{ color: 'black' }}><i className="fas fa-user login"></i> Se connecter</Nav.Link>
                                </LinkContainer>
                                <LinkContainer style={{ color: 'black' }} to="/cart">
                                    <Nav.Link >Mon Panier <i className="fas fa-shopping-cart cart"></i></Nav.Link>
                                </LinkContainer>


                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>





        </header >
    );
};

export default Header;