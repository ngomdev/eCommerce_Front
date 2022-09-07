import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import logo from '../../src/assets/logo.png'

const Footer = () => {
    return (
        <div className="footer-dark">
            <footer>
                <Container>
                    <Row>
                        <Col className="item" md={3} sm={6}>
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#">Web design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">Business</a></li>
                            </ul>
                        </Col>
                        <Col className="item" md={3} sm={6}>
                            <h3>A Propos</h3>
                            <ul>
                                <li><a href="#">Qui sommes nous</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </Col>
                        <Col className=" item text" md={6}>
                            <img src={logo} alt="" />
                            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                        </Col>
                        <div className="col item social"><a href="#"><i className="fa-brands fa-facebook"></i></a><a href="#"><i className="fa-brands fa-twitter"></i></a><a href="#"><i className="fa-brands fa-instagram"></i></a><a href="#"><i className="fa-brands fa-linkedin"></i></a></div>
                    </Row>
                    <p className="copyright">Friend's Business Services © 2022</p>
                </Container>
            </footer>
            <a className='gotop-btn' href='#'><i className="fa-solid fa-arrow-up"></i></a>
        </div>

    );
};

export default Footer;