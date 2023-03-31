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
  Row,
  Col,
  Alert
} from "reactstrap";

import { User } from "../backend-sdk/user.sdk";

function Register(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);
    event.preventDefault();
    if (
      !email ||
      !password1 ||
      !gender ||
      !name ||
      !phoneNumber ||
      !city ||
      !country
    ) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }
    if (password1 !== password2) {
      setError("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    // The userType propriety can be changed later once it is established what are the userTypes and what privileges each userType has
    const res = await User.create(
      name,
      email,
      password1,
      "Admin",
      gender,
      phoneNumber,
      city,
      country
    ).catch(err => {
      setError(err.msg);
      console.log(err.error);
      setIsSubmitting(false);
      return;
    });
    setIsSubmitting(false);
    if (!res) {
      setError("Unknown error, please try again later");
      console.log("Error at the Database");
      return;
    }
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      console.log(res);
      return;
    } else {
      history.push("/auth/login");
    }
  }
  return (
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
              <CardTitle tag="h3">Register</CardTitle>
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>
                  Email<span className="text-danger"> *</span>
                </Label>
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
                <Label>
                  Password<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password1}
                  onChange={e => setPassword1(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Repeat Password<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Write your password again"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Name<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Name"
                  placeholder="Write your name here"
                  type="name"
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Gender<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Gender"
                  placeholder="Male"
                  type="select"
                  autoComplete="gender"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>
                  Phone number<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Phone number"
                  placeholder="Phone number"
                  type="phoneNumber"
                  autoComplete="phoneNumber"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Country<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="Country"
                  placeholder="Country"
                  type="country"
                  autoComplete="country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  City<span className="text-danger"> *</span>
                </Label>
                <Input
                  defaultValue="City"
                  placeholder="City"
                  type="city"
                  autoComplete="city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Submit
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Register;
