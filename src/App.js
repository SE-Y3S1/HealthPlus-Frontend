import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientDetails from "./pages/PatientDetails";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import PatientProfile from "./pages/patient_profile"; // Ensure correct casing
import Header from "./components/header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/patient_management";
import './index.css'; // Adjust the path as necessary

function App() {
  const [currentPatientId, setCurrentPatientId] = useState(null); // Manage current patient ID

  return (
    <Router>
      <div>
        <Header  /> 
        {}
        <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/patient-management" element={<PatientManagement />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/edit/:patientId" element={<EditPatient setCurrentPatientId={setCurrentPatientId} />} />
          <Route path="/patient-details" element={<PatientDetails />} />
          <Route path="/patient-profile/:id" element={<PatientProfile setCurrentPatientId={setCurrentPatientId} />} />
        </Routes>
        <Footer/>
      </div>
      
    </Router>
  );
}

export default App;
