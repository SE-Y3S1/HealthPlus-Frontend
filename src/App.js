import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientDetails from "./pages/PatientDetails";
import AddPatient from "./pages/AddPatient"
import EditPatient from "./pages/EditPatient";
import './index.css'; // Adjust the path as necessary

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/patient-details" element={<PatientDetails />} />
        <Route path="/add-patient" element={<AddPatient/>}/>
        <Route path="/edit/:patientId" element={<EditPatient />} />
       
      </Routes>
    </div>
  </Router>
  );
}

export default App;
