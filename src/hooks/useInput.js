import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
   const [enteredValue, setEnteredValue] = useState(defaultValue);
   const [didEdit, setDidEdit] = useState(false);

   const validInput = validationFn(enteredValue);

   function handleInputChange(event){
    setEnteredValue(event.target.value);
    setDidEdit(false);
   }

   function handleInputValidation() {
    setDidEdit(true);
   }

   return {
    value: enteredValue,
    handleInputChange,
    handleInputValidation,
    hasError: didEdit && !validInput
   }
}