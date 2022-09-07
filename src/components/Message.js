
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

// const AlertDismissible = () => {
//     const [show, setShow] = useState(true);

//     return (
//         <>
//             <Alert show={show} variant="info">
//                 <Alert.Heading>Votre Panier est vide</Alert.Heading>

//                 <hr />
//                 <div className="d-flex justify-content-end">
//                     <Button onClick={() => setShow(false)} variant="outline-info">
//                         <Link to='/'>retour</Link>

//                     </Button>
//                 </div>
//             </Alert>

//             {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
//         </>
//     );
// }



// export default AlertDismissible;



const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}

        </Alert>
    );
};

export default Message;