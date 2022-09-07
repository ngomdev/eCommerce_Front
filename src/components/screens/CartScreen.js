import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../Message'
import { addToCart, removeFromCart } from '../../actions/cartAction'
import AlertDismissible from '../Message';

const CartScreen = () => {
    let params = useParams();
    let navigate = useNavigate();
    const productId = params.id
    const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))


    }

    const checkOutHandler = () => {
        navigate(`/login?redirect=shippingCart`, { replace: true })

    }


    return (
        <Row>
            <Col md={8}>
                <h1>Mon Panier</h1>

                {cartItems && cartItems.length === 0 ? (
                    <Message>Votre Panier est vide</Message>



                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />

                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>

                                    </Col>
                                    <Col md={2}>{item.price} FCFA</Col>
                                    <Col md={2}>

                                        <Form.Control as='select' value={item.qty}
                                            onChange={
                                                (e) => dispatch(addToCart(item.product,
                                                    Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}

                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button className='btn btn-outline-danger' type='button' variant='light'
                                            onClick={() =>
                                                removeFromCartHandler(item.product)}>
                                            <i className="fa-solid fa-trash-can"></i>


                                        </Button>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}

                    </ListGroup>

                )

                }

            </Col>

            <Col md={4}>

                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Total : {cartItems.reduce((acc, item) =>
                                acc + item.qty, 0)} produits

                            </h3>
                            <h4 className='pricebg'>
                                Prix :  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0
                                )} FCFA
                            </h4>
                        </ListGroup.Item>

                        <ListGroupItem>
                            <Button
                                onClick={checkOutHandler}


                                style={{
                                    background: '#0097fe',
                                    color: 'white',
                                    width: '100%'

                                }} className='btn btn-block' type='button' disabled={
                                    cartItems.length === 0}>

                                passer à la caisse


                            </Button>

                        </ListGroupItem>

                    </ListGroup>
                </Card>

            </Col>



        </Row >
    );
};

export default CartScreen;