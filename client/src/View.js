import { React, useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom';
import axios from "axios";

const View = () => {
    let params=useParams()
    let id=params.idnum;
    const [onedata,setOnedata]=useState({});
    useEffect(()=>{
axios.get(`http://localhost:5000/getitem/${id}`).then(
    arr=>{setOnedata(arr.data);
    console.log("arrdata",arr.data)}
)
    },[])
   const{fname,lname,idnum,email,pswd,gender,year,branch,stphn,ptphn}=onedata;
    console.log("onedata",onedata)
  return (
    <div>
    
        <center>
        <h1 style={{padding:"40px"}}> Welcome {lname}{" "}{fname}</h1>
        <div style={{width:"50%", borderRadius:"10px" ,border:"2px solid gray", padding:"60px 0"}}>
        <table>
            <tr>
                <td><b>Name</b></td>
                <td>  : {lname} {" "}{fname}</td>
            </tr>
            <tr>
                <td><b>ID Number</b></td>
                <td>  : {idnum}</td>
            </tr>
            <tr>
                <td><b>Email</b></td>
                <td>  : {email}</td>
            </tr>
            <tr>
                <td><b>Gender</b></td>
                <td>  : {gender}</td>
            </tr>
            <tr>
                <td><b>Year</b></td>
                <td>  : {year}</td>
            </tr>
            <tr>
                <td><b>Branch</b></td>
                <td>  : {branch}</td>
            </tr>
            <tr>
                <td><b>Student Phone Number  </b></td>
                <td>  : {stphn}</td>
            </tr>
            <tr>
                <td><b>Parent Phone Number  </b></td>
                <td>  : {ptphn}</td>
            </tr>
    
    </table>
    <Link style={{margin:"20px"}} to={'/Dashboard'}className="btn btn-primary " >Back</Link>
    </div></center>
    </div>
  )
}

export default View
