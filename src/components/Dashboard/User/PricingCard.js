import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import './PricingCard.css';
import PurchaseModal from './PurchaseModal/PurchaseModal';

const PricingCard = ({ plan, setMessage }) => {
    const [open, setOpen] = useState(false);
    const isTab = useMediaQuery('(max-width:990px)');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <PurchaseModal open={open} handleClose={handleClose} plan={plan} setMessage={setMessage} />
            <div className="card" style={{ marginRight: !isTab && 20 }}>
                <div className="card-pricing">
                    <div className="price">
                        <div><span className="symbol">$</span>{plan.price}</div>
                        <span className="month">/month</span>
                    </div>
                </div>

                <header className="card-header">
                    <div className="card-header-circle">
                        <img src="https://i.ibb.co/jWmpHCK/pro-coin.png" alt="" className="card-header-img" />
                    </div>

                    <span className="card-header-subtitle">Most popular</span>
                    <h1 className="card-header-title">{plan.title}</h1>
                </header>

                <ul className="card-list">
                    <li className="card-list-item">
                        <i className="uil uil-check-circle card-list-icon"></i>
                        <p className="card-list-description">Taught by skilled trainer</p>
                    </li>
                    <li className="card-list-item">
                        <i className="uil uil-check-circle card-list-icon"></i>
                        <p className="card-list-description">You can learn very fast from us</p>
                    </li>
                </ul>
                <button className="card-button" onClick={handleClickOpen}>Choose this plan</button>
            </div>
        </>
    );
};

export default PricingCard;