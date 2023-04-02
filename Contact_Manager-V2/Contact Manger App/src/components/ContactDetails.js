import React from 'react';
import user from '../images/user.jpg'
import { Link, useLocation } from 'react-router-dom';

function ContactDetails() {
    const searchParams = new URLSearchParams(useLocation().search);
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    console.log(name, email);

    return (
        <div className="main">

            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>

            <div className='center-div' style={{ display: 'flex', justifyContent: 'center', marginBottom: '5%' }}>
                <Link to='/'>

                    <button className='ui button blue' >Back to Contact List</button>
                </Link>
            </div>

        </div>
    )
}

export default ContactDetails;