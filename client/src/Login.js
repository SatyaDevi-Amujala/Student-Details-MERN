import {React,useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Login = () => {
   
    let navigate=useNavigate();
    const [item,setItem]=useState({
        email:"",
        password:"",
    })
    const changeHandler=(e)=>{
       setItem( {...item, [e.target.name]:e.target.value})
    }
    const submitHandler =(e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",item).then(
            res=>{
                if(res.data=="Login"){
                    return navigate('/Dashboard',{state:{data :"login"}} );
                }
                else
                alert(res.data)
            }
        )}
  return (
    <div>
    <center>
      <div class=" form-control cen">
      <h1>
          Login
      </h1>
      <form onSubmit={submitHandler}>
          <p class="mar">Email
          <input className="form-control w-80" type="email" onChange={changeHandler} placeholder="Enter Email"  name="email"/></p>
          <p class="mar">password
          <input  className="form-control w-80" type="password" onChange={changeHandler} placeholder="Enter Password"  name="password" /></p>
          <input className="btn btn-primary pad" type="submit" value="login"/>
          <p>Not a member ? <Link to='/'>Register</Link></p>
      </form>
      </div>
     
    </center>
  </div>
  )
}

export default Login






 
    
