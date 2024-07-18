import React, { useState, useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const UPDATE_FORM = gql`
    mutation UpdateForm($id: Int!, $input: FormInput!) {
        updateForm(id: $id, input: $input) {
            success
            message
        }
    }
`;

const GET_FORM = gql`
    query GetForm($id: Int!) {
        getForm(id: $id) {
            id 
            name 
            email
            message
        }
    }
`;

const UpdateForm = ({ GET_FORMS }) => {
    const { id } = useParams();
    const { loading, error, data,refetch } = useQuery(GET_FORM, { variables: { id: parseInt(id) } });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (data) {
            setName(data.getForm.name);
            setEmail(data.getForm.email);
            setMessage(data.getForm.message);
        }
    }, [data]);

    const [updateForm, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_FORM, {
        refetchQueries: [{ query: GET_FORMS }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateForm({ variables: { id: parseInt(id), input: { name, email, message } } });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
            <button type="submit" onClick={()=>refetch()} disabled={updateLoading}>Update</button>
            {updateData && <p>{updateData.updateForm.message}</p>}
            {updateError && <p>Error: {updateError.message}</p>}
        </form>
    );
};

export default UpdateForm;