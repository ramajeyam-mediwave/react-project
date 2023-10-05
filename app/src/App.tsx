
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Yup from "yup";
import MovieCard from "./Components/card";
import Button from "./Components/Button";
import "./App.css";


function App() {
  const [movies, setMovies] = useState([]);
  const initialValues = {
    title: "",
    description: "",
    rating: "",
    imageUrl: "",
  };

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  rating: Yup.number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must not exceed 10"),
  imageUrl: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
});

  const handleSubmit = (values:any, { resetForm}) => {
    const newMovie = { ...values };
    setMovies([...movies, newMovie]);
    resetForm();
  };
  return (
    <div className="App">
      <h1>Movie Card Generator</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, handleBlur }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" onBlur={handleBlur} />
              
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <Field type="text" name="description" onBlur={handleBlur} />
             
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <Field type="number" name="rating" onBlur={handleBlur} />
              
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL:</label>
              <Field type="url" name="imageUrl" onBlur={handleBlur} />
              
            </div>
            <Button type="submit">Create Card</Button>
          </Form>
        )}
      </Formik>
      <div className="movie-card-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
          ))}
         
      </div>
    </div>
  );
}
export default App;
