import {React,useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './index.css'

const Dashboard = () => {
  let location=useLocation();  
    const [data,setData]=useState([{}]);
    const [searchid,setSearchid]=useState('');
    //const [sot,setSot]=useState([{}])
   
   
    
   useEffect(()=>{
    axios.get("http://localhost:5000/getdata").then(
  arr =>setData(arr.data))
  },[])
  //console.log("data===",data)
  const deleteHandler=(id)=>{
   // console.log("IDDDDD===",id);
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setData(arr.data)
    ); 
  }
 // const sortHandler=()=>{
   // console.log("SSSOOORT");
   // axios.get("http://localhost:5000/sortdata").then(
    //  arr =>{setSot(arr.data);})
 // }
  
  return (
   
    <div>
       {location.state.data=="login"?
      <center>
     <h1 style={{padding:"10px"}}>Student Details</h1>
     <Link style={{margin:"20px"}}  to={'/'}className="btn btn-primary " >Back</Link>
     <input style={{marginRight:"30px"}}type="search"  value={searchid}onChange={(e)=>setSearchid(e.target.value)}placeholder="Search by id"></input>
      <table style={{width:"70%", marginTop:"5%"}}>
      <tr>
        <th >No</th>
       <th>ID_Num</th>
       <th>Name</th>
     <th>Email</th>
       <th></th>
         <th></th>
         <th></th>
        </tr>
            {(searchid=='')?
        data.map(item =>
          
            <tr key={item.idnum}>
             
             <td>{data.indexOf(item)}</td>
             <td>{item.idnum}</td>
              <td>{item.fname+item.lname}</td>
              <td>{item.email}</td>
              <td><Link  to={`/View/${item.idnum}`} className="btn btn-info btn-sm" style={{margin:"10px 0"}}>View</Link></td>
              <td><Link  to={`/Edit/${item.idnum}`}className="btn btn-secondary btn-sm" >Edit</Link></td>
              <td><button  onClick={()=>deleteHandler(item._id)}className="btn btn-danger btn-sm">Delete</button></td>
              <hr></hr>
               </tr>
            ):
            data.filter(item =>item.idnum.includes(searchid)).
            map(item=>
              <tr key={item.idnum}>
               
               <td>{data.indexOf(item)}</td>
               <td>{item.idnum}</td>
                <td>{item.fname+item.lname}</td>
                <td>{item.email}</td>
                <td><Link  to={`/View/${item.idnum}`} className="btn btn-info btn-sm" style={{margin:"10px 0"}}>View</Link></td>
                <td><Link  to={`/Edit/${item.idnum}`}className="btn btn-secondary btn-sm" >Edit</Link></td>
                <td><button  onClick={()=>deleteHandler(item._id)}className="btn btn-danger btn-sm">Delete</button></td>
                <hr></hr>
                 </tr>
              )}
      </table>
      
      </center>:<center><h1>Please Login</h1></center>}
    </div>
  )
}

export default Dashboard
