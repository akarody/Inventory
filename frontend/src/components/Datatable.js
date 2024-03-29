import React, { useState } from 'react';
import "./Datatable.css"

function DataTable({ data }) {

    const [showDialog, setShowDialog] = useState(false);

    const handleRowClick = () => {
        console.log("hello")
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        console.log("hello")
        setShowDialog(false);
    };
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Part Number</th>
                        <th>Alt Part Number</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Engine</th>
                        <th>Location A</th>
                        <th>Location A Stock</th>
                        <th>Location B</th>
                        <th>Location B Stock</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Value</th>
                        <th>Remarks</th>
                        <th>Car Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr onClick={() => handleRowClick()} key={index}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.part_number}</td>
                            <td>{item.alt_part_number}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.engine}</td>
                            <td>{item.location_a}</td>
                            <td>{item.location_a_stock}</td>
                            <td>{item.location_b}</td>
                            <td>{item.location_b_stock}</td>
                            <td>{item.unit}</td>
                            <td>{item.rate}</td>
                            <td>{item.value}</td>
                            <td>{item.remarks}</td>
                            <td>{item.car_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-close" onClick={() => handleCloseDialog()}>close</div>
                    <div className="dialog-content">
                        <p>This is the content of the dialogue box.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DataTable;
