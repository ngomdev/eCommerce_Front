import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { listOrders } from '../../actions/orderAction';
import { useNavigate } from 'react-router-dom';

const OrderListScreen = () => {
    const orderList = useSelector(state => state.orderList)

    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin



    let navigate = useNavigate()


    const dispatch = useDispatch()





    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())

        } else {
            navigate('/login', { replace: true })
        }


    }, [dispatch, navigate, userInfo])
    return (
        <>
            <h1>Commandes</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAYE</th>
                                <th>DELIVERE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length > 0 && orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice} FCFA</td>

                                        <td>
                                            {order.isPaid ? (order.paidAt.substring(0, 10)) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/order/${order._id}/edit`}>



                                                <Button variant='light'
                                                    className='btn-sm'>
                                                    Details

                                                </Button>
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

export default OrderListScreen;