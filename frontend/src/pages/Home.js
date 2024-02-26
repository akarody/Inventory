import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from '../components/Navbar';
import DataTable from '../components/Datatable';
import axios from "axios";

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/view/cars');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFileUpload = () => {
        // Trigger re-render by fetching data again
        fetchData();
    };

    return (
        <div className='Home'>
            <Navbar onFileUpload={handleFileUpload} />
            <DataTable data={cars} />
        </div>
    );
}

export default Home;
