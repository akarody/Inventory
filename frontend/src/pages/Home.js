import React from 'react'
import "./Home.css"
import Navbar from '../components/Navbar'

const Home = () => {
    const items = ['Part', 'Alt_Part', 'Name', 'Brand', 'Model', 'Engine', 'Car', 'Location A', 'Location A Stock', 'Location B', 'Location B Stock', 'Unit', 'Rate', 'Value', 'Remarks'];
    const listItems = items.map((item, index) => (
        <li key={index}>{item}</li>
    ));



    const cars = [
        {
            "Part #": "12345",
            "Alt. Part#": "67890",
            "Name": "Car Name 1",
            "Brand": "Brand Name 1",
            "Model": "Car Model 1",
            "Engine": "Car Engine 1",
            "Car location A": "Location A",
            "LOCATION A STOCK": 10,
            "LOCATION B": "Location B",
            "LOC B STOCK": 20,
            "Unit": "Piece",
            "Rate": 50,
            "Value": 500,
            "Remarks": "Some remarks 1"
        },
        {
            "Part #": "54321",
            "Alt. Part#": "09876",
            "Name": "Car Name 2",
            "Brand": "Brand Name 2",
            "Model": "Car Model 2",
            "Engine": "Car Engine 2",
            "Car location A": "Location C",
            "LOCATION A STOCK": 15,
            "LOCATION B": "Location D",
            "LOC B STOCK": 25,
            "Unit": "Piece",
            "Rate": 60,
            "Value": 900,
            "Remarks": "Some remarks 2"
        }
    ];

    return (

        <div className='Home'>
            <Navbar />
            hello
            <ul className='list'>
                {listItems}
            </ul>
            {cars.map((car, index) => (
                <div key={index} className="car-item">
                    {Object.entries(car).map(([key, value], i) => (
                        <div key={i} className="car-detail">
                            <span className="key">{key}: </span>
                            <span className="value">{value}</span>
                        </div>
                    ))}
                </div>
            ))}

            <div className=''></div>


        </div>
    )
}

export default Home