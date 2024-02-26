import React, { useState } from 'react';
import "./Navbar.css";
import Button from '@mui/material/Button';
import axios from "axios";

const Navbar = ({ onFileUpload }) => {
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }
        handleSubmit(file);
    };

    const handleSubmit = async (file) => {
        const formData = new FormData();
        formData.append('csvFile', file);
        console.log(formData)

        try {
            const response = await axios.post('http://localhost:5000/csv/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('File uploaded successfully');
                setUploaded(true);
                onFileUpload(); // Call the onFileUpload function passed from the Home component
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="Navbar">
            <input type="file" id="csvFileInput" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
            <label htmlFor="csvFileInput">
                <Button variant="outlined" component="span">Import CSV</Button>
            </label>
        </div>
    );
}

export default Navbar;
