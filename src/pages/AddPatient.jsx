import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    contactno: "",
    email: "",
    nic: "", // Added NIC field
    insuranceprovider: "",
    policyno: "",
    medicalinfos: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, address, dob, contactno, email, nic } = formData; // Include NIC in validation
    if (!name || !address || !dob || !contactno || !email || !nic) {
      return "Please fill all required fields";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:8080/patients", formData);
      navigate("/patient-management");
      setFormData({
        name: "",
        address: "",
        dob: "",
        contactno: "",
        email: "",
        nic: "", // Reset NIC field
        insuranceprovider: "",
        policyno: "",
        medicalinfos: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while adding the patient.");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6">Add Patient</h2>

          {error && <div className="text-red-600 text-center mb-4">{error}</div>}
          {successMessage && <div aria-live="polite" className="text-green-600 text-center mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter patient's full name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Residential Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter patient's address"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Contact Number:</label>
              <input
                type="tel"
                name="contactno"
                value={formData.contactno}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter contact number"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter email address"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">NIC:</label> {/* Added NIC field */}
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter NIC number"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Insurance Provider:</label>
              <input
                type="text"
                name="insuranceprovider"
                value={formData.insuranceprovider}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter insurance provider name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Policy Number:</label>
              <input
                type="text"
                name="policyno"
                value={formData.policyno}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter policy number"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Medical Information:</label>
              <textarea
                name="medicalinfos"
                value={formData.medicalinfos}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                rows="4"
                placeholder="Enter relevant medical information"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-gradient-to-l transition"
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
