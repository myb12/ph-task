import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';

export default function PurchaseModal({ handleClose, open, plan, setMessage }) {
    const { user } = useAuth();


    const handlePurchase = () => {
        const orderData = { ...plan };
        orderData.orderBy = user.email;
        handleClose();
        axios.post('http://localhost:5000/orders',
            orderData)
            .then(res => {
                if (res.data.insertedId) {
                    setMessage('Your order is successfull')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {plan.title}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>${plan.price}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePurchase}>Purchase</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}