import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartAction'
import CheckoutSteps from '../../components/CheckoutSteps'

import FormContainer from '../../components/FormContainer'

const ShippingScreen = () => {
    let navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ adress, city, postalCode, country }))
        navigate('/payment', { replace: true })
    }
    const [adress, SetAdress] = useState(shippingAddress.adress)
    const [city, SetCity] = useState(shippingAddress.city)
    const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode)
    const [country, SetCountry] = useState(shippingAddress.country)
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Expédition</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='adress'>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='votre adresse'
                        required
                        value={adress}
                        onChange={(e) => SetAdress(e.target.value)}


                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='Code Postal..'
                        required
                        value={postalCode}
                        onChange={(e) => SetPostalCode(e.target.value)}


                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ville</Form.Label>
                    <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='Entrer votre ville..'
                        required
                        value={city}
                        onChange={(e) => SetCity(e.target.value)}


                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Région</Form.Label>
                    <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='Entrer votre Région..'
                        required
                        value={country}
                        onChange={(e) => SetCountry(e.target.value)}


                    >

                    </Form.Control>
                </Form.Group>

                <Button



                    style={{
                        background: '#0097fe',
                        color: 'white',
                        borderRadius: '6px'


                    }}
                    className=' my-3' type='submit'
                >

                    Continuer


                </Button>

            </Form>

        </FormContainer>
    );
};

export default ShippingScreen;