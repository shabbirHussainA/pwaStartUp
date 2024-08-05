import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {GET_ADDRESS_INQUIRIES,SUBMIT_FORM} from './addressInquiry.gql'
import Modal from '../companyRegisterationPage/Modal';

/**
 * Functional component representing a form for submitting user data.
 * @returns {JSX.Element} Form component
 */
const AddressVerification = () => {
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false)

    const [postcode, setPostcode] = useState('');
    const [email, setEmail] = useState('');
    const [buildingname, setBuildingName] = useState('');
    const [message, setMessage] = useState('');
    const [active, setActive] = useState(false);
    const [behaviour, setBehaviour] = useState('');

    const [submitAddressInquiry, { data, loading, error }] = useMutation(SUBMIT_FORM, {
        refetchQueries: [{ query: GET_ADDRESS_INQUIRIES }]
    });

    const pcodeArray = ["101", "102", "103"];
    const buildingArray = ["awari", "dolmen", "askari", "saima"];

    /**
     * Handles form submission by calling the submitForm mutation with user input.
     * @param {Event} e - The form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedPostcode = postcode.trim();
        const trimmedBuildingname = buildingname.trim();

        if (pcodeArray.includes(trimmedPostcode) && buildingArray.includes(trimmedBuildingname)) {
            setMessage("Congrats! We are available in your region.");
            setBehaviour('can Deliver');
            setActive(true);
        } else if (!buildingArray.includes(trimmedBuildingname) && pcodeArray.includes(trimmedPostcode)) {
            setMessage("We deliver in your region but your building is not registered. Kindly register first.");
            setBehaviour('building not found');
            setActive(false);
            setOpenModal(true);
            <Modal/>
        } else {
            setMessage("Sorry, we are not available in your region.");
            setBehaviour('not available');
            setActive(false);
        }
    };

    useEffect(() => {
        if (message !== '' && behaviour !== '') {
            const trimmedPostcode = postcode.trim();
            const trimmedBuildingname = buildingname.trim();

            const submitForm = async () => {
                try {
                    console.log({ postcode: trimmedPostcode, email, buildingname: trimmedBuildingname, active, message, behaviour });
                    await submitAddressInquiry({ variables: { input: { postcode: trimmedPostcode, email, buildingname: trimmedBuildingname, active, message, behaviour } } });

                    setPostcode('');
                    setEmail('');
                    setBuildingName('');
                    setBehaviour('');
                    active && history.push('/create-account');
                    setActive(false);
                } catch (err) {
                    console.error("Error submitting form:", err);
                }
            };

            submitForm();
        }
    }, [message, behaviour]);

    return (
        <>
         {openModal && <Modal modalclose={setOpenModal}/>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Postcode:</label>
                    <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <textarea value={buildingname} onChange={(e) => setBuildingName(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            {data && <p>{data.submitAddressInquiry.message}</p>}
            {error && <p>Error: {error.message}</p>}
        </>
    );
};

export default AddressVerification;
