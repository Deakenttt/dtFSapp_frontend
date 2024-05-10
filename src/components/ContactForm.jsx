import axios from "axios";
import { useState } from "react";
import { createFromAPI } from "../utils/createFromAPI";
import { updateFromAPI } from "../utils/updateFromAPI";

// set the existingContact to empty object, we pass the current contact in App.jsx
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    // if existingContact is not null, we use its current info
    const [firstName, setFirstName] = useState(existingContact.firstName || "");  // set use state 
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    // if existingContact = {} we create one, if existingContact = something we edit it and update
    const updating = Object.entries(existingContact).length !== 0
    
    const onSubmit = async (e) => {
        e.preventDefault()
        
        // Using fetch 
        // const data = {
        //     firstName,
        //     lastName,
        //     email
        // }
        // // if the data exist in the dataset we UPDTAE else CREATED one to backend API
        // const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        // const options = {
        //     method: updating ? "PATCH" : "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // }
        // console.log(`the data we recorded is: ${options.body}`);
        // const response = await fetch(url, options)

        // // Using axios instead of fetch
        const data = {
            firstName,
            lastName,
            email
        }
        let response = null;
        if (updating) {
            // Do update
            response = await updateFromAPI(`update_contact/${existingContact.id}`, data);
            console.log('Success:', response);
        } else {
            // Do create
            response = await createFromAPI('create_contact', data);
            console.log('Success:', response);
        }
        // check does the request pass in backend API (server)
        console.log(`the status is: ${response.status}`);
        if (response.status !== 201 && response.status !== 200) {
            // const data = await response
            // alert(data.message)
            console.log("request ERROE!");
        } else {
            updateCallback()
        }
    }

    // const axiosPostData = async() => {
    //     const data = {
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email
    //     }
    //     const response = await createFromAPI('create_contact', data);
    //     console.log('Success:', response);
    //     // await axios.post('http://127.0.0.1:5000/create_contact', data)
    //     // .then(res => console.log(res.data))
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axiosPostData()
    //     updateCallback()
    // }

    // call the libray from node.js
    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
        {/* <form > */}
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                // the data and date formate user entered (first name)
                    type="text"
                    id="firstName"
                    // the value: firstName is a local variable in useState() 
                    value={firstName}
                    onChange={handleFirstName}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {/* this following code doesn't render refetch the databse after onclick triger  */}
            {/* <button type="submit" onClick={handleSubmit}>{updating ? "Update" : "Create"}</button> */}
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default ContactForm