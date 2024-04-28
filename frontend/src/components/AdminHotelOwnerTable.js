import React from 'react';
import '../styles/AdminHotelOwnerTable.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';


function AdminHotelOwnerTable() {

    const rows = [
        { id: 1, name: 'Öykü', surname: 'Sucuoğlu', numberOfHotel: 3 },
        { id: 2, name: 'Yağmur Fatma', surname: 'Birinci', numberOfHotel: 1 },
        { id: 3, name: 'Helin', surname: 'Arslan', numberOfHotel: 7 },
        { id: 4, name: 'Emin Enes', surname: 'Oğuz', numberOfHotel: 3 }
    ];

    const ConfirmToDelete = () => {
        window.confirm("Are you sure?");
    }
    
    return (
        <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Number of Hotel</th>
                  <th>Action</th>
            </tr>
            </thead>

            <tbody>
                {rows.map(row => (
                    <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.surname}</td>
                    <td>{row.numberOfHotel}</td>
                    <td>
                    <button className='Delete-Button' onClick={(ConfirmToDelete)}>
                        Delete
                    </button> 
                    </td>
                    </tr> 
                ))}
            </tbody>
            </table>

            <div className="container" style={{top: '150px', position: 'relative'}}>
            <div className="text_group field" style={{ width: '200px', left: '-40px', top: '-70px' }}>
                <input type="input" className="text_box" style={{ width: '200px'}} placeholder="First Name" name="Name" id='Name' required />
                <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> First Name</label>
            </div>
            <div className="text_group field" style={{ width: '200px', left: '0px', top: '-70px' }}>
                <input type="input" className="text_box" style={{ width: '200px'}} placeholder="Last Name" name="Last Name" id='LastName' required />
                <label htmlFor="name" className="group_label"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Last Name</label>
            </div>
            <button className='Create-Owner-Button' onClick={(ConfirmToDelete)}>
                        Create Hotel Owner
                    </button> 
            </div>
        </div>
      );
    }

  export default AdminHotelOwnerTable;