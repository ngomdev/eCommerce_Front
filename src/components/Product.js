import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />

            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong> {product.name}</strong>
                    </Card.Title>

                </Link>

                <Card.Text as='div'>
                    <div className='my-3'>
                        <Button style={{
                            background: '#6883bc',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '30px',

                        }} type='button' disabled={
                            product.countInStock === 0}>
                            Commander


                        </Button>
                    </div>

                </Card.Text>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <Rating value={product.rating} text={`${product.numReview} reviews`} />
                    </div>

                </Card.Text>
                <Card.Text as='h3'>{product.price} FCFA</Card.Text>

            </Card.Body>

        </Card>
    );
};

export default Product;