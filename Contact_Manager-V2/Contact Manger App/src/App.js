
/* ________________Illustrating CRUD Operations using Axios post,get,put,delete functions from json server_____________________  */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import EditContact from "./components/EditContact";
import api from './api/contacts_data';



function App() {
  const { v4: uuidv4 } = require('uuid');
  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearchTerm]=useState('')
  const [searchResults,setSearchResults]=useState([]);

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!== "")
    {
      const newContactList=contacts.filter((contact)=>{
       return Object.values(contact)
       .join(" ")
       .toLowerCase()
       .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
     
  }
  
  
  //retrieveContacts CRUD-R
  const retrieveContacts = async ()=> {
    const response = await api.get("/contacts_data");
    console.log(response)
    return response.data;
  }

  //function to perform ADD CRUD-C
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request={
      id:uuidv4(),
      ...contact
    }
    const response =await api.post("/contacts_data",request)
    console.log(response)
    setContacts([...contacts, response.data]);
    // console.log(contact.id)
    //The spread operator can be used to take an existing array and add another element to it while still preserving the original array (famous original array’s?).
  }

  //function to perform update CRUD-U
  const updateContactHandler=async (contact)=>{
    console.log(contacts)
    const response=await api.put(`/contacts_data/${contact.id}`,contact)
    console.log(response.data);
    const {id}=response.data;
    setContacts(
    contacts.map((contact)=>{
      return contact.id===id?{...response.data}:contact;
    }))
    console.log(contacts)
  }

  //function to perform Delete CRUD-D
  const removeContactHandler = async (id) => {
     await api.delete(`/contacts_data/${id}`)
    //filter returns all the elements of arr satisfying condition
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      console.log(allContacts)
      if (allContacts) { setContacts(allContacts); }
    };
    getAllContacts()
  }, []);



  return (
    <div className="ui container">
        <Header /><br/><br/><br/>
      <Router>
        <Routes>

          <Route
            path="/"
            element={
              < ContactList
                contacts={searchTerm.length < 1 ? contacts: searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
                 />}/>


          < Route
            path="/add"
            element={
              < AddContact  addContactHandler={addContactHandler} />} />

          < Route 
            path="/contact/:id" 
            element={<ContactDetails />} />

          <Route
           path="/edit"
           element={<EditContact  updateContactHandler={updateContactHandler}/>}/>

        </Routes>
      </Router>
    </div>

  )
}
export default App;