import React, { useState } from 'react';
   import { useMutation, gql } from '@apollo/client';
//mutation to send the data into mysql DB
   const SUBMIT_FORM = gql`
       mutation SubmitForm($input: FormInput!) {
           submitForm(input: $input) {
               success
               message
           }
       }
   `;

/**
 * Functional component representing a form for submitting user data.
 * @returns {JSX.Element} Form component
 */
const GreetingPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);

    /**
     * Handles form submission by calling the submitForm mutation with user input.
     * @param {Event} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitForm({ variables: { input: { name, email, message } } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
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
            <button type="submit" disabled={loading}>Submit</button>
            {data && <p>{data.submitForm.message}</p>}
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

   export default GreetingPage;



