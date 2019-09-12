import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios'

const AnimalForm = ({ errors, touched, status }) => {
  const [animals, setAnimals] = useState ([])
  // errors === form validation errors that come from formik
// touched === an object with true/false for each input field, whether the user has touched it yet or not
// status === an object coming from formik containing a new animal (from when we call setStatus)

  useEffect(() => {
    if (status) {
      setAnimals([ ...animals, status ])
    }
  }, [status])

     return (
      <Form>
      {touched.species && errors.species && <p className='error'>{errors.species}</p>}
      <Field type="text" name="species" placeholder="Species" />

         {touched.age && errors.age && <p className='error'>{errors.age}</p>}
      <Field type="number" name="age" placeholder="Age" />

         {touched.diet && errors.diet && <p className='error'>{errors.diet}</p>}
      <Field component="select" name="diet">
        <option value="" disabled>Select Diet:</option>
        <option value="carnivore">Carnivore</option>
        <option value="herbivore">Herbivore</option>
        <option value="omnivore">Omnivore</option>
      </Field>

         {touched.vaccinations && errors.vaccinations && <p className='error'>{errors.vaccinations}</p>}
         <label>
         <Field type="checkbox" name="vaccinations" />
         <span>Vaccinations</span>
       </label>

       <Field component="textarea" name="notes" placeholder="Notes" />

      <button type="submit">Submit</button>

         {/* Species { status.species} <br />
         Age {status.age} <br />
         Diet {status.diet} <br />
         Vaccinations {status.vaccinations} <br /> */}
         {animals.map(animal => (
           <div>Species: {animal.species}</div>
         ))}
    </Form>
  )
}

export default withFormik({
  // values come from formik automagically!
  mapPropsToValues: (values) => {
    // this mamkes these inputs 'controlled', sets the values automatically for us.
    return {
      // these keys line up with the 'name' attribute on our Fields.
      species: values.species || '',
      age: values.age || '',
      diet: values.diet || '',
      vaccination: values.vaccinations || false,
      notes: values.notes || ''
      // boolean, not a string, because it's a checkbox.
    }
  }, 
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required'),
    age: yup.number().positive().required('Age is required'),
    diet: yup.string().required("Diet is required"),
    vaccinations: yup.boolean().oneOf([true], "Animal must be vaccinated")
  }),
  handleSubmit: (values, { setStatus }) => {
    axios.post("https://reqres.in/api/animals", values)
    .then((response) => {
      setStatus(response.data)
    })
    .catch((error) => {
      console.log('Error:', error)
    })
   }
})(AnimalForm);

// Use Render Prop, this uses higher order component
// <Formik render={() => {
//  <Form> insert all type, button, etc code here.
// }}

// || "", want controlled, must be an empty string or 'text' within the string