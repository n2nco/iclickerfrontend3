//AUG 18th


import React from "react";
// import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, LinearProgress, Grid } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import SelectionContainer from "./SelectionContainer";
// import Grid from '@material-ui/core/Grid'



import {
  Box,
  Typography,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  FormControlLabel,
  TextField,
  Input
} from "@material-ui/core";
// import IconButton from '@mui/material/IconButton';

import { Stack, IconButton, InputAdornment} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { makeStyles } from "@mui/styles";
import { StoreContext } from "./Store";
import { createPaymentIntent} from './api'

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { NoEncryption } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px dashed gray",
    height: "8rem",
    display: "inline-grid",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    width: 300
  }
}));

const validationSchema = yup.object({
  institution: yup
    .string("Enter your institution/school")
    .min(2, "Institution should be of minimum 2 characters length")
    .required("Institution is required"),
  courseCode: yup
    .string("Enter your courseCode")
    .min(3, "Course Code should be of minimum 3 characters length")
    .required("Course Code is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required to automate your attendance. It is kept private."), 

});

const InputForm = () => {
  var store = React.useContext(StoreContext);
  let navigate = useNavigate() // for redirecting to homepage if edit after store.submitAlreadyPressed==true

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [editAfterSubmitShowing, setEditAfterSubmitShowing] = React.useState(false);

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {  //FOR TESTING - TODO: remove this
      institution: "e.g UBC",
      courseCode: "CPSC 101",
      courseTerm: "Fall",
      timezone: "PST",
      email: "anna.tory@ubc.ca",
      password: "placeholder",
      referrer: "michael.smith@uoft.ca"
      // contactEmail: "anna.tory@gmail.com"
    },
    validationSchema: validationSchema,


    //Api call #1 is where we get payment intent object with price and currency, and show stripe.
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // alert(JSON.stringify(values, null, 2));
      // if (store) alert(JSON.stringify(store?.state));

      store.dispatch({type: "submitAlreadyPressed", message: true})
      await store.dispatch({ type: "setFormValues", message: values }); //this does not complete until after the createPaymentIntent
      
      let orderState = await createPaymentIntent(values, store.state) 
      if (orderState.courseHoursPerWeek > 30) { toast.warn(`🦄  ${orderState.courseHoursPerWeek} hrs of coursetime per week selected - please double check this?`, { position: "top-right", autoClose: 10000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, }) }
      else if (orderState.courseHoursPerWeek > 60) { toast.warn(`🦄  ${orderState.courseHoursPerWeek} hrs of coursetime per week selected! this must be an error!`, { position: "top-right", autoClose: 10000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, }) }

      // console.log('response from  createPaymentIntent from inputForm onsumbit:')
      // alert(res)
      // console.log ('dispatch to store to set client secret:' + orderState?.clientSecret)
      store.dispatch({type: 'setClientSecret', message:  orderState?.clientSecret})
      store.dispatch({type: 'setPaymentIntent', message: orderState?.paymentIntent}) // THIS SETS AMOUNT (AND CURRENCY)

      setTimeout(() => setIsSubmitting(false), 3000);
      
    }
  });

  const onDivWrapperChange = (e) => {
   
    if (store.state.submitAlreadyPressed === true && editAfterSubmitShowing === false) {
      console.log("onDivWrapperChange - running with store.state.submitAlreadyPressed === true");
      console.log(e.target.value);
      toast.info(`Details modified during payment. Please start again.`, { position:  "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      setEditAfterSubmitShowing(true); // stops multiple toast messages
    
      //clean up
      localStorage.removeItem('state')
      //redirect to home
      setTimeout(() => window.location.reload(false), 2000)
    }

  }

  //for password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //for referrer
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //for contactEmail

  const [emailChecked, setEmailChecked] = React.useState(false);
  const handleEmailChecked = (event) => {
    setEmailChecked(!emailChecked);
  };
  const handleMouseDownEmail = (event) => {
    event.preventDefault();
  };


  return (
    <div style={{paddingTop: '20px', marginBottom: "-230px", paddingBottom: "10px"}} onChange={onDivWrapperChange}>
      {/* <ToastContainer containerId={'success'} position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
      <ToastContainer limit={1} containerID={'warn'} position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {/* <Grid container> */}
        {/* <Grid item xs={2}> */}
      
          <Stack
            alignItems="center"
            direction="column"
            display="flex"
            justifyContent="flex"
            paddingTop="10px"

            paddingLeft="17px"
            marginTop="30px"
            marginBottom="min(-7px)"
            minHeight="100vh"
            minWidth="200vw"
            maxWidth="200px"
            spacing={4}
          >
          <form className={classes.container} onSubmit={formik.handleSubmit}>
            <label style={{fontWeight:'Normal', lineHeight: 3, display: 'flex', color: "#757575", justifyContent: 'center', paddingTop: '1px'}}>Enter your course details:</label>
            {/* <label htmlFor="firstName" style={{ padding: "4px" }}>
          Institution: &nbsp;
        </label> */}

            <TextField
              inputProps={{ style: { color:"rgb(55 60 65)", fontSize: "0.9rem" } }}
              halfwidth
              id="institution"
              name="institution"
              label="Institution"
              type="text"
              placeholder="e.g UBC"
              value={formik.values.institution}
              onChange={formik.handleChange}
              helperText={
                formik.touched.institution && formik.errors.institution
              }
            />
            <TextField
            inputProps={{ style: { color:"rgb(55 60 65)" , fontSize: "0.9rem" }}}
              halfwidth
              id="courseCode"
              name="courseCode"
              label="Course Code"
              type="courseCode"
              placeholder="CPSC 101"
              value={formik.values.courseCode}
              onChange={formik.handleChange}
              error={
                formik.touched.courseCode && Boolean(formik.errors.courseCode)
              }
              helperText={formik.touched.courseCode && formik.errors.courseCode}
            />

    
            <FormControl halfWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Term/Semester
              </InputLabel>
              <Select
              inputProps={{ style: { color:"rgb(55 60 65)" }}}
                labelId="demo-simple-select-helper-label"
                id="courseTerm"
                name="courseTerm"
                label="CourseTerm"
                value={formik.values.courseTerm}
                onChange={formik.handleChange}
                error={
                  formik.touched.courseTerm && Boolean(formik.errors.courseTerm)
                }
                helperText={
                  formik.touched.courseTerm && formik.errors.courseTerm
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem inputProps={{ style: { color:"rgb(55 60 65)", fontSize: "0.9rem"  }}} value={"Fall"}>Fall Semester (1)</MenuItem>
                <MenuItem inputProps={{ style: { color:"rgb(55 60 65)", fontSize: "0.9rem"  }}} value={"Winter"}>Winter Semester (2)</MenuItem>
                <MenuItem value={"FullYear"}>Full Year Course</MenuItem>
                <MenuItem value={"Summer1"}>Summer Semester 1</MenuItem>
                <MenuItem value={"Summer2"}>Summer Semester 2</MenuItem>
                <MenuItem value={"SummerFull"}>Full Summer</MenuItem>
              </Select>
              {/* <FormHelperText> {formik.values.courseTerm} </FormHelperText> */}
            </FormControl>

            <FormControl halfWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Timezone
              </InputLabel>
              <Select
              inputProps={{ style: { color:"rgb(55 60 65)", fontSize: "0.9rem"  }}}
                labelId="demo-simple-select-helper-label"
                id="timezone"
                name="timezone"
                label="Timezone"
                value={formik.values.timezone}
                onChange={formik.handleChange}
                error={
                  formik.touched.timezone && Boolean(formik.errors.timezone)
                }
                helperText={formik.touched.timezone && formik.errors.timezone}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"PST"}>PST (Pacific)</MenuItem>
                <MenuItem value={"EST"}>EST (Eastern)</MenuItem>
                <MenuItem value={"CST"}>CST (Central)</MenuItem>
                <MenuItem value={"MST"}>MST (Mountain)</MenuItem>
                <MenuItem value={"UTC"}>
                  UTC (select UTC for all other timezones - please convert to
                  UTC)
                </MenuItem>
              </Select>
              <FormHelperText>
                {/* your institution's timezone* */}
              </FormHelperText>
            </FormControl>

            {/* <TextField
              halfWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            /> */}
           <TextField
           inputProps={{ style: { color:"rgb(55 60 65)", fontSize: "0.9rem"  }}}
            fullWidth
            id="email"
            name="email"
            label="iClicker Email"
            placeholder="anna.tory@ubc.ca"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            // endAdornment={
            //   <InputAdornment position="end">
            //     <IconButton
            //       aria-label="toggle password visibility"
            //       onClick={handleEmailChecked}
            //       onMouseDown={handleMouseDownEmail}
            //     >
            //       {emailChecked ?  <VisibilityOff/> :  <Visibility/> }
            //     </IconButton>
            //   </InputAdornment>
            // }
          />
          

          {/* Old password field
           <TextField
          inputProps={{ style: { color:"rgb(55 60 65)" , fontSize: "0.9rem" }}}
            fullWidth
            id="password"
            name="password"
            label="iClicker Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          /> */}
             
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel  inputProps={{ style: { color:"rgb(55 60 65)" , fontSize: "0.9rem" }}} htmlFor="standard-adornment-password">iClicker password</InputLabel>
          <Input
          id="password"
          name="password"
          label="iClicker Password"
          // type="password"
            // id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
       {/* Reffer box + input */}
        <FormControlLabel style={{marginTop:"-10px", paddingLeft: "50px", justifyContent:"center", marginBottom: "-43px", width: '40px'}} control={<Checkbox checked={checked} onChange={handleChange}  style={{marginTop:"-30px",
            transform: "scale(0.4)", backgroundColor: '#f4f7f9', width: '20%', height: '20%'
        }}/>} 
        label={
          <Box component="h6" paddingBottom={'30px'} color='grey' fontSize={11} fontWeight={'300'}>referrer? </Box>
          }>
        </FormControlLabel>
  
       {/* </FormGroup> */}
      { checked && <TextField
           inputProps={{ style: { fontSize: "0.67rem"}}}
            fullWidth
            id="referrer"
            name="referrer"
            label="referrer email - optional"
            placeholder="christain.smith@ubc.ca"
            value={formik.values.referrer}
            onChange={formik.handleChange}
            error={formik.touched.referrer && Boolean(formik.errors.referrer)}
            helperText={formik.touched.referrer && formik.errors.referrer}
          />
      }
       
      


      
          

            {/* <Field as="select" name="color" style={{minHeight: '22px'}} >
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
          </Field> */}

          <SelectionContainer />

            <Button color="primary" variant="contained" halfWidth type="submit" style={{marginBottom:"0px",}}>
              Submit & Checkout
            </Button>
            {isSubmitting && <LinearProgress />}
          </form>

          </Stack>
        {/* </Grid> */}
     
      {/* </Grid> */}
    </div>
  );
};

export default InputForm;
