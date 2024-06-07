import React, { useState, useEffect } from 'react';
import '../styles/AdminHotelOwnerTable.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function AdminHotelOwnerTable() {
    const [rows, setRows] = useState([]);
    const [newOwner, setNewOwner] = useState({ first_name: '', last_name: '', role: 'owner' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;


    const handleNextPage = () => {
        if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

    useEffect(() => {
        fetch('http://localhost:8081/api/hotelOwners')
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error('Error fetching hotel owners:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`http://localhost:8081/api/hotelOwners/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    setRows(rows.filter(row => row.userID !== id));
                } else {
                    alert('Failed to delete hotel owner');
                }
            })
            .catch(error => console.error('Error deleting hotel owner:', error));
        }
    };

    const handleCreate = () => {
        if (window.confirm("Are you sure?")) {
            fetch('http://localhost:8081/api/hotelOwners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOwner),
            })
            .then(response => response.json())
            .then(data => {
                setRows([...rows, data]);
                setNewOwner({ first_name: '', last_name: '', role: 'owner' });
            })
            .catch(error => console.error('Error creating hotel owner:', error));
        }
    };

    return (
        <div>
            <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Number of Hotels</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map(row => (
                        <tr key={row.userID}>
                            <td>{row.userID}</td>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.numberOfHotels || 0}</td>
                            <td>
                                <button className='Delete-Button' onClick={() => handleDelete(row.userID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{position: 'fixed', left: '550px', fontSize: '30px'}}>
                <button style={{fontSize: '22px', borderTopLeftRadius:'15px',borderBottomLeftRadius:'15px', padding: '8px', border: '1px solid grey'}} onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <button style={{fontSize: '22px', borderTopRightRadius:'15px',borderBottomRightRadius:'15px', padding: '8px', border: '1px solid grey'}} onClick={handleNextPage} disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}>
                    Next
                </button>
            </div>
        </div>

            <div className="container" style={{ left: '270px', top: '625px', position: 'fixed' }}>
                <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                    <input
                        type="text"
                        className="text_box"
                        style={{ width: '200px' }}
                        placeholder="First Name"
                        value={newOwner.first_name}
                        onChange={(e) => setNewOwner({ ...newOwner, first_name: e.target.value })}
                        required
                    />
                    <label htmlFor="Name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> First Name</label>
                </div>
                <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                    <input
                        type="text"
                        className="text_box"
                        style={{ width: '200px' }}
                        placeholder="Last Name"
                        value={newOwner.last_name}
                        onChange={(e) => setNewOwner({ ...newOwner, last_name: e.target.value })}
                        required
                    />
                    <label htmlFor="LastName" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Last Name</label>
                </div>
                <button className='Create-Owner-Button' onClick={handleCreate}>
                    Create Hotel Owner
                </button>
            </div>
        </div>
    );
}

export default AdminHotelOwnerTable;