import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import {
    listProducts,
    deleteProduct,
    createProduct
} from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const ProductListScreen = () => {
    let navigate = useNavigate()
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure !')) {
            dispatch(deleteProduct(id))

        }


    }

    const createProductHandler = () => {
        // create product
        dispatch(createProduct())
    }
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)

    const { loading: loadingDelete,
        error: errorDelete,
        success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)

    const { loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product } = productCreate


    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin


    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })
        console.log({ userInfo })
        if (!userInfo?.isAdmin) {

            navigate('/login', { replace: true })

        }

        if (successCreate) {
            navigate(`/admin/product/${product._id}/edit`, { replace: true })

        } else {
            dispatch(listProducts())
        }


    }, [dispatch, navigate, userInfo, successCreate, successDelete, product])
    return (
        <>
            <Row className='align-items-center'>
                <Col md={9}>
                    <h1>PRODUITS</h1>

                </Col>
                <Col md={3} className='text-right'  >
                    <Button className='my-3' style={{ borderRadius: '6px', background: '#0097fe' }}
                        onClick={createProductHandler} >
                        <i className='fas fa-plus'></i>AJOUT PRODUIT


                    </Button>
                </Col>

            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>

                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOM</th>
                                <th>PRIX</th>
                                <th>CATEGORIES</th>
                                <th>MARQUE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.length > 0 && products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price} FCFA</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>


                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>


                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>

                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => {
                                                deleteHandler(product._id)
                                            }}>
                                                <i className='fas fa-trash'></i>
                                            </Button>


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

export default ProductListScreen;