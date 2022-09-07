import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userAction';
import { userUpdateProfileReducer } from '../reducers/userReducers';


const ProfilScreen = () => {
    let navigate = useNavigate()

    const [name, SetName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { success } = userUpdateProfile



    useEffect(() => {
        if (!userInfo) {
            navigate('/', { replace: true })
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))

            } else {
                SetName(user.name)
                SetEmail(user.email)

            }

        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER
        if (password !== ConfirmPassword) {
            setMessage('Passwords do not match !')

        } else {
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }



    return (

        <Row>
            <Col md={3}>

                <h2>Mon compte</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile modifié</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type='name'
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
                        Modifier

                    </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>Mes Commandes</h2>

            </Col>
        </Row>
    );
};

export default ProfilScreen
