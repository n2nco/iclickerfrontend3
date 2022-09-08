import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {

   institution: '',
   courseCode: "",
   // courseCodeDefault: "CPSC100",
   courseTerm: "",
   email: "",
   password: "",
   

   daysAndTimes: { 
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },
   //UTC is only on back end 
   daysAndTimesUtc: { },

   sessionId: '',
   // sortBy: false,
   // wasDataReceived: false,
   // text: 'sample text',
   // apiData: false,
   
   // mediaShown: 'tweets',
   // medias: ['tweets', 'youtube', 'substack'],


   currency: "", //set on backend from stripe - usd if iClicker email contains .edu else CAD
   amount: "", //$
   // showStripe: false,
   clientSecret: "",
   paymentIntent: "",
   paymentSucceeded: false,
   submitted: false, //not in use

   //when user has clicked sumbit, then edits their order, hide stripe & require clicking submit again
   sumbitAlreadyPressed: false,
   orderModifiedWithoutResubmit: false, 


}

//Usage in components: store.state.mediaShown
const reducer = (state, action) => {
    console.log('running action ' + action.type + ' with payload: ' + action.message)

   switch (action.type) {
      case 'setDaysAndTimes': //note: i call this in a weird fashion. i set store.state.daysAndTimes[text] = text in time component 
         console.log('setting days and times' + action.message) 
         return { 
            ...state, 
         //  weekdaysSelected: action.message
         }

      case 'submitAlreadyPressed':
         console.log('show stripe running')
         return {
            ...state,
            submitAlreadyPressed: action.message,
         }
      
      case 'setFormValues': 
         console.log('setting form values' + action.message)
         return {
            ...state, 
            institution: action.message.institution,
            courseCode: action.message.courseCode,
            courseTerm: action.message.courseTerm,
            timezone: action.message.timezone,
            email: action.message.email,
            password: action.message.password,
            referrer: action.message.referrer,
         }
      case 'setClientSecret': // this is when stripe payment is shown. 
         console.log('setting client secret in reducer' + action.message)
         return {
            ...state, clientSecret: action.message
         }
         //we don't necessarily need this - any modification on front end doesn't show up on backend / our /webhook route.
      case 'setPaymentIntent': 
         console.log('setting payment intent + amount from payment intent' + action.message)
         return {
            ...state, 
            paymentIntent: action.message,
            amount: action?.message?.amount,
            currency: action?.message?.currency

      }
      
      
      case 'paymentSucceeded':
         console.log('payment succeeded in store l49')
         return {
            ...state, paymentSucceeded: true,
         }
         case 'newOrdermission':
            console.log('new order submitted')
            return {
               ...state, submitted: true,
          }

      //  case 'setSortBy':
      //    return {
      //      ...state,
      //      sortBy: action.message,
      //   }
        case 'setApiData':
            return {
              ...state,
              apiData: action.message,
           }
         case 'saveState': //save state to local storage - call this on pay button click
            saveState(state) 
            return {
               ...state,
         }
    }
}



const initState = (initialState) => {
   return defaultState
}

let storeConfigProp = null
const StoreProvider = ({ storeConfig, children }) => {
   const [state, dispatch] = React.useReducer(reducer, defaultState, initState) 
   return (
      <StoreContext.Provider value={{ state, dispatch }}>
         {children}
      </StoreContext.Provider>
   )
}

//IN USE
const saveState = (state) => {
   try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
      console.log('state saved to local storage')
   } catch (e) {
      console.log(`failed to save state to local storage. error: ${e}`)
   }
}

export const StoreContext = createContext() 
export default StoreProvider