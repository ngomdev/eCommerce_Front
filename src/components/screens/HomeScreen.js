import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import banner from '../../assets/banner.png'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.png'
import banner4 from '../../assets/banner4.png'
import Product from '../Product';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productAction';


const HomeScreen = () => {

    const dispath = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispath(listProducts())


    }, [dispath])


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
                        src={banner2}

                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-carousel"
                        src={banner3}
                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block img-carousel"
                        src={banner4}
                    />


                </Carousel.Item>
            </Carousel>

            <h1 style={{ marginTop: '50px', textAlign: 'center' }}>Derniers produits</h1>

            {loading ? <h2>loading...</h2> : error ? <h3>{error}</h3> :
                <Row>
                    {products?.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product} />

                        </Col>
                    ))}
                </Row>

            }


            <div style={{ marginTop: '20px' }}>
                <img className='img' src={banner3} alt="" style={{ width: '100%', height: '250px' }} />
            </div>

        </>
    );
};

export default HomeScreen;