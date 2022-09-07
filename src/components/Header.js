import logo from "../assets/logo.png";
import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {
    Navbar, Nav, Container, NavDropdown, Row, Col,
    NavItem, NavLink, Form, Button, Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/userAction";


const Header = () => {



    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <header className="header">
            <div className="container-header">

                <marquee behavior="scroll" direction="left" width="100%" bgcolor="#ff9801">
                    <h4 style={{ color: 'white' }}>Bienvenue à colobaan, achetez et vendre en toute simplicité  </h4>
                </marquee>



            </div>
            <div className='navbare'>
                <Navbar bg="white" variant='white' expand="lg" collapseOnSelect>

                    <Container className='navbar-container'>
                        <LinkContainer to="/">
                            <Navbar.Brand><img src={logo} alt="" className='fbs-logo' /></Navbar.Brand>
                        </LinkContainer>
                        <Dropdown style={{ marginLeft: '100px' }}>
                            <Dropdown.Toggle style={{

                                background: 'white',
                                color: 'black',


                                fontSize: '18px'


                            }} id="dropdown-basic">
                                catégories
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ outline: 'none' }}>
                                <Dropdown.Item href="#/action-1"><i className="fas fa-phone"></i>Electronique</Dropdown.Item>
                                <Dropdown.Item href="#/action-1"><i className="fa-solid fa-shoe-prints"></i>Chaussures</Dropdown.Item>
                                <Dropdown.Item href="#/action-2"><i className="fa-solid fa-shirt"></i>Chemises</Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><i className="fa-solid fa-watch"></i>Montre</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>


                        <Form className="d-flex form">
                            <Form.Control
                                type="search"
                                placeholder="Rechercher un produit..."
                                className="me-2 input-seach"
                                aria-label="Search"

                            />
                            <Button className='btn-seach' variant="outline-primary"><i className="fa-solid fa-magnifying-glass"></i></Button>
                        </Form>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto nav" >
                                <LinkContainer to="/vendre" style={{ color: 'black' }}>
                                    <Nav.Link><button className='btn' style={{

                                        borderRadius: '6px',
                                        background: '#ff9801',
                                        color: 'white',
                                        outline: 'none',
                                        margnRight: '30px',
                                        fontSize: '18px'


                                    }}>Vendre</button>
                                    </Nav.Link>
                                </LinkContainer>



                                {userLogin.userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username' >
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><i className="fas fa-user "></i> Mon compte</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket"></i>Déconnexion</NavDropdown.Item>

                                    </NavDropdown>

                                ) :

                                    <LinkContainer to="/login" style={{ color: 'black', marginLeft: '20px', fontSize: '18px' }}>
                                        <Nav.Link style={{ color: 'black' }}><i className="fas fa-user login"></i> Se connecter</Nav.Link>
                                    </LinkContainer>
                                }

                                {
                                    userInfo && userInfo.isAdmin && (
                                        <NavDropdown title='Admin' id='adminmenu' >
                                            <LinkContainer to='/admin/userlist'>
                                                <NavDropdown.Item><i className="fas fa-user "></i>Utilisateurs</NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to='admin/productlist'>
                                                <NavDropdown.Item><i className="fa-brands fa-product-hunt"></i>Produits</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='admin/orderlist'>
                                                <NavDropdown.Item><i className="fa-solid fa-sort"></i>Commandes</NavDropdown.Item>
                                            </LinkContainer>



                                        </NavDropdown>

                                    )
                                }



                                <LinkContainer style={{ color: 'black', position: 'relative', fontSize: '18px' }} to="/cart">
                                    <Nav.Link > Panier
                                        <i className="fas fa-shopping-cart cart">
                                            <div className="panierTop">0</div>
                                        </i>

                                    </Nav.Link>
                                </LinkContainer>


                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div>

            </div>



        </header >
    );
};

export default Header;