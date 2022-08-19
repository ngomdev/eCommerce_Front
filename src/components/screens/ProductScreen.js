import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../Rating';
import axios from 'axios';
import Product from '../Product';


const ProductScreen = () => {
    let params = useParams();

    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${params.id}`)

            setProduct(data)
            console.log(data)
        }

        fetchProduct()

    }, [])








    return (


        <>
            <Link style={{
                background: '#6883bc',
                color: 'white',
                padding: '8px',
                borderRadius: '30px',
            }} className='btn btn-light my-3 ' to="/">
                Retour

            </Link>
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



                            <ListGroup.Item>
                                <Button style={{
                                    background: '#6883bc',
                                    color: 'white',

                                }} className='btn btn-block' type='button' disabled={
                                    product.countInStock === 0}>
                                    Ajouter au panier


                                </Button>

                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>
            </Row>



        </>

    );
};

export default ProductScreen;