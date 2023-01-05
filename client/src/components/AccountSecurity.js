import { useState } from "react";
import { Button, Card, Form, FormGroup, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";
import { UserData } from "../contexts/UserContext";

function AccountSecurity() {
  const { updateUserPassword, currentUser } = UseAuth();
  const { globalLoader } = UserData();
  const [formData, setFormData] = useState({
    newPassword: "",
    passwordConfirm: "",
    currentPassword: "",
  });

  const { newPassword, passwordConfirm, currentPassword } = formData;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }
    if (!newPassword || !passwordConfirm || !currentPassword) {
        return toast.error("Please fill out of password fields")
    }
    await updateUserPassword(
      currentUser.email,
      currentPassword,
      newPassword
    );
      setFormData({
        newPassword: "",
        passwordConfirm: "",
        currentPassword: "",
      });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Account Security</Accordion.Header>
        <Accordion.Body>
        <Card.Title className="fw-bold text-center">Account Password</Card.Title>
          <p className="fw-bold mt-2">Current Password:</p>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Control
              type="password"
              // type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={currentPassword}
              onChange={onChange}
            />
          </Form.Group>
          <p className="fw-bold mt-2">New Password:</p>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Control
              type="password"
              // type={showPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={onChange}
            />
          </Form.Group>
          <p className="fw-bold mt-2">Confirm Password:</p>
          <FormGroup className="mb-3" controlId="passwordConfirm">
            <Form.Control
              type="password"
              // type={showPassword ? "text" : "password"}
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
            />
          </FormGroup>
          <div className="mt-2">
            <Button
              size="sm"
              className="w-100"
              type="button"
              disabled={globalLoader}
              onClick={onSubmit}
            >
              {globalLoader ? "Please wait..." : "Save"}
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}
export default AccountSecurity;
