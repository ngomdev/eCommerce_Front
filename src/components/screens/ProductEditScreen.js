import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { listProductDetails, updateProduct } from '../../actions/productAction';
import FormContainer from '../../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEditScreen = () => {
    let navigate = useNavigate()
    let params = useParams()

    const productId = params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist', { replace: true })
        } else {

            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)

            }


        }

    }


        , [dispatch, product, productId, navigate, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'

                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            category,
            description,
            countInStock
        }))



    }

    return (
        <>
            <Link to="/admin/productlist">
                <i
                    style={{
                        fontSize: '30px',
                        color: '#0097fe'
                    }} className="fa-solid fa-circle-left"></i>
            </Link>
            <FormContainer>
                <h1>Modifier Produit</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='name'
                                autoComplete='off'
                                placeholder='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>


                        <Form.Group controlId='price'>
                            <Form.Label>Prix</Form.Label>
                            <Form.Control
                                type='number'
                                autoComplete='off'
                                placeholder='votre price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId='image'>

                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='url image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>

                            <Form.Group controlId="image-file" >

                                <Form.Control type="file" onChange={uploadFileHandler} />
                            </Form.Group>
                            {uploading && <Loader />}


                        </Form.Group>

                        <Form.Group controlId='brand'>

                            <Form.Label>Marque</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='marque'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>


                        <Form.Group controlId='countInStock'>

                            <Form.Label>Nombre de Stock</Form.Label>
                            <Form.Control
                                type='number'
                                autoComplete='off'
                                placeholder='nombre de stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId='category'>

                            <Form.Label>Catégories</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Entrer la catégorie'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}


                            >

                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId='description'>

                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                autoComplete='off'
                                placeholder='Entrer la description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}


                            >

                            </Form.Control>

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

export default ProductEditScreen;
