import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message'
import CheckoutSteps from '../../components/CheckoutSteps'
import { Link } from 'react-router-dom';
import { creatOrder } from '../../actions/orderAction';
const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            // navigate(`/order/${order._id}`, { replace: true })
        }

    }, [navigate, success])

    const placeOrderHandler = () => {
        dispatch(creatOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.PaymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice


        }))
        navigate(`/order/${order._id}`, { replace: true })
    }
    // Calculate PRICES
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))



    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>EXPEDITION</h3>
                            <p>
                                <strong>ADRESSE : </strong>
                                {cart.shippingAddress.adress} , {cart.shippingAddress.city}{''} ,
                                {cart.shippingAddress.postalCode} , {''}  {cart.shippingAddress.country}

                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>METHODE DE PAIEMENT</h3>
                            <strong>METHODE : </strong>
                            {cart.PaymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>PRODUITS COMMANDES</h3>
                            {cart.cartItems.length === 0 ? <Message>Votre Panier est Vide</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name}
                                                            fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}

                                                        </Link>

                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x {item.price} = {item.qty * item.price} FCFA


                                                    </Col>
                                                </Row>

                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                )}

                        </ListGroup.Item>

                    </ListGroup>


                </Col>
                <Col md={4}>

                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Récapitulatif de la commande</h4>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Produits</Col>
                                    <Col>{cart.itemsPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Frais Livraison</Col>
                                    <Col>{cart.shippingPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{cart.totalPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                    style={{
                                        width: '100%',
                                        background: '#0097fe'
                                    }}>Passer La Commande

                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>

                </Col>
            </Row>

        </>
    );
};

export default PlaceOrderScreen;