import React from 'react';
import user from '../images/user.png'
import { Link } from 'react-router-dom';

function ContactCard(props) {

  console.log(props);
  const { name, id, email } = props.contact;
  console.log(name, id, email)
  console.log(props.contact);

  return (
    <div className='item'>
      <div className='content'>

        <Link to={{
          pathname: `/contact/${id}`,
          search: `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
        }}>
          <div className='header'>
            <img className='ui avatar image' src={user} alt='user' />
            {name}</div>
          <div>{email}</div>
        </Link>

        <Link to={{
          pathname: `/edit`,
          search: `?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&id=${encodeURIComponent(id)}`
        }}>
          <i
            style={{ float: 'right', color: 'blue', marginTop: '7px' }}
            className='edit alternate outline icon'
            // onClick={()=>alert('button clicked')}
           
          ></i>
        </Link>
        
        <i
          style={{ float: 'right', color: 'red', marginTop: '7px', marginRight: '10px' }}
          className='trash alternate outline icon'
          // onClick={()=>alert('button clicked')}
          onClick={() => props.clickHandler(props.id)}
        ></i>
      </div>
    </div>
  )
}

export default ContactCard;