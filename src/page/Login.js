import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import {useFormik, Formik,Form,Field} from 'formik'
import axios from "axios"

export default function Login(){
    const [user,setUser] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8080/userall")
        .then((response) => {
            const allUsers = response.data.user
            setUser (allUsers)
            console.log(allUsers);
            
        })
        .catch(function (error) {
            console.log(error);
        })
        
    },[])
    //const allUser = ()=>{
    //    axios.get("http://localhost:8080/userall")
    //    .then((response) => {
    //        const allUsers = response.data.user
    //        
    //        console.log(allUsers);
    //        
    //    })
    //    .catch(function (error) {
    //        console.log(error);
    //    })
    //}
    const validate = ((values) => {
        const errors = {};
        
        if (!values.email) {
            errors.email = 'Required';
        } 
        if (!values.password) {
            errors.password = 'Required';
        } 
        return errors;
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            
            const sinIn = user.filter(elem => elem.email === formik.values.email && elem.password === formik.values.password)

            if(sinIn.length > 0 ){
                axios.post("http://localhost:8080/login",{
                email:formik.values.email,
                password:formik.values.password
                })
                .then(res=>console.log(res.data))
                .catch(err => console.log(err))
                window.location.href = "/"
            }
        },
    })
    
    
    return(
        <div className="Main_Content">
            <div className="Register_Content">
                <div ><Link to ="/"><h3>Home</h3></Link></div>
                <div className="Login_main"> <h1>LOGIN to APP</h1></div>
            </div>
            <div className="log_reg">
                <div className="register"><Link to="/register">Register</Link></div>
                <div className="login"><Link to = "/login">Login</Link></div>
            </div>
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlform="email">Email</label>
                    <Field type ="email" name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <label htmform="password">Password</label>
                    <Field type ="password" name="password"
                        value={formik.values.password}
                        onChange ={formik.handleChange}
                        
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div> 
      
    )
}