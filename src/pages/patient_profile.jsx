import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import jsPDF from "jspdf"; // Importing jsPDF for PDF generation
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // Fetch patient details when the component mounts
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/patients/${id}`);
        setPatient(response.data);
        setEditedPatient(response.data); // Initialize editedPatient with patient data
      } catch (error) {
        setError("Error fetching patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Patient Profile\n\n`, 10, 10);
    doc.text(`Name: ${patient.name}`, 10, 20);
    doc.text(`NIC: ${patient.nic}`, 10, 30); // Add NIC to PDF
    doc.text(`Address: ${patient.address}`, 10, 40);
    doc.text(`Date of Birth: ${new Date(patient.dob).toLocaleDateString()}`, 10, 50);
    doc.text(`Contact Number: ${patient.contactno}`, 10, 60);
    doc.text(`Email Address: ${patient.email}`, 10, 70);
    doc.text(`Insurance Provider: ${patient.insuranceprovider}`, 10, 80);
    doc.text(`Policy Number: ${patient.policyno}`, 10, 90);
    doc.text(`Medical Information: ${patient.medicalinfos.split(", ").join(", ")}`, 10, 100);
    doc.save("patient-profile.pdf");
  };

  // Redirect to email client
  const handleEmail = () => {
    const email = patient.email; // Get the email address
    if (email) {
      window.location.href = `mailto:${email}`; // Redirect to email client
    } else {
      console.error("Email address is not available."); // Handle the case where email is not set
    }
  };

  // Function to handle editing patient details
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const saveEditedDetails = async () => {
    try {
      await axios.put(`http://localhost:8080/patients/${id}`, editedPatient);
      setPatient(editedPatient);
      setSuccessMessage("Patient details updated successfully!");
      setIsEditing(false); // Close edit mode
    } catch (error) {
      setError("Error updating patient details.");
    }
  };

  // Handle patient deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/patients/${id}`);
        setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== id));
        navigate("/patient-management");
      } catch (error) {
        setError("Error deleting patient.");
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient found.</div>;

  const qrData = `Name: ${patient.name}
NIC: ${patient.nic} // Include NIC in QR code data
Address: ${patient.address}
Date of Birth: ${new Date(patient.dob).toLocaleDateString()}
Contact Number: ${patient.contactno}
Email Address: ${patient.email}
Insurance Provider: ${patient.insuranceprovider}
Policy Number: ${patient.policyno}
Medical Information: ${patient.medicalinfos.split(", ").join(", ")}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-7 max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center mb-7">Patient Profile</h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {successMessage && <div aria-live="polite" className="text-green-600 text-center mb-4">{successMessage}</div>}

        {/* Patient details section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="flex flex-col mb-4">
            <label className="font-medium">Name:</label>
            {isEditing ? (
              <input type="text" name="name" value={editedPatient.name} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.name}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">NIC:</label>
            {isEditing ? (
              <input type="text" name="nic" value={editedPatient.nic} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.nic}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Address:</label>
            {isEditing ? (
              <input type="text" name="address" value={editedPatient.address} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.address}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Date of Birth:</label>
            <p>{new Date(patient.dob).toLocaleDateString()}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Contact Number:</label>
            {isEditing ? (
              <input type="text" name="contactno" value={editedPatient.contactno} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.contactno}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Email Address:</label>
            <p>{patient.email}</p>
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Insurance Provider:</label>
            {isEditing ? (
              <input type="text" name="insuranceprovider" value={editedPatient.insuranceprovider} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.insuranceprovider}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Policy Number:</label>
            {isEditing ? (
              <input type="text" name="policyno" value={editedPatient.policyno} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <p>{patient.policyno}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="font-medium">Medical Information:</label>
            {isEditing ? (
              <input type="text" name="medicalinfos" value={editedPatient.medicalinfos} onChange={handleEditChange} className="border rounded px-2 py-1" />
            ) : (
              <ul className="list-disc ml-5">
                {patient.medicalinfos.split(", ").map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Edit button */}
          <div className="flex justify-center mb-4">
            {isEditing ? (
              <button onClick={saveEditedDetails} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit</button>
            )}
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center mb-4">
            <label className="font-medium">QR Code:</label>
            <QRCodeSVG value={qrData} size={128} />
          </div>

          {/* PDF generation button */}
          <div className="flex justify-center mb-4">
            <button onClick={generatePDF} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Download PDF</button>
          </div>

          {/* Email button */}
          <div className="flex justify-center mb-4">
            <button onClick={handleEmail} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Email Patient Details</button>
          </div>

          {/* Delete button */}
          <div className="flex justify-center">
            <button onClick={() => handleDelete(patient._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Patient</button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PatientProfile;
