# Car Inventory Management System

This project is a car inventory management system that allows users to upload CSV files containing car data and view the inventory.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Upload CSV](#upload-csv)
  - [View Cars](#view-cars)

## Installation

1. Clone the repository:
2. Navigate to the project directory and then backend folder(cd backend)
3. Install dependencies by running **npm install** in terminal
4. run **npm start**
5. Navigate to the frontend folder in a new terminal
6. Run **npm install** and then **npm start**


## API Endpoints

### Upload CSV

- **Endpoint**: `/csv/upload-csv`
- **Method**: POST
- **Description**: This endpoint is used to upload a CSV file containing car data. The CSV file should include columns such as part number, name, brand, model, engine, location, stock, unit, rate, value, remarks, and car name. The backend server processes the uploaded CSV file and stores the car data in the database.

### View Cars

- **Endpoint**: `/view/cars`
- **Method**: GET
- **Description**: This endpoint is used to fetch the list of cars stored in the database. It returns a JSON array containing details of all the cars in the inventory, including their part number, name, brand, model, engine, location, stock, unit, rate, value, remarks, and car name.