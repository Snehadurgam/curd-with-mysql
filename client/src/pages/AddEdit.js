import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./addedit.css";
import  axios from 'axios';
import { toast } from 'react-toastify';

// to intial the form data
const initialState = {
    Name: "",
    LicenseNumber: "",
    BirthDate: "",
    Age: "",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { Name, LicenseNumber, BirthDate, Age} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setState({...res.data[0]}));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Name || !LicenseNumber || !BirthDate || !Age) { //input is empty provide toast.error
            toast.error("please provide an input field");
        } else {
            if(!id) {
                axios.post("http://localhost:5000/api/post", {
                    Name,
                    LicenseNumber,
                    BirthDate,
                    Age
                }).then(() => {
                    setState({ Name: "", LicenseNumber: "", BirthDate: "", Age: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("contact added successfully");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    Name,
                    LicenseNumber,
                    BirthDate,
                    Age
                }).then(() => {
                    setState({ Name: "", LicenseNumber: "", BirthDate: "", Age: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("contact updated successfully");    
            }
            
           setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

  return (
    <div style={{marginTop: "100px"}}>
       <form style= {{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
       }}
         onSubmit={handleSubmit}
       >
           <lable htmlFor="Name">Name</lable>
           <input type="text" id="Name" name="Name" placeholder="yourname..." value={Name || ""} onChange={handleInputChange}/>

           <lable htmlFor="LicenseNumber">LicenseNumber</lable>
           <input type="LicenseNumber" id="LicenseNumber" name="LicenseNumber" placeholder="license no..." value={LicenseNumber || ""} onChange={handleInputChange}/>

           <lable htmlFor="BirthDate">BirthDate</lable>
           <input type="BirthDate" id="BirthDate" name="BirthDate" placeholder="your birth..." value={BirthDate || ""} onChange={handleInputChange}/>

           <lable htmlFor="Age">Age</lable>
           <input type="Age" id="Age" name="Age" placeholder="your age..." value={Age || ""} onChange={handleInputChange}/>
           
           <input type="submit" value={id ? "Update" : "Save"} />
           <Link to="/">
            <input type='button' value="Go Back"/>
           </Link>
       </form>
    </div>
  );
};

export default AddEdit;