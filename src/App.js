import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import * as yup from "yup";
import schema from './Validation/formSchema';
import axios from 'axios';

const initialDisabled = true;

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  tOS: ''
}

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  tOS: false,
}

function App() {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }
  //validate single val

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({...formValues, [name]: value}) 
  }

  const postNewUser = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
        setUsers([res.data, ...users]);
        setFormValues(initialFormValues);
      })
      .catch(err => console.log(err))
  }

  const onSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tOS: formValues.tOS
    }
    postNewUser(newUser);
  }
  
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  //validate entire schema

  return (
    <div className="App">
      <h1>Advanced Forms</h1>
      <Form 
        disabled={disabled}
        change={inputChange}
        submit={onSubmit}
        errors={formErrors}
        values={formValues}
      />
      {users && users.map(user =>(
        <pre key={user.id}>{JSON.stringify(user)}</pre>
      ))}
    </div>
  );
}

export default App;
