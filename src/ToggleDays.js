// import React, { useState } from "react";
// //import { withStyles } from "@material-ui/core/styles";
// import { withStyles } from '@material-ui/core/styles';
// // import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButton from '@mui/material/ToggleButton';

// // import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// const DAYS = [
//   {
//     key: "sunday",
//     label: "S"
//   },
//   {
//     key: "monday",
//     label: "M"
//   },
//   {
//     key: "tuesday",
//     label: "T"
//   },
//   {
//     key: "wednesday",
//     label: "W"
//   },
//   {
//     key: "thursday",
//     label: "T"
//   },
//   {
//     key: "friday",
//     label: "F"
//   },
//   {
//     key: "saturday",
//     label: "S"
//   }
// ];

// const StyledToggleButtonGroup = withStyles(theme => ({
//   grouped: {
//     margin: theme.spacing(40),
//     padding: theme.spacing(0, 1),
//     "&:not(:first-child)": {
//       border: "1px solid",
//       borderColor: "#692B7C",
//       borderRadius: "50%"
//     },
//     "&:first-child": {
//       border: "1px solid",
//       borderColor: "#692B7C",
//       borderRadius: "50%"
//     }
//   }
// }))(ToggleButtonGroup);

// const StyledToggle = withStyles({
//   root: {
//     color: "#692B7C",
//     "&$selected": {
//       color: "red",
//       background: "#692B7C"
//     },
//     "&:hover": {
//       borderColor: "#BA9BC3",
//       background: "#BA9BC3"
//     },
//     "&:hover$selected": {
//       borderColor: "#BA9BC3",
//       background: "#BA9BC3"
//     },
//     minWidth: 32,
//     maxWidth: 32,
//     height: 32,
//     textTransform: "unset",
//     fontSize: "2rem"
//   },
//   selected: {}
// })(ToggleButton);

// const ToggleDays = () => {
//   const [days, setDays] = useState([0, 2, 3]);
//   return (
//     <>
//       <StyledToggleButtonGroup
//         size="small"
//         arial-label="Days of the week"
//         value={days}
//         onChange={(event, value) => setDays(value)}
//       >
//         {DAYS.map((day, index) => (
//           <StyledToggle key={day.key} value={index} aria-label={day.key}>
//             {day.label}
//           </StyledToggle>
//         ))}
//       </StyledToggleButtonGroup>
//     </>
//   );
// };

// export default ToggleDays;
