import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_FORM = gql`
    mutation UpdateForm($id: Int!, $input: FormInput!) {
        updateForm(id: $id, input: $input) {
            success
            message
        }
    }
`;
// const GET_FORMS = gql`
//     query GetForms {
//         getForms {
//             id
//             name
//             email
//             message
//         }
//     }
// `;
const UpdateForm = ({ form, GET_FORMS }) => {
    const [name, setName] = useState(form.name);
    const [email, setEmail] = useState(form.email);
    const [message, setMessage] = useState(form.message);
    const [updateForm, { data, loading, error }] = useMutation(UPDATE_FORM,{
    refetchQueries: [{query: GET_FORMS}],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateForm({ variables: { id: form.id, input: { name, email, message } } });
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
            <button type="submit" disabled={loading}>Update</button>
            {data && <p>{data.updateForm.message}</p>}
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default UpdateForm;