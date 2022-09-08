import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {

   institution: '',
   courseCode: "",
   // courseCodeDefault: "CPSC100",
   courseTerm: "",

   daysAndTimes: { 
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },

   sessionId: '',
   sortBy: false,
   wasDataReceived: false,
   text: 'sample text',
   apiData: false,
   
   mediaShown: 'tweets',
   medias: ['tweets', 'youtube', 'substack'],

 

   showStripe: false,
   clientSecret: "",
   paymentIntent: "",
   paymentSucceeded: false,
   submitted: false, //not in use

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

      case 'showStripe':
         console.log('show stripe running')
         return {
            ...state,
            showStripe: action.message
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
         }
      case 'setClientSecret': // this is when stripe payment is shown. 
         console.log('setting client secret in reducer' + action.message)
         return {
            ...state, clientSecret: action.message
         }
      case 'setPaymentIntent': //ToDO, or include it as part of client secret obj?
         console.log('setting payment intent secret' + action.message)
         return {
            ...state, paymentIntent: action.message
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

      case 'setMediaShown':
         return {
           ...state,
           mediaShown: action.message, 
       }
       case 'setSortBy':
         return {
           ...state,
           sortBy: action.message,
        }
        case 'setApiData':
            return {
              ...state,
              apiData: action.message,
           }
         case 'setWasDataReceived':
         return {
            ...state,
            wasDataReceived: action.message,
         }
         case 'saveState': //save state to local storage - call this on pay button click
            saveState(state) 
            return {
               ...state,
            }
    }
}


const initState = (initialState) => {
   try {
      const localState = JSON.parse(localStorage.getItem('state')) //save iframe cart on refresh.
      localState != null ? console.log('found localStorage state. Logging it:') : console.log('local storage state is null.')
      console.log(localState);

      //segment products available vs. products in cart
      var state = localState !== null ? localState : defaultState;
      return state

      } catch (e) {
         console.log(`failed to retreive state from local storage. error: ${e}`)
         return defaultState
   }

   return state
}

const saveState = (state) => {
   try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
      console.log('state saved to local storage')
   } catch (e) {
      console.log(`failed to save state to local storage. error: ${e}`)
   }
}

let storeConfigProp = null
const StoreProvider = ({ storeConfig, children }) => {
   const [state, dispatch] = React.useReducer(reducer, initState()) 
   return (
      <StoreContext.Provider value={{ state, dispatch }}>
         {children}
      </StoreContext.Provider>
   )
}
export const StoreContext = createContext() 
export default StoreProvider