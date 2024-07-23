
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
function SingleForm() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_FORM, { variables: { id: parseInt(id) } });

  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      createdAt: ''
  });

  useEffect(() => {
      if (data) {
          setFormData({
              name: data.getForm.name,
              email: data.getForm.email,
              message: data.getForm.message,
              createdAt: data.getForm.createdAt
          });
      }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return ( <div>
    <h2>Form Details</h2>
    <div>
        <label>ID:</label>
        <p>{data.getForm.id}</p>
    </div>
    <div>
        <label>Name:</label>
        <p>{formData.name}</p>
    </div>
    <div>
        <label>Email:</label>
        <p>{formData.email}</p>
    </div>
    <div>
        <label>Message:</label>
        <p>{formData.message}</p>
    </div>
   
</div>
);
};


export default SingleForm
