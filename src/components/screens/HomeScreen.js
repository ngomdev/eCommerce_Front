import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import banner from '../../assets/banner.png'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.png'
import banner1 from '../../assets/banner1.png'
import banner4 from '../../assets/banner4.png'
import Product from '../Product';
import Message from '../Message'
import Loader from '../Loader'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productAction';
import { useParams } from 'react-router-dom';


const HomeScreen = () => {
    let params = useParams()

    const keyWord = params.keyWord
    const dispath = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispath(listProducts(keyWord))


    }, [dispath, keyWord])


    return (
        <>

            <Carousel>
                <Carousel.Item className=' d-bock carousel'>
                    <img
                        className="img-carousel"
                        src={banner}

                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-carousel"
                        src={banner1}

                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-carousel"
                        src={banner2}
                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-carousel"
                        src={banner3}
                    />


                </Carousel.Item>

            </Carousel>




            <h1 style={{ marginTop: '10px', textAlign: 'center' }}>DERNIERS PRODUITS</h1>

            {loading ?
                <Loader /> :
                error ?
                    <Message variant='danger'>{error}</Message> :
                    <Row>
                        {products?.map(product => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3} >
                                <Product product={product} />

                            </Col>
                        ))}
                    </Row>

            }
            <h1 style={{ marginTop: '10px', textAlign: 'center' }}>AUTRES ANNONCES</h1>
            <div>
                <img src={banner4} style={{ height: '300px', width: '100%' }} />
            </div>

        </>
    );
};

export default HomeScreen;