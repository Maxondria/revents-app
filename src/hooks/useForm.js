import { useState } from "react";

export const useForm = initialState => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    ({ target: { name, value } }) => {
      setValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  ];
};
