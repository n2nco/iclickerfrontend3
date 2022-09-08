import { useContext, useEffect, useState } from 'react'
import ToggleDays from './ToggleDays2'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { ToggleButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { StoreContext }  from './Store'


export default function SelectionContainer() {
const store = useContext(StoreContext)

const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
return (
    <>  
    {/* <div align="center"> */}
    <Stack
        alignItems="baseline"
        direction="column"
        display="flex"
        justifyContent="center"
        // white-space="nowrap"

        // minHeight="100vh"
        minWidth="30vw"
        spacing={-1}
        // margin="-200px 0px 0px 0px"
        
        >
        <ButtonClick key={0} text={days[0]}></ButtonClick>
        <ButtonClick key={1} text={days[1]}></ButtonClick>
        <ButtonClick key={2} text={days[2]}></ButtonClick>
        <ButtonClick key={3} text={days[3]}></ButtonClick>
        <ButtonClick key={4} text={days[4]}></ButtonClick>
        {/* <Button onClick={ () => alert(JSON.stringify(store.state)) }> temporary Submit </Button> temporary */}
    </Stack>
    {/* </div> */}
    </>
    )
 }


 function ButtonClick({key, text}) {
    const store = useContext(StoreContext)

    const [flag, setFlag] = useState(true);
    // const [key, setKey] = useState(key);
    const [defaultTime, setDefaultTime] = useState(['10:00', '12:00']);
  
    const handleClick = () => {
      setFlag(!flag);
      //if clicked
      if(flag) {
        console.log('!flag' + store.state.daysAndTimes[text])
        store.dispatch({type: 'setDaysAndTimes', message: store.state.daysAndTimes[text] = defaultTime})
      }
        else if (!flag){
            console.log('flag' + store.state.daysAndTimes[text])
            store.dispatch({type: 'setDaysAndTimes', message: store.state.daysAndTimes[text] = null})
        }
    };

    const setStoreTime = (time) => {
        console.log('time selected:') 
        console.log(time)
        //time example edge case: ["10:00", "00:00"]
        // if (time[0] >= time[1]) {
        //     alert('Please select a valid time range')
        // }
      
        store?.dispatch({type: 'setDaysAndTimes', message: store.state.daysAndTimes[text] = time}) 
        return time
    }
  
    return (
        <>
        <Box  direction="column" alignItems="center" justifyContent="start" marginBottom={0} display="inline-flex">
        <Button
            onClick={handleClick}
            variant="contained"
            color={flag ? "primary" : "secondary"}
            sx={{m: 1, p: 1} }
            // style={{ textTransform: "none", padding: "14px 0px",  maxWidth:"50px" }}
            >
            {text}
        </Button>
            {!flag ? <TimeRangePicker key={{key}} value={ (!store?.state?.daysAndTimes[text] || !store?.state?.daysAndTimes[text]?.length == 0 ) ? store?.state?.daysAndTimes[text] : defaultTime } onChange={ (newTime) => { if(!newTime) {console.log('clear clicked or time input falsy')}; setStoreTime(newTime); console.log('time onchange: ' + newTime); return newTime; }}  display="inline"  style={{minWidth: "500wv", display: "block", align: 'right', padding:'10px', color: 'black'}}/> : null}

        </Box>
      </>
    );
  }
  //onsumbit get states & pass to store?

