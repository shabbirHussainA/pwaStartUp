import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_FORM = gql`
    mutation DeleteForm($id: Int!) {
        deleteForm(id: $id) {
            success
            message
        }
    }
`;

const DeleteForm = ({ id,GET_FORMS}) => {
    const [deleteForm, { data, loading, error }] = useMutation(DELETE_FORM,{
        refetchQueries:[{query: GET_FORMS}]
    });

    const handleDelete = async () => {
        try {
            await deleteForm({ variables: { id } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={loading}>Delete</button>
            {data && <p>{data.deleteForm.message}</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default DeleteForm;