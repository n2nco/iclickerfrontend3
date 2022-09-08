/////OLD NOT IN USE


import React, {useContext} from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Stack from "@mui/material/Stack";

import SelectionContainer from "./SelectionContainer";

import { StoreContext } from "./Store";

import { writeNewOrder } from './api'

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  // institution: yup
  //   .string("Enter your institution")
  //   .min(3, "Instituton should be a min of 3 characters")
  //   .required("Institution is required")
});

const CourseInput = () => {
  return (
    <div className="App" style={{ display: "inline-flex", paddingTop: "90px" }} >
      {/* <Credentials> </Credentials>  */}

      <label style={{fontWeight:'Normal', lineHeight: 3}}>Enter your course details:</label>
      <Formik
        initialValues={{ name: "", email: "" }}
        //  validationSchema={validationSchema}
        onSubmit={async (values) => {
          // await new Promise((resolve) => setTimeout(resolve, 500));
          console.log('values')
          console.log(values)
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div style={{alignItems:'flex-start'}}>
          <label htmlFor="firstName" style={{ padding: "4px"}}>
            Institution: &nbsp;
          </label>
          <TextField name="Institution" type="text" placeholder="e.g UBC" />
          <p style={{margin: '10px'}}></p>
          <label htmlFor="courseCode" style={{ padding: "4px" }}>
            Course Code:  &nbsp;
         </label>
          <Field as="select" name="color" style={{minHeight: '22px'}} >
            <option value="red">Fall Semester (1)</option>
            <option value="green">Winter Semester (2)</option>
            <option value="green">Full Year Course</option>
            <option value="blue">Summer Session 1</option>
            <option value="blue">Summer Session 2</option>
          </Field>
          <label htmlFor="timeZone" style={{ paddingLeft: "4px", paddingRight: "4px" }}>
            Time Zone:  &nbsp;
          </label>
          <Field as="select" name="timeZone" style={{minHeight: '22px'}} >
            <option value="PST">PST (Pacific)</option>
            <option value="EST">EST (Eastern)</option>
            <option value="CST">CST (Central)</option>
            <option value="MSC">MST (Mountain)</option>
            <option value="UCT"> UTC (select UTC for all other timezones - please convert to UTC)</option>
          </Field>
    
          </div>

               {/* date & times selection
          <SelectionContainer></SelectionContainer>  */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

const InputForm = () => {
  var store = useContext(StoreContext)
  global.store = store
  const formik = useFormik({
    initialValues: {
      email: "michael.green@ubc.ca",
      password: "foobar21"
    },
    // validationSchema: validationSchema,


    onSubmit: async (values) => {
     // alert(JSON.stringify(store?.state, null, 2));
      
      console.log("values")
      console.log(values)
      console.log('store state from input form')
      console.log(store)
      alert(JSON.stringify(store?.state, null, 2));
      await writeNewOrder()
    }
  });

  return (
    <div>
      <Stack
        alignItems="center"
        direction="column"
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        minWidth="100vw"
        spacing={4}
      >
        <CourseInput></CourseInput>
        <SelectionContainer></SelectionContainer> 

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="iClicker Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="iClicker Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Stack>
    </div>
  );
};

// export var Checkbox = ({ form, name, label, disabled, id, className }: Props) => {
//   return (
  
//       // You need to include onChange
//       <>
//       <input type="checkbox" id={name} name={name} onChange={(e) => e}/>
//       <label htmlFor={name}> {label}</label>
//       <ErrorMessage component="div" className="input-error" name="checkbox" />
 
//     </>
//   );
// };


export default InputForm;