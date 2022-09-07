import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { listUsers } from '../../actions/userAction';

const UsersListScreen = () => {
    const deleteHandler = (id) => {
        console.log('delete')
    }

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)

    const { loading, error, users } = userList

    console.log(users)

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])
    return (
        <>
            <h1>Utilisateurs</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 && users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>
                                            {user.isAdmin ? (<i className='fas fa-check'
                                                style={{ color: 'green' }}></i>) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/user/${user._id}/edit`}>

                                                <>
                                                    <Button variant='success' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>

                                                    </Button>
                                                    <Button variant='danger' className='btn-sm' onClick={() => {
                                                        deleteHandler(user._id)
                                                    }}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )}
        </>
    );
};

export default UsersListScreen;