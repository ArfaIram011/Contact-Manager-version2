import React, { useState } from 'react'
import { Link,useLocation } from 'react-router-dom';
function EditContact(props) {
    console.log(props)
    const location=useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const id=searchParams.get('id')
    console.log(id,name, email)
    const [state, setstate] = useState({id:id,name:name,email:email})
    console.log(location)
   

    const update = (e) => {
        e.preventDefault();
        if (state.name === '' && state.email === '') {
            alert('all the fields are mandatory!!')
            return
        }
        console.log(state)
         props.updateContactHandler(state);
        setstate({ name: '', email: '' })
        location.pathname='/';
    }

    return (
        <div className='ui main'>

            <form className='ui form' onSubmit={update}>
                <h3>Edit Contact</h3>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name='name'
                        placeholder='Name'
                        value={state.name}
                        onChange={(e) => {
                            setstate({ id:state.id,name: e.target.value, email: state.email });
                        }} />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type='text' name='Email'
                        placeholder='Email'
                        value={state.email}
                        onChange={(e) => {
                            setstate({id:state.id, name: state.name, email: e.target.value });
                        }}
                    />
                </div>
                <button type='submit' className='ui button blue'>update</button>
                <Link to='/'>

                <button type='submit' className='ui button blue' style={{float:'right'}}>Back to Contact List</button>
                </Link>
            </form>
            
        </div>
    )
}

export default EditContact