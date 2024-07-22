import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Alert
} from "reactstrap";

import { User }  from "@genezio-sdk/black-dashboard-genezio";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
    if (!email || !password) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);

    const res = await User.login(email, password).catch(err => {
      setError(err.msg);
      console.log(err.error);
      setIsSubmitting(false);
      return;
    });
    setIsSubmitting(false);
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      return;
    } else {
      localStorage.setItem("apiToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      history.push("/admin/dashboard");
    }
  }

  return (
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
              <CardTitle tag="h3">Login</CardTitle>
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>

              <span>
                Don't have an account? <a href="/auth/register">Register</a>
              </span>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Login
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
