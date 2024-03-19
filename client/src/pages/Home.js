import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import {toast} from "react-toastify";
import axios from "axios";
import { CSVLink } from 'react-csv';


const Home = () => {
    const [data, setData] = useState([]);
    console.log(data);


    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);


    const deleteUser = (id) => {
        if(window.confirm("confirm delete..?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("deleted successfully");
            setTimeout(() => loadData(), 500); 
        }
    };

    

  return (
    <div style={{marginTop: "150px"}}>

        <Link to="/addContact">
        <button className='btn btn-contact'>Add contact</button>
        </Link>

        <CSVLink data={ data }>
            <button className='btn btn-success'>Export</button></CSVLink>

       <table className='styled-table'>
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>id</th>
                <th style={{textAlign: "center"}}>Name</th>
                <th style={{textAlign: "center"}}>LicenseNumber</th>
                <th style={{textAlign: "center"}}>BirthDate</th>
                <th style={{textAlign: "center"}}>Age</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index)=>{
                
                return (
                    <tr key={item.id}>
                        <th scope='row'>{index+1}</th>
                        <td>{item.Name}</td>
                        <td>{item.LicenseNumber}</td>
                        <td>{item.BirthDate}</td>
                        <td>{item.Age}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                            <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete" onClick={() => deleteUser(item.id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
       </table>
    </div>
  )
}

export default Home;