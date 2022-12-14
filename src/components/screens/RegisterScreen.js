import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { register } from '../../actions/userAction';
import FormContainer from '../../components/FormContainer'

const RegisterScreen = () => {
    let navigate = useNavigate()

    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userRegister


    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate('/', { replace: true })
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER
        if (password !== ConfirmPassword) {
            setMessage('Les mots de passe ne correspondent pas !')

        } else
            dispatch(register(name, email, password))

    }

    return (
        <FormContainer>
            <h1>Inscription</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type='name'
                        autoComplete='off'
                        placeholder='votre name'
                        value={name}
                        onChange={(e) => SetName(e.target.value)}


                    >

                    </Form.Control>

                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control
                        type='email'
                        autoComplete='off'
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
                        placeholder='votre mot de passe'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}


                    >

                    </Form.Control>

                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirmer Votre mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirmer votre mot de passe'
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}


                    >

                    </Form.Control>
                </Form.Group>

                <Button className='my-2' type='submit' style={{ background: '#0097fe', borderRadius: '5px' }}>
                    S'inscrire

                </Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    j'ai d??ja un compte ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Se connecter
                    </Link>

                </Col>

            </Row>

        </FormContainer >
    );
};

export default RegisterScreen;
