/* src/components/GreetingPage/greetingPage.js */

import React,{useState} from "react";
// import { useParams } from "react-router-dom";

const hi = {
  textAlign: "center",
  margin: "1rem",
};
const wave = {
  ...hi,
  fontSize: "5rem",
};

const GreetingPage = () => {
  // const { who = "nobody" } = useParams();//getting the name from the url
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    file: null,
    contactNumber: "",
    message: "",
    address: "",
  });
// for handling the formdata Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// for handling the file data change
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
// this is for handling submit and consoling the data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit form data using API call or other methods
  };
  return (
    <div>
      <h1  style={hi}>Hello, you!</h1>
      <h1 style={wave}>{"\uD83D\uDC4B"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
      required
    />
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="fatherName">Fathername:</label>
    <input
      type="text"
      id="fatherName"
      name="fatherName"
      value={formData.fatherName}
      onChange={handleChange}
      style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
      required
    />
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="file">Upload File:</label>
    <input type="file" id="file" name="file" onChange={handleFileChange} style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="contactNumber">Contact Number:</label>
    <input
      type="tel"
      id="contactNumber"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleChange}
      pattern="[0-9]{10}"
      style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
      required
    />
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="message">Message:</label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
    />
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <label htmlFor="address">Address:</label>
    <textarea
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
    />
  </div>

  <button type="submit" className="" style={{ padding: "0.8rem 1.5rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
</form>
    </div>
  );
};

export default GreetingPage;





