import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails } from '../../actions/userAction';
import FormContainer from '../../components/FormContainer'


const UserEditScreen = () => {
    let navigate = useNavigate()
    let params = useParams()

    const userId = params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)

        }

    }, [dispatch, user, userId])

    const submitHandler = (e) => {
        e.preventDefault()


    }

    return (
        <>
            <Link to="/admin/userlist">
                <i
                    style={{
                        fontSize: '30px',
                        color: '#0097fe'
                    }} className="fa-solid fa-circle-left"></i> </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='name'
                                autoComplete='off'
                                placeholder='votre name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}


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
                                onChange={(e) => setEmail(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId='isAdmin'>

                            <Form.Check
                                type='checkbox'
                                label='Est-il Admin ?'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}


                            >

                            </Form.Check>

                        </Form.Group>



                        <Button className='my-2' type='submit' style={{ background: '#0097fe', borderRadius: '5px' }}>
                            Modifier

                        </Button>

                    </Form>


                )}

            </FormContainer >
        </>

    );
};

export default UserEditScreen;
