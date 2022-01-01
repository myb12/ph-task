import React from 'react';
import './PricingCard.css';

const PricingCard = ({ plan }) => {
    return (
        <div className="card">
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
            <button className="card-button">Choose this plan</button>
        </div>
    );
};

export default PricingCard;