import React from "react";
import { Link } from "react-router-dom";
import {useFormik, Formik,Form,Field} from 'formik'
import * as Yup from 'yup';
import axios from "axios"
export default function Register(){

    //const validate = ((values) => {
    //    const errors = {};
    //    if (!values.username) {
    //        errors.username = 'Required'
    //    } else if (values.username.length < 3) {
    //        errors.username = 'Must be 3 characters or more';
    //    }
    //    if (!values.surname){
    //        errors.surname = "Required"
    //    } else if (values.surname.length < 4 )
    //        errors.surname ="Must be 4 character or more"
    //    if (!values.email){
    //        errors.email = "Required"
    //    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    //        errors.email = 'Invalid email address';
    //    }
    //    if (!values.password){
    //        errors.password ="Required"
    //    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    //        errors.password = 'Invalid password ';
    //    }
    //    if(!values.confpassword){
    //        errors.confpassword ="Required"
    //    }else if (values.password !== values.confpassword){
    //        errors.confpassword ="This password "
    //    }
    //    return errors;
    //})

    const formik = useFormik ( { 
        initialValues:{
            username:"",
            surname:"",
            email:"",
            password:"",
            confpassword:""
        },
        validationSchema:Yup.object({
            username: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            surname: Yup.string()
                .min(4, 'Must be 4 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('No password provided.') 
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
            confpassword:Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
          }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            window.location.href = "/login"
            axios.post("http://localhost:8080/register",{
                username:formik.values.username,
                surname:formik.values.surname,
                email:formik.values.email,
                password:formik.values.password,
                confpassword:formik.values.confpassword
            })
            .then(res=> res.data )
		    .catch(err => console.log(err))
            },
    })
    
    return(
        <div className="Main_Content" >
            <div className="Register_Content">
                <div ><Link to ="/"><h3>Home</h3></Link></div>
                <div className="Login_main"> <h1>REGISTER to APP</h1></div>
            </div>
            <div className="log_reg">
                <div className="register"><Link to="/register">Register</Link></div>
                <div className="login"><Link to = "/login">Login</Link></div>
            </div>
            
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlform="username">Username</label>
                    <Field type="text" name="username" placeholder="UserName"  
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? <div className="errors">{formik.errors.username}</div> : null}

                    <label htmform="surname">Surname</label>
                    <Field type ="text" name="surname" placeholder="Surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.surname && formik.errors.surname ? <div className="errors">{formik.errors.surname}</div> : null}

                    <label htmlform="email">Email</label>
                    <Field type ="email" name="email" placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div> : null}

                    <label htmlform="password">Password</label>
                    <Field type ="password" name="password" placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div> : null}

                    <label htmlform="confpassword">Confirm Password</label>
                    <Field type ="password" name="confpassword" placeholder="Confirm Password"
                        value={formik.values.confpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confpassword && formik.errors.confpassword ? <div className="errors">{formik.errors.confpassword}</div> : null}

                    <button type="submit" >Register</button>
                </Form>
            </Formik>
        </div>
    )
}