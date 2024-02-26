import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from '../components/Navbar'
import DataTable from '../components/Datatable'
import axios from "axios"
const Home = () => {
    const [cars, setCars] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/view/cars');
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (

        <div className='Home'>
            <Navbar />

            <DataTable data={cars} />


        </div>
    )
}

export default Home