import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartAction'
import CheckoutSteps from '../../components/CheckoutSteps'
import paypal from '../../assets/paypal.png'
import mastercard from '../../assets/mastercard.png'
import orange from '../../assets/orange.png'
import Wave from '../../assets/Wave.png'
import free from '../../assets/free.png'


import FormContainer from '../../components/FormContainer'

const PaymentScreen = () => {
    let navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping', { replace: true })

    }

    const dispatch = useDispatch()

    const [paymentMethod, SetPaymentMethod] = useState('Paypal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder', { replace: true })

    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Paiement</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Row>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='Paypal'
                                id='paypal'
                                name='paymentMethod'
                                value='paypal'
                                checked
                                onChange={(e) => SetPaymentMethod(e.target.value)}



                            >



                            </Form.Check>

                            <Form.Check
                                type='radio'
                                label='Master Card'
                                id='Master Card'
                                name='paymentMethod'
                                value='Master Card'

                                onChange={(e) => SetPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                            <Form.Check
                                type='radio'
                                label='Orange Money'
                                id='Orange Money'
                                name='paymentMethod'
                                value='Orange Money'

                                onChange={(e) => SetPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                            <Form.Check
                                type='radio'
                                label='Wave'
                                id='Wave'
                                name='paymentMethod'
                                value='Wave'

                                onChange={(e) => SetPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                            <Form.Check
                                type='radio'
                                label='free'
                                id='free'
                                name='paymentMethod'
                                value='free'

                                onChange={(e) => SetPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                        </Col>
                        <Col>
                            <div>
                                <img src={paypal} style={{ height: '20%', margin: '10px', width: '20%', margin: '10px' }} />
                                <img src={mastercard} style={{ height: '20%', margin: '10px', width: '20%', margin: '10px' }} />
                                <img src={orange} style={{ height: '20%', margin: '10px', width: '20%', margin: '10px' }} />
                                <img src={Wave} style={{ height: '20%', margin: '10px', borderRadius: '50%', width: '20%', margin: '10px' }} />
                                <img src={free} style={{ height: '20%', margin: '10px', width: '20%', margin: '10px' }} />
                            </div>
                        </Col>
                    </Row>
                </Form.Group>

                <Button
                    style={{
                        background: '#0097fe',
                        color: 'white',
                        width: '100%'
                    }}
                    className='btn btn-block my-3'
                    type='submit'
                >

                    Poursuivre Votre Paiement
                </Button>

            </Form>

        </FormContainer>
    );
};

export default PaymentScreen;