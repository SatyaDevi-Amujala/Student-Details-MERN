import {React,useState,useEffect} from 'react';
import validator from 'validator';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

const Edit = () => {
        let navigate=useNavigate()
        let params=useParams()
        var id=params.id;
        const [data,setData]=useState({
            fname:"",
            lname:"",
            idnum:"",
            email:"",
            pswd:"",
            cpswd:"",
            gender:'',
            year:"",
            branch:"",
            stphn:"",
            ptphn:"",
        });
        
        var x=1
        useEffect(()=>{

            axios.get(`http://localhost:5000/getitem/${id}`).then(
                arr=>{setData(arr.data);
                //console.log("arrdata",arr.data
                if(x==2){
              alert("Please Re-Enter Phone Numbers")
            }x++
            }
            )
        },[])
        const { fname,lname,idnum,email,pswd,cpswd,gender,year,branch,stphn,ptphn}=data;
        console.log("datadata+",data)
       console.log('singledata:', fname,lname,idnum,email,pswd,cpswd,gender,year,branch,stphn,ptphn);

       
        const changeHandler=(e)=>{
          setData({...data,[e.target.name] : e.target.value})
 }
        const submitHandler=(e)=>{
          e.preventDefault();
          var letters = /^[A-Za-z]+$/;
          var idvalid = /^[0-9A-Za-z]+$/;
          var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
            if( !(fname.trim().split(" ") .join("").match(letters) && lname.trim().split(" ") .join("").match(letters))){
                alert("Enter Valid Name(Name should contain Alphabets Only)");}
          
            else if( !(idnum.trim().split(" ") .join("").match(idvalid))){
                alert("Enter Valid ID(ID should contain alphabets and numbers Only");}
            
              else if(!(validator.isEmail(email))){
              alert("Invalid Email");}
              
              else if(!(pswd.match(passw)))
                  alert("Invalid Password(Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter)");
                 
              else if(pswd!=cpswd)
                  alert("Passwods Not Match");
              else if(!(stphn.length==10) || !(/\d/.test(stphn)))
                  alert("Invalid Student Phone Number(contain  10 numbers only)" );
              else if(!(ptphn.length==10) || !(/\d/.test(ptphn)))
                  alert("Invalid Parent Phone Number(contain  10 numbers only)" );
             
        else{
              axios.put(`http://localhost:5000/editdata/${data._id}`,data).then(
                res=>{
                    if(res.data=="Updated"){
                        return navigate('/Login');
                    }
                    else
                    alert(res.data)
                }
              )}

            }
  return (
    <div>
      
   
 
<section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px;"}}>
          <div className="card-body p-4 p-md-5">
          <center>  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"> Student Updationtion Form</h3></center> 
            <form onSubmit={submitHandler} autoComplete="off">

              <div className="row">
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label" >First Name</label>
                    <input type="text"required onChange={changeHandler}  name="fname" value={fname} className="form-control form-control-lg" />
                    
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label"  >Last Name</label>
                    <input type="text" required onChange={changeHandler}   name="lname" value={lname} className="form-control form-control-lg"/>
                    </div>
                    </div>
              </div>

                  <div class="form-outline mb-4">
                  <label class="form-label" >IdNumber</label>
                <input type="text" required onChange={changeHandler} name="idnum" value={idnum} className="form-control" />
               </div>

               <div class="form-outline mb-4">
                  <label class="form-label" >Email</label>
                <input type="text"required onChange={changeHandler} name="email" value={email} className="form-control" />
                {(email.length != 0 && !(validator.isEmail(email)))?
                <span style={{color:"red"}}>Email Invalid</span>
                :''}
               </div>

               <div className="row">
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label" >Password</label>
                    <input type="password" required onChange={changeHandler}  name="pswd" value={pswd} className="form-control form-control-lg" />
            
                    {(pswd.length<8 && pswd.length!=0)?<span style={{color:"green"}}>* minmum 8 characters </span>:""}
                    {(pswd.length>15 && pswd.length!=0)?<span style={{color:"green"}}>* not exceeds 15 characters </span>:""}
                    {pswd.length !=0 && !(/[!@#$%^&*]/.test(pswd.trim().split(" ").join("")))?<span style={{color:"green"}}> * atleast 1 special character</span> :""}
                    { pswd.length!=0 && !(/[A-Z]/.test(pswd.trim().split(" ").join("")))?<span style={{color:"green"}}> * atleast 1 uppercase letter</span>:''}
                    {pswd.length !=0 && !(/[a-z]/.test(pswd.trim().split(" ").join("")))?<span style={{color:"green"}}> * atleast 1 lowercase letter</span>:''}
                    {pswd.length !=0 && !(/\d/.test(pswd.trim().split(" ").join("")))?<span style={{color:"green"}}> * atleast 1 number</span>:''}
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                  <label className="form-label"  >Confirm Password</label>
                    <input type="password" required className="form-control form-control-lg"onChange={changeHandler}  name="cpswd" value={cpswd} />
                    { (cpswd.length != 0 && cpswd.trim().split(" ").join("") != pswd.trim().split(" ").join(""))?<span style={{color:"red"}}>Passwords did not match </span>:""}
                    </div>
                    </div>
              </div>

              <h6 className="mb-0 me-4">Gender: </h6>

<div className="form-check form-check-inline mb-0 me-4">
  <input className="form-check-input" type="radio"  onClick={changeHandler} name="gender" 
    value="Female" />
  <label className="form-check-label">Female</label>
</div>

<div className="form-check form-check-inline mb-0 me-4">
  <input className="form-check-input" type="radio" onChange={changeHandler}  name="gender" 
    value="Male" />
  <label className="form-check-label" >Male</label>
</div>

<div className="form-check form-check-inline mb-0">
  <input className="form-check-input" type="radio" onChange={changeHandler} name="gender" 
    value="Other" />
  <label className="form-check-label" >Other</label>
</div><br/>
<br/>


<div className="row">
<div className="col-md-6 mb-4">

  <select className="select" name="year" onChange={changeHandler}>
    <option value="null">Year</option>
    <option value="E1">E1</option>
    <option value="E2">E2</option>
    <option value="E3">E3</option>
    <option value="E4">E4</option>
  </select>

</div>
<div className="col-md-6 mb-4">

  <select className="select" name="branch" onChange={changeHandler}>
    <option value="null">Department</option>
    <option value="Civil">Civil</option>
    <option value="CSE">CSE</option>
    <option value="ECE">ECE</option>
    <option value="EEE">EEE</option>
    <option value="Mechanical">Mechanical</option>
  </select>

</div>
</div>

              <div className="row">
                <div className="col-md-6 mb-4 pb-2">

                  <div className="form-outline">
                  <label className="form-label" >Student Phone</label>
                    <input type="tel" onChange={changeHandler}  name="stphn" value={stphn} className="form-control form-control-lg" />
                   {(stphn.length != 0 && (!(stphn.length==10) || !(/\d/.test(stphn))))?<span style={{color:'red'}}>Invalid Phone Number</span>:''}
                  </div>

                </div>
                <div className="col-md-6 mb-4 pb-2">

                  <div className="form-outline">
                  <label className="form-label" >Parent Phone</label>
                    <input type="tel"  onChange={changeHandler}  name="ptphn" value={ptphn} className="form-control form-control-lg" />
                    {(ptphn.length != 0 && (!(ptphn.length==10) || !(/\d/.test(ptphn))))?<span style={{color:'red'}}>Invalid Phone Number</span>:''}
                  
                  </div>

                </div> </div>
            

                <center><div className="mt-4 pt-2">
                <Link style={{margin:"20px"}}  to={'/Dashboard'}className="btn btn-primary btn-lg " >Back</Link>
              <input className="btn btn-primary btn-lg" type="submit" value="Update" />
             
               </div><br/>
               </center>
             

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>

  )
}

export default Edit

