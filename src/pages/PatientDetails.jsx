import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { QRCodeSVG } from "qrcode.react"; 
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";

const PatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrData, setQrData] = useState("");

  // Fetch all patient details when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/patients");
        setPatients(response.data);
      } catch (error) {
        setError("Error fetching patient details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Handle deleting a patient
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/patients/${id}`);
        setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== id));
      } catch (error) {
        setError("Error deleting patient.");
        console.error(error);
      }
    }
  };

  // Download patient details as PDF
  const downloadDetails = (patient) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Name: ${patient.name}`, 10, 10);
    doc.text(`Address: ${patient.address}`, 10, 20);
    doc.text(`Date of Birth: ${new Date(patient.dob).toLocaleDateString()}`, 10, 30);
    doc.text(`Contact Number: ${patient.contactno}`, 10, 40);
    doc.text(`Email Address: ${patient.email}`, 10, 50);
    doc.text(`Insurance Provider: ${patient.insuranceprovider}`, 10, 60);
    doc.text(`Policy Number: ${patient.policyno}`, 10, 70);
    doc.text(`Medical Information: ${patient.medicalinfos.split(", ").join(", ")}`, 10, 80);
    doc.save(`${patient.name}_details.pdf`);
  };

  // Handle QR code generation
  const handleQrCode = (patient) => {
    // Create a URL that points to the patient's details page
    const patientProfileUrl = `http://localhost:3000/patient-profile/${patient._id}`;
    setQrData(patientProfileUrl); // Set the QR code data to the URL
  };

  // Handle loading and error states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!patients.length) return <div className="text-center">No patient details available.</div>;

  return (
    <div className="flex flex-col p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient._id} className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <Link to={`/patient-profile/${patient._id}`} className="bg-teal-700 text-white py-1 px-3 rounded hover:bg-teal-600">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                View Patient Profile
              </Link>
            </div>
            <h3 className="text-lg font-semibold">Name: {patient.name}</h3>
            <p className="mt-2"><strong>Address:</strong> {patient.address}</p>
            <p className="mt-1"><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
            <p className="mt-1"><strong>Contact Number:</strong> {patient.contactno}</p>
            <p className="mt-1"><strong>Email Address:</strong> {patient.email}</p>
            <p className="mt-1"><strong>Insurance Provider:</strong> {patient.insuranceprovider}</p>
            <p className="mt-1"><strong>Policy Number:</strong> {patient.policyno}</p>
            <div className="mt-2">
              <strong>Medical Information:</strong>
              <ul className="list-disc ml-5">
                {patient.medicalinfos.split(", ").map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link to={`/edit/${patient._id}`} className="bg-blue-300 text-white py-1 px-3 rounded hover:bg-teal-600">
                Edit Details
              </Link>
              <button onClick={() => downloadDetails(patient)} className="bg-teal-500 text-white py-2 px-3 rounded hover:bg-teal-600">
                Download Details
              </button>
              <button onClick={() => handleQrCode(patient)} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                Show QR Code
              </button>
              <button onClick={() => handleDelete(patient._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {qrData && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">QR Code:</h3>
          <div className="flex justify-center mt-2">
            <QRCodeSVG value={qrData} size={128} />
          </div>
          <p className="text-center mt-2 text-gray-500">Scan the QR code to view patient details</p>
        </div>
      )}

      <Footer /> 
    </div>
  );
};

export default PatientDetails;
