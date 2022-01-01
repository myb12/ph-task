import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51KD5EaBrD3UISWrixTsiQsQthOeWq0DEsnKCWNV6QdUDbeXAu2wBRd3xk5hNwWC0f1UdMGhSw6DJ9XFsr5i1y3nK002ZfvYvcC');
const Payment = () => {
    const { orderID } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${orderID}`)
            .then(res => setOrder(res.data))
    }, [orderID])
    return (
        <div>
            <Typography variant="h4" className="heading" sx={{ textAlign: 'center', mb: 2 }}>
                Please pay for {order.title}
            </Typography>
            <Typography sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
                Pay: ${order.price}
            </Typography>

            {
                order.price && <Elements stripe={stripePromise}>
                    <CheckOutForm order={order} />
                </Elements>
            }
        </div>
    );
};

export default Payment;