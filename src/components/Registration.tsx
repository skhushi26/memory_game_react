import React from "react";
import "./authPages.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import Service from "../utils/Service";
import { showError, showInfo, showSuccess } from "../utils/AlertService";
import { APP_URL } from "../utils/Constants";

interface regisFormValues {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: regisFormValues = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };

  const submitHandler = async (
    values: regisFormValues,
    setSubmitting: any,
    resetForm: any
  ) => {
    console.log(values);
    const reqBody = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      password: values.password,
    };
    setSubmitting(true);
    const res = await Service("POST", `${APP_URL}users/register`, reqBody);
    const { message, status }: any = res;
    if (status === 200) {
      showSuccess(message);
      setSubmitting(false);
      resetForm();
      navigate("/");
    } else if (status === 400) {
      showInfo(message);
      setSubmitting(false);
    } else {
      showError(message);
      setSubmitting(false);
    }
  };

  return (
    <div className="details-body">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          submitHandler(values, setSubmitting, resetForm)
        }
        validationSchema={object({
          first_name: string()
            .required("Please enter first name")
            .min(2, "First name too short"),
          last_name: string().required("Please enter last name"),
          username: string().required("Please enter username"),
          password: string()
            .required("Please enter password")
            .min(6, "Password must be atleast 6 characters long"),
        })}
      >
        {({ errors, isValid, touched, dirty }: any) => (
          <Card className="form-card">
            <h1 className="heading-text">Registration</h1>
            <Form>
              <Field
                name="first_name"
                type="firstName"
                as={TextField}
                variant="outlined"
                color="primary"
                label="First Name"
                style={{ marginBottom: "10px" }}
                fullWidth
                error={
                  Boolean(errors.first_name) && Boolean(touched.first_name)
                }
                helperText={Boolean(touched.first_name) && errors.first_name}
              />
              <Field
                name="last_name"
                type="lastName"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Last Name"
                style={{ marginBottom: "10px" }}
                fullWidth
                error={Boolean(errors.last_name) && Boolean(touched.last_name)}
                helperText={Boolean(touched.last_name) && errors.last_name}
              />
              <Field
                name="username"
                type="username"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Username"
                style={{ marginBottom: "10px" }}
                fullWidth
                error={Boolean(errors.username) && Boolean(touched.username)}
                helperText={Boolean(touched.username) && errors.username}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                color="primary"
                label="Password"
                style={{ marginBottom: "10px" }}
                fullWidth
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!dirty || !isValid}
              >
                Sign up
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
