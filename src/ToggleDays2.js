//NOT IN USE

import * as React from 'react';
import { useContext, useEffect, useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';


import Button from './Button';


const ColorToggleButton = () => {
//   const [alignment, setAlignment] = React.useState('web');
  const [selections, setSelections] = React.useState({});


  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    // setView(nextView);
    console.log('event:')
    console.log(event)

    console.log(event.target.value)

    console.log("event.target.key")
    console.log(event.target.key)

    console.log("event.target.name")

    if(setSelections !== null) {

        console.log('setting selection: ' + event.target.key)
        setSelections(event.target.key)
    }
  };

  const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const indexes = [0, 1, 2, 3, 4];

  const [value, onChange] = useState(['10:00', '12:00']);

  const [btn1S, setBtn1S] = useState(false);
  const [btn2S, setBtn2S] = useState(false);
  const [btn3S, setBtn3S] = useState(false);

  const handleBtnClick = (e) => {
    console.log('btn1S')
    console.log(btn1S)
    console.log(e.target)
    alert('toggledays2')
    
    e.currentTarget.selected = false
   setBtn1S(!btn1S);
  }




//BUTTON COLOR NEW
 
  const [btnColors, setBtnColors] = useState(["red"]); 
  
  const changeColor = (e) => {
    console.log('this key')
    console.log(e.currentTarget)
    console.log('this key value')
    console.log(e.currentTarget.value)

    console.log(e.currentTarget.style.backgroundColor = 'blue')

    // setBtnColors( () => { btnColors[e.currentTarget.value] = 'blue'} )

    btnColors[e.currentTarget.value] === "red" ? setBtnColors("green") : setBtnColors("red");
  }


return (
<>
{days.map( (day, index) =>  {
    <div align='center'>
    <Button name={day} index={index} />
    <TimeRangePicker value={value} onChange={onChange}  />
    </div>
})}
</>
)
}

// {/*  */}
//  {days.map( (day, index) =>  {
//                 console.log('running days.map')
//                 return (
//                  <div align='center'>
//                  {/* <button value={index.toString()} key={index.toString()} color={btnColor}>{day} onClick={
//                  () => {
//           btnColor === "red" ? setBtnColor("green") : setBtnColor("red");
//         }}
//         style={{ backgroundColor: btnColor }}
//       />}</button> */}
//       <button
//         value={index}
//          key={ index }
  
//         onClick={(e) => changeColor(e) }
//         // style={{ backgroundColor: btnColors[this.key] ? btnColors[this.key] : "red" }}
//       >
//         {day}
//       </button>
                
//                  </div>
//                 )
//             })}
//             </>

// )

// }



  

//   return (
//     <>
//     {/* <Formik></Formik> */}
//     <ToggleButtonGroup
//       orientation='vertical'
//       color="primary"
//       exclusive={false}
//       value={selections}
//       onChange={handleChange}
//     >


//         {days.map( (day, index) =>  {
//             console.log('running days.map')
//             return (
//              <div align='center'>
//              <ToggleButton value={index.toString()} key={index.toString()}>{day}</ToggleButton>
//              <TimeRangePicker value={value} onChange={onChange}  />
//              </div>
//             )
//         })}

//       {/* <div align='center'>
//       <ToggleButton value="0">Monday</ToggleButton>
//       <TimeRangePicker onChange={onChange} value={value} />
//       </div>
//       <ToggleButton value="1">Tuesday</ToggleButton>
//       <ToggleButton value="2">Wednesday</ToggleButton>
//       <ToggleButton value="3">Thursday</ToggleButton>
//       <ToggleButton value="4">Friday</ToggleButton> */}
//     </ToggleButtonGroup>
// /
//         <ToggleButton value="laptop" aria-label="laptop" aria-pressed={ btn1S } color='primary' onClick={ (e) => handleBtnClick(e) }> test1 </ToggleButton>
//         <ToggleButton value="laptop2" aria-label="laptop3" selected={btn2S}> test2 </ToggleButton>
//         <ToggleButton value="laptop3" aria-label="laptop2"selected={btn3S}> test3 </ToggleButton>
 
//         </>
//         );
    
// }

// //import * as React from 'react';
// // import FormatBoldIcon from '@mui/icons-material/FormatBold';
// // import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// // import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// // import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
// // import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// // import ToggleButton from '@mui/material/ToggleButton';
// // import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// // export default function ToggleButtonsMultiple() {
// //   const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

// //   const handleFormat = event => {
// //     const { options } = event.target;
// //     console.log('options:')
// //     console.log(options)

// //     const value = [];
// //     for (let i = 0, l = options.length; i < l; i += 1) {
// //       if (options[i].selected) {
// //         value.push(options[i].value);
// //       }
// //     }
// //     console.log(value); // selected options
// // };

// //   return (
// //     <ToggleButtonGroup
// //       value={formats}
// //       onChange={handleFormat}
// //       aria-label="text formatting"
     
// //     >
// //       <ToggleButton value="bold" aria-label="bold">
// //         test
// //       </ToggleButton>
// //       <ToggleButton value="italic" aria-label="italic">
// //         test2   
// //       </ToggleButton>
// //       <ToggleButton value="underlined" aria-label="underlined">
// //        test34
// //       </ToggleButton>
// //       <ToggleButton value="color" aria-label="color" disabled>
// //         test5
// //       </ToggleButton>
// //     </ToggleButtonGroup>
// //   );
// // }

export default ColorToggleButton
