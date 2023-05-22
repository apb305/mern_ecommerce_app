import { useState } from "react";
import { Button, Card, Form, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserDetails, updateUserDetails } from "../store/features/user/user-thunk";

function AccountDetails() {
  const dispatch = useDispatch();
  const { userDetails, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserDetails(formData));
      dispatch(getUserDetails());
      toast.success("Your profile has been updated");
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Profile Details</Accordion.Header>
        <Accordion.Body>
          <Card.Title className="fw-bold text-center">
            Account Profile
          </Card.Title>
          <p className="fw-bold mt-2">
            Display Name: <small className="fw-light">{userDetails.name}</small>
          </p>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="name"
              placeholder="Enter new name"
              value={name}
              onChange={onChange}
            />
          </Form.Group>
          <p className="fw-bold mt-2">
            Display Email:{" "}
            <small className="fw-light">{userDetails.email}</small>
          </p>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="Enter new email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <div className="mt-2">
            <Button
              size="sm"
              className="w-100"
              type="button"
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? "Please wait..." : "Save"}
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}
export default AccountDetails;
