import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productAction';
import Message from '../Message'
import Loader from '../Loader'


const ProductScreen = () => {
    let params = useParams();
    let navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails



    useEffect(() => {
        dispatch(listProductDetails(params.id))

    }, [dispatch])

    const addToCartHandler = () => {

        navigate(`/cart/${params.id}?qty=${qty}`, { replace: true })


    }
    return (
        <>
            <Link to="/">
                <i
                    style={{
                        fontSize: '30px',
                        color: '#0097fe'
                    }} className="fa-solid fa-circle-left"></i> </Link>


            {loading ? <Loader /> : error ? <Message variant='danger'></Message> : (

                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />

                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush' >
                            <ListGroup.Item>
                                <h3>{product.name}</h3>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReview} reviews`} />

                            </ListGroup.Item>
                            <ListGroup.Item>
                                Prix : {product.price} FCFA
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description : {product.description}

                            </ListGroup.Item>

                        </ListGroup>


                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Prix :</Col>


                                        <Col>
                                            <strong>{product.price} FCFA</strong>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Status :</Col>


                                        <Col>
                                            {product.countInStock > 0 ? 'En stock' : 'Rupture de stock'}
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantité</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={
                                                    (e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}

                                                            </option>
                                                        ))
                                                    }





                                                </Form.Control>

                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}



                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}


                                        style={{
                                            background: '#0097fe',
                                            color: 'white',
                                            width: '100%'

                                        }} className='btn btn-block' type='button' disabled={
                                            product.countInStock === 0}>
                                        <i className="fa-solid fa-cart-plus" style=
                                            {{
                                                marginRight: '20px',

                                                fontSize: '15px'
                                            }}></i>
                                        j'achete


                                    </Button>

                                </ListGroup.Item>

                            </ListGroup>
                        </Card>

                    </Col>
                </Row>



            )}




        </>

    );
};

export default ProductScreen;