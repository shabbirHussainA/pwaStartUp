import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {AiFillApple} from 'react-icons/ai'
import Modal from '../../companyRegisterationPage/Modal';

//mutation to send the data into mysql DB
   const SUBMIT_FORM = gql`
       mutation SubmitForm($input: FormInput!) {
           submitForm(input: $input) {
               success
               message
           }
       }
   `;
const GET_FORMS = gql`
query GetForms {
    getForms {
        id
        name
        email
        message
    }
}
`;
/**
 * Functional component representing a form for submitting user data.
 * @returns {JSX.Element} Form component
 */
const GreetingPage = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const [image, setImage] = useState('');
    const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM,{
        refetchQueries:[{query:GET_FORMS}]
    });
    
    /**
     * Handles form submission by calling the submitForm mutation with user input.
     * @param {Event} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        // formData.append('image', image);

        try {
            await submitForm({ variables: { input: { name, email, message } } });
            history.push('/FormList')
        } catch (err) {
            console.error(err);
        }
    };
    const handleImageChange = (e)=>{
        setImage(e.target.files[0])
    }

    return (
        <>
        
        <form onSubmit={handleSubmit}>
            <div>
             
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Message:</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            {/* <div>
                <label>Image:</label>
                <input type="image" onChange={handleImageChange}/>
            </div> */}
            <button type="submit" disabled={loading}>Submit</button>
            {data && <p>{data.submitForm.message}</p>}
            {error && <p>Error: {error.message}</p>}
          
        </form>
        <button onClick={()=> setOpenModal(!openModal)}>open dialog</button>
       
        </>

        
    );
};

   export default GreetingPage;



