import React, { useState } from 'react'
import { Link,useLocation } from 'react-router-dom';
function AddContact(props) {

    const [state, setstate] = useState({ name: '', email: '' })
    const location=useLocation();

    const add = (e) => {
        e.preventDefault();
        if (state.name === '' && state.email === '') {
            alert('all the fields are mandatory!!')
            return
        }
        props.addContactHandler(state);
        setstate({ name: '', email: '' })
        location.pathname='/';

    }
    return (
        <div className='ui main'>
            <form className='ui form' onSubmit={add}>
                <h3>Add Contact</h3>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name='name'
                        placeholder='Name'
                        value={state.name}
                        onChange={(e) => {
                            setstate({ name: e.target.value, email: state.email });
                        }} />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type='text' name='Email'
                        placeholder='Email'
                        value={state.email}
                        onChange={(e) => {
                            setstate({ name: state.name, email: e.target.value });
                        }}
                    />
                </div>
                <button type='submit' className='ui button blue'>Add</button>
                <Link to='/'>

                <button type='submit' className='ui button blue' style={{float:'right'}}>Back to Contact List</button>
                </Link>
            </form>

        </div>
    )
}

export default AddContact