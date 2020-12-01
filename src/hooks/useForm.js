import { useState } from 'react';

function difference(obj1, obj2) {
  const diff = {};
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj1[key];
    }
  }

  return diff;
}

const useForm = (defaults, submitCallback) => {
  const [inputs, setInputs] = useState(defaults);
  const diff = difference(inputs, defaults);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (submitCallback) {
      submitCallback(inputs, diff);
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setInputs((inputs) => ({ ...inputs, [event.target.name]: value }));
  };

  const reset = () => {
    setInputs(defaults);
  };
  return {
    handleSubmit,
    handleInputChange,
    reset,
    inputs,
    diff,
  };
};

export default useForm;
