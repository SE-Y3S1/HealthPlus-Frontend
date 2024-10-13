import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer"; 


const EditPatient = () => {
  const { patientId } = useParams(); 
  const [patient, setPatient] = useState({
    name: "",
    address: "",
    dob: "",
    contactno: "",
    email: "",
    insuranceprovider: "",
    policyno: "",
    medicalinfos: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        setError("Error fetching patient details.");
        console.error(error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, address, dob, contactno, email, insuranceprovider, policyno, medicalinfos } = patient;
    if (!name || !address || !dob || !contactno || !email || !insuranceprovider || !policyno || !medicalinfos) {
      return "All fields are required.";
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
      await axios.put(`http://localhost:8080/patients/${patientId}`, patient);
      setSuccessMessage("Patient updated successfully!");
      navigate(`/patient-details/`);
    } catch (error) {
      setError("Error updating patient details.");
      console.error(error);
    }
  };

  return (
    <div>
      <Header /> 
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6">Edit Patient Details</h2>

          {error && <div className="text-red-600 text-center mb-4">{error}</div>}
          {successMessage && <div aria-live="polite" className="text-green-600 text-center mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            {[
              { label: "Full Name", name: "name", type: "text", required: true },
              { label: "Residential Address", name: "address", type: "text", required: true },
              { label: "Date of Birth", name: "dob", type: "date", required: true },
              { label: "Contact Number", name: "contactno", type: "text", required: true },
              { label: "Email Address", name: "email", type: "email", required: true },
              { label: "Insurance Provider", name: "insuranceprovider", type: "text", required: true },
              { label: "Policy Number", name: "policyno", type: "text", required: true },
              { label: "Medical Information", name: "medicalinfos", type: "textarea", required: false },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block mb-2 font-semibold">{field.label}:</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={patient[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    rows="4"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={patient[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Update Patient
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPatient;
