import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const PatientManagement = () => {
    const [patients, setPatients] = useState([]); // State to hold patient records
    const [error, setError] = useState(null);
    const [searchNic, setSearchNic] = useState(""); // State to hold search input for NIC
    const [searchedPatient, setSearchedPatient] = useState(null); // State to hold searched patient

    useEffect(() => {
        fetchPatients();
    }, []);

    const navigate = useNavigate(); // Function to fetch patient records
    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:8080/patients"); // Replace with your API endpoint
            setPatients(response.data);
        } catch (error) {
            setError("Failed to fetch patient records.");
        }
    };

    const handleRegisterPatient = () => {
        navigate('/add-patient');
    };

    const handleSearch = () => {
        const patient = patients.find(p => p.nic === searchNic); // Search by NIC
        if (patient) {
            setSearchedPatient(patient);
        } else {
            setSearchedPatient(null);
            alert("Patient not found.");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Section for viewing patient records */}
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Patient Records</h2>

                <div className="mb-4 text-center flex justify-center">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mx-2">Scan QR</button>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Enter NIC"
                            value={searchNic}
                            onChange={(e) => setSearchNic(e.target.value)}
                            className="border rounded px-3 py-2"
                        />
                        <button onClick={handleSearch} className="bg-green-500 text-white py-2 px-4 rounded ml-2">Search</button>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <button onClick={handleRegisterPatient} className="bg-green-500 text-white py-2 px-4 rounded">Register New Patient</button>
                </div>

                {patients.length === 0 ? (
                    <div className="text-center text-gray-500">No patient records available.</div>
                ) : (
                    <table className="table-auto w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Address</th>
                                <th className="border px-4 py-2">Date of Birth</th>
                                <th className="border px-4 py-2">Contact No</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">NIC</th> {/* Column for NIC */}
                                <th className="border px-4 py-2">Insurance Provider</th>
                                <th className="border px-4 py-2">Policy No</th>
                                <th className="border px-4 py-2">Medical Information</th>
                                <th className="border px-4 py-2">Profile</th> {/* Column for profile */}
                            </tr>
                        </thead>
                        <tbody>
                            {searchedPatient ? (
                                <tr key={searchedPatient._id}>
                                    <td className="border px-4 py-2">{searchedPatient.name}</td>
                                    <td className="border px-4 py-2">{searchedPatient.address}</td>
                                    <td className="border px-4 py-2">{new Date(searchedPatient.dob).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{searchedPatient.contactno}</td>
                                    <td className="border px-4 py-2">{searchedPatient.email}</td>
                                    <td className="border px-4 py-2">{searchedPatient.nic}</td> {/* Displaying NIC */}
                                    <td className="border px-4 py-2">{searchedPatient.insuranceprovider}</td>
                                    <td className="border px-4 py-2">{searchedPatient.policyno}</td>
                                    <td className="border px-4 py-2">{searchedPatient.medicalinfos}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <a href={`/patient-profile/${searchedPatient._id}`}>
                                            <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer" />
                                        </a>
                                    </td>
                                </tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient._id}>
                                        <td className="border px-4 py-2">{patient.name}</td>
                                        <td className="border px-4 py-2">{patient.address}</td>
                                        <td className="border px-4 py-2">{new Date(patient.dob).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{patient.contactno}</td>
                                        <td className="border px-4 py-2">{patient.email}</td>
                                        <td className="border px-4 py-2">{patient.nic}</td> {/* Displaying NIC */}
                                        <td className="border px-4 py-2">{patient.insuranceprovider}</td>
                                        <td className="border px-4 py-2">{patient.policyno}</td>
                                        <td className="border px-4 py-2">{patient.medicalinfos}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <a href={`/patient-profile/${patient._id}`}>
                                                <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer" />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PatientManagement;
