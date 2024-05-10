import { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import "./App.css";
import ContactForm from "./components/ContactForm";

import { fetchFromAPI } from "./utils/fetchFromAPI";

function App() {
  
  const [contacts, setContacts] = useState([]);
  // set a moke data: const [contacts, setContacts] = useState([{"firstName": "deaken", "lastName": "T", "email": "123@mail.com"}]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  
  useEffect(() => {
    fetchFromAPI('contacts')
    // data is the value that fetchFromAPI returned
      .then(data => setContacts(data.contacts))
  }, []);

  // useEffect(() => {
  //   fetchContacts()
  // }, []);

  // const fetchContacts = async () => {
  //   // grib all data from backend API (READ)
  //   const response = await fetch("http://127.0.0.1:5000/contacts");
  //   const data = await response.json();
  //   // contacts in backend API a list of objects
  //   setContacts(data.contacts);
  //   console.log("XXXX");
  //   console.log(data.contacts);
  // };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }
  
  // modal to CREATE contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // modal to edit/UPDATE or CREATE contact
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {

    closeModal()
    // call useEffect everytime rendered
    // fetchContacts()
    fetchFromAPI('contacts').then(data => setContacts(data.contacts))
    // console.log(typeof contacts);
  }
  
  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {/* if modal is close we won't see the contact form */}
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;