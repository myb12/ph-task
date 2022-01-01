import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { orderID } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/orders/${orderID}`)
            .then(res => setOrder(res.data))
    }, [orderID])
    return (
        <div>
            <Typography variant="h4" className="heading">
                Please pay for {order.title}
            </Typography>
        </div>
    );
};

export default Payment;