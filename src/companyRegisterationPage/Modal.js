import React,{useState,useEffect} from 'react'
import "./Modal.css";
import {gql, useMutation} from '@apollo/client'
import {SUBMIT_FORM,GET_COMPANY_REGISERATION} from './companyRegisteration.gql'
function Modal({
    modalclose
}) {
    const [companyName, setCompanyName] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [numEmployees, setNumEmployees] = useState('');
    const [managerContact, setManagerContact] = useState('');
    const [start, setstart] = useState(false)
    const [submitCompanyRegistration, { data, loading, error }] = useMutation(SUBMIT_FORM, {
        refetchQueries: [{ query: GET_COMPANY_REGISERATION }]
    });
    const handleSubmit = (event) => {
        event.preventDefault();
      
        setstart(true)
    }
  
    useEffect(() => {
        if (start == true) {
         
            const trimmedcomPanyName = companyName.trim();
        const trimmedmanagerConatact = managerContact.trim();
            const submitForm = async () => {
                try {
                    console.log({ companyname: trimmedcomPanyName,openingtime: openingTime,closingtime:closingTime, employee_number: numEmployees, manager_contact:trimmedmanagerConatact});
                    await submitCompanyRegistration({ variables: { input: { companyname: trimmedcomPanyName,openingtime: openingTime,closingtime:closingTime, employee_number:parseInt(numEmployees), manager_contact:trimmedmanagerConatact} } });

                    setClosingTime('');
                    setCompanyName('');
                    setManagerContact('');
                    setNumEmployees('');
                    setOpeningTime('');
                    setstart(false);
                    // console.log(data.message)
                } catch (err) {
                    console.error("Error submitting form:", err);
                }
            };

            submitForm();
        }
    }, [start]);
    
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='titleCloseBtn'>

            <button onClick={()=>modalclose(false)}>X</button>
            </div>
            <div className='title'>
                <h1>Please register your company first</h1>

            </div>
            <div className='body'>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Company Name:</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Opening Time:</label>
                <input
                    type="time"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Closing Time:</label>
                <input
                    type="time"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Number of Employees:</label>
                <input
                    type="number"
                    value={numEmployees}
                    onChange={(e) => setNumEmployees(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Manager Contact Number:</label>
                <input
                    type="tel"
                    value={managerContact}
                    onChange={(e) => setManagerContact(e.target.value)}
                    required
                    pattern="[0-9]*"
                />
            </div>
            <div className='footer'>
            <button type="submit">Register</button>
            </div>
        </form>
        {data && <p>{data.submitCompanyRegistration.message}</p>}
        {error && <p>Error: {error.message}</p>}
            </div>
           
        </div>
    </div>
  )
}

export default Modal
