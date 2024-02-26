import React, { useState } from 'react'
import "./Navbar.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Navbar = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', file);
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/csv/upload-csv', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('File uploaded successfully');
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
                <Button variant="outlined" component="span" onClick={handleSubmit}>Import CSV</Button>
            </label>
        </div>
    );
}


export default Navbar