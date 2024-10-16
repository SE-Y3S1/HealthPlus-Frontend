import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PatientContext } from '../context/patientContext';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import user from '../assets/user.jpg';

const PatientProfile = () => {
  const { id } = useParams();
  const { patients, updatePatient, deletePatient, loading, error } = useContext(PatientContext); // Use context
  const [patient, setPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const selectedPatient = patients.find((p) => p._id === id);
    if (selectedPatient) {
      setPatient(selectedPatient);
      setEditedPatient(selectedPatient);
    }
  }, [id, patients]);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Patient Profile\n\n`, 10, 10);
    doc.text(`Name: ${patient.name}`, 10, 20);
    doc.text(`NIC: ${patient.nic}`, 10, 30);
    doc.text(`Address: ${patient.address}`, 10, 40);
    doc.text(`Date of Birth: ${new Date(patient.dob).toLocaleDateString()}`, 10, 50);
    doc.text(`Contact Number: ${patient.contactno}`, 10, 60);
    doc.text(`Email Address: ${patient.email}`, 10, 70);
    doc.text(`Insurance Provider: ${patient.insuranceprovider}`, 10, 80);
    doc.text(`Policy Number: ${patient.policyno}`, 10, 90);
    doc.text(`Medical Information: ${patient.medicalinfos.split(', ').join(', ')}`, 10, 100);
    doc.save('patient-profile.pdf');
  };

  const handleEmail = () => {
    if (patient && patient.email) {
      window.location.href = `mailto:${patient.email}`;
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const saveEditedDetails = () => {
    updatePatient(id, editedPatient);
    setPatient(editedPatient);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deletePatient(id);
    navigate('/patient-management');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient found.</div>;

  const qrData = `Name: ${patient.name}
NIC: ${patient.nic}
Address: ${patient.address}
Date of Birth: ${new Date(patient.dob).toLocaleDateString()}
Contact Number: ${patient.contactno}
Email Address: ${patient.email}
Insurance Provider: ${patient.insuranceprovider}
Policy Number: ${patient.policyno}
Medical Information: ${patient.medicalinfos.split(', ').join(', ')}`;

return (
  <div>
    <h2 className="text-3xl font-bold text-center mt-5 ">
{isEditing ? "Edit Patient Profile" : "Patient Profile"}
</h2>

    <div className="flex items-center justify-center min-h-screen bg-white">

      <div className="bg-white rounded-lg p-7 max-w-lg w-full">


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


        </div>

      </div>
      <div className="bg-white rounded-lg p-7 max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <img src={user} className="h-[200px]" />
        </div>
        {/* QR code */}

        <div className="flex flex-col items-center mb-4">
          <label className="font-medium">QR Code:</label>
          <QRCodeSVG value={qrData} size={128} />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 max-w-sm mx-auto mb-6">
        <h3 className="text-xl font-semibold text-center mb-4">Appointments</h3>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h4 className="text-lg font-medium">Upcoming Appointment</h4>
          <p><span className="font-medium">Date: 2024.11.16</span> </p>
          <p><span className="font-medium">Time: 9 AM</span> </p>
          <p><span className="font-medium">Doctor: Dr. Mike Angelo</span></p>
          <p><span className="font-medium">Specialization: Cardiologistc</span></p>
        </div>

        {/* Show All Appointments Button */}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Show All Appointments
          </button>
        </div>
      </div>
      </div>

      

    </div>
    {/* Edit button */}
    <div className="flex justify-center mb-4">
      {isEditing ? (
        <button onClick={saveEditedDetails} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit</button>
      )}
    </div>
    <div className="flex items-center justify-center mx-3">
      {/* PDF generation button */}
      <div className="flex justify-center mb-4 mx-3">
        <button onClick={generatePDF} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Download PDF</button>
      </div>

      {/* Email button */}
      <div className="flex justify-center mb-4 mx-3">
        <button onClick={handleEmail} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Email Patient Details</button>
      </div>

      {/* Delete button */}
      <div className="flex justify-center mb-4">
        <button onClick={() => handleDelete(patient._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete Patient</button>
      </div>
    </div>
  </div>
);
};

export default PatientProfile;
