import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const PatientContext = createContext();

// Create the provider component
export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient data when the provider mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/patients');
        setPatients(response.data);
      } catch (error) {
        setError('Error fetching patient details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Add other functionality for managing patient state
  const updatePatient = async (id, updatedPatient) => {
    try {
      await axios.put(`http://localhost:8080/patients/${id}`, updatedPatient);
      setPatients((prevPatients) => prevPatients.map((p) => (p._id === id ? updatedPatient : p)));
    } catch (error) {
      setError('Error updating patient details.');
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/patients/${id}`);
      setPatients((prevPatients) => prevPatients.filter((p) => p._id !== id));
    } catch (error) {
      setError('Error deleting patient.');
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        error,
        updatePatient,
        deletePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
