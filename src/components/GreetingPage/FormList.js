import React from 'react';
import { useQuery, gql } from '@apollo/client';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';
import {NavLink} from 'react-router-dom'
import './FormList.css'; // Import the CSS file
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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

const FormList = () => {
    const { loading, error, data } = useQuery(GET_FORMS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <table className="form-table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.getForms.map((form) => (
                    <tr key={form.id}>
                        <td>{form.id}</td>
                        <td>{form.name}</td>
                        <td>{form.email}</td>
                        <td>{form.message}</td>
                        <td>
                            {/* <UpdateForm form={form} GET_FORMS={GET_FORMS} /> */}
                            <DeleteForm id={form.id} GET_FORMS={GET_FORMS}/>
                            <div>

                            <Link to={'/FormEdit/'+form.id} >Update</Link>
                            </div>
                            <div>

                            <Link to={'/view/'+form.id}>View</Link>
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FormList;