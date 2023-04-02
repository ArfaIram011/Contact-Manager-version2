import React,{useRef} from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

function ContactList(props) {
  console.log(props)
  const inputVal = useRef("")

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  }
  const renderContactList = props.contacts?.map((contact) => {
    return (
      <React.Fragment>
        <ContactCard
          contact={contact}
          clickHandler={deleteContactHandler}
          id={contact.id}
          key={contact.id} />
      </React.Fragment>
    );
  });

  const getSearchTerm=()=>{
    props.searchKeyword(inputVal.current.value)
    
  }
  return (
      <React.Fragment>

    <div className='main'>
      <h2>
        Contact list
        <Link to='/add'>
        <button className='ui button blue'
         style={{float:'right'}}>Add Contact</button>
        </Link>
      </h2>
      <div className='ui search' >
        <div className="ui icon input"
          style={{width:'100%',display:'grid',alignContent:'center'}}
        >
          <input type="text"
          ref={inputVal} 
          placeholder='Search contacts'
          className='prompt'
          value={props.term}
          onChange={getSearchTerm}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className='ui celled list'>
        {renderContactList.length > 0 ? renderContactList:<h4>No Contacts Available</h4> }
      </div>

    </div>
      </React.Fragment>
    
  )
}

export default ContactList