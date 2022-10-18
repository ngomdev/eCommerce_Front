import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message'
import Loader from '../Loader'
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../../actions/orderAction';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const orderId = params.id

    const [sdkReady, setSdkReady] = useState(false)

    const cart = useSelector(state => state.cart)

    const orderDetails = useSelector(state => state.orderDetails)

    const { order, loading, error } = orderDetails


    const orderPay = useSelector(state => state.orderPay)

    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))


    }


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))

    }


    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.append(script)
        }
        if (!order || successPay) {

            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }

        }



    }, [dispatch, orderId, successPay, order])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        :
        <>
            <h1>Commande id : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>EXPEDITION</h3>
                            <p><strong>NOM : </strong>{order.user.name}</p>
                            <p><strong>EMAIL : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>ADRESSE : </strong>
                                {order.shippingAddress.adress} , {order.shippingAddress.city}{''} ,
                                {order.shippingAddress.postalCode} , {''}  {order.shippingAddress.country}

                            </p>
                            {
                                order.isdelivered ?
                                    (
                                        <Message variant='success'>Livré Le {order.deliveredAt}</Message>
                                    )
                                    : (
                                        <Message variant='danger'>Non Livré</Message>

                                    )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>METHODE DE PAIEMENT</h3>
                            <p>
                                <strong>METHODE : </strong>
                                {order.paymentMethod}
                            </p>

                            {
                                order.isPaid ?
                                    (
                                        <Message variant='success'>Payé Le {order.paidAt}</Message>
                                    )
                                    : (
                                        <Message variant='danger'>Impayé</Message>

                                    )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>PRODUITS COMMANDES</h3>
                            {order.orderItems.length === 0 ? <Message>Commande Vide</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
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
                                    <Col>{order.itemsPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Frais Livraison</Col>
                                    <Col>{order.shippingPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{order.totalPrice} FCFA</Col>

                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice}
                                            onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>

                            )}


                        </ListGroup>

                    </Card>

                </Col>
            </Row>
        </>


};

export default OrderScreen;