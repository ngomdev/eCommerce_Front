import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SeachBox = () => {
    let navigate = useNavigate()
    const [keyWords, setKeyWords] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWords.trim()) {
            navigate(`/search/${keyWords}`, { replace: true })
        } else {
            navigate('/', { replace: true })
        }
    }
    return (
        <Form onSubmit={submitHandler} inline
            style={{ display: 'flex', marginLeft: '50px' }}>
            <Form.Control type='text' autoComplete='off'

                name='q'
                onChange={(e) => setKeyWords(e.target.value)}

                placeholder='Rechercher un Produit ....'

            >

            </Form.Control>
            <Button type='submit' variant='outline-primary' style={{
                background: '#0097fe',
                color: 'white',
                padding: '0px 18px 0px 18px',
                borderRadius: '0px 5px 5px 0px'


            }}>

                <i class="fa-solid fa-magnifying-glass"></i>


            </Button>
        </Form>
    );
};

export default SeachBox;