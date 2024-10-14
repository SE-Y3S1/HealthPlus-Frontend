import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();

    const handleScanQR = () => {
        // Logic for scanning QR code
        alert("QR Code Scan initiated");
    };

    const handleFindPatientManually = () => {
        // Logic for finding a patient manually
        navigate('/patient-management');
    };

    const handleRegisterPatient = () => {
        navigate('/patient-management');
    };

    const handleDataAnalysis = () => {
        // Logic for data analysis
        alert("Data Analysis initiated");
    };

    const handleReporting = () => {
        // Logic for reporting
        alert("Reporting initiated");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <button
                    onClick={handleScanQR}
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Scan QR Code
                </button>
                <button
                    onClick={handleFindPatientManually}
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Find Patient Manually
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <button
                    onClick={handleRegisterPatient}
                    className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Patient Management
                </button>
                <button
                    onClick={handleDataAnalysis}
                    className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Data Analysis
                </button>
                <button
                    onClick={handleReporting}
                    className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Reporting
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
