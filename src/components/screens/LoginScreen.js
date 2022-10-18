import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { login } from '../../actions/userAction';
import FormContainer from '../../components/FormContainer'

const LoginScreen = () => {
    let navigate = useNavigate()

    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin


    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect, { replace: true })
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email, password))


    }

    return (
        <FormContainer>
            <h1>Se Connecter</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='votre email'
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}


                    >

                    </Form.Control>

                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='votre password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}


                    >

                    </Form.Control>

                </Form.Group>
                <Button className='my-2' type='submit' style={{ background: '#0097fe', borderRadius: '5px' }}>
                    S'identifier

                </Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    Nouveau client ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Inscrire
                    </Link>

                </Col>

            </Row>

        </FormContainer >
    );
};

export default LoginScreen;