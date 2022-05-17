import { Button, Card, TextField } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import "./authPages.css";
import { initialValues } from "../store/reducers/userReducer";
import Service from "../utils/Service";
import { APP_URL } from "../utils/Constants";
import { showError, showInfo, showSuccess } from "../utils/AlertService";
import * as actions from "../store/ActionTypes";

interface loginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const user = useSelector((state: initialValues) => state);
  const dispatch = useDispatch();
  console.log("user", user);
  const initialValues: loginFormValues = {
    username: "",
    password: "",
  };

  const loginUser = async (
    values: loginFormValues,
    setSubmitting: any,
    resetForm: any
  ) => {
    const reqBody = {
      username: values.username,
      password: values.password,
    };
    setSubmitting(true);
    const res = await Service("POST", `${APP_URL}users/login`, reqBody);
    console.log("res", res);
    const { message, status, data }: any = res;
    if (status === 200) {
      showSuccess(message);
      setSubmitting(false);
      resetForm();
      dispatch({
        type: actions.LOGIN,
        payload: {
          token: data.token,
        },
      });
    } else if (status === 400) {
      showInfo(message);
      setSubmitting(false);
    } else {
      showError(message);
      setSubmitting(false);
    }
  };
  return (
    <div className="details-body" style={{ padding: "8rem" }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          loginUser(values, setSubmitting, resetForm)
        }
        validationSchema={object({
          username: string().required("Please enter username"),
          password: string().required("Please enter password"),
        })}
      >
        {({ errors, isValid, touched, dirty }: any) => (
          <Card className="form-card">
            <h1 className="heading-text">Login</h1>
            <Form>
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
                Login
              </Button>
              <p className="register-now-text">
                Not yet registered? <Link to="/signup">Register Now</Link>
              </p>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default Login;
