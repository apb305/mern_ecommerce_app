import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup
} from "react-bootstrap";
import { toast } from "react-toastify";
import { UserData } from "../contexts/UserContext";

function Profile() {
  const { loadUser, globalLoader, userDetails, updateUser } = UserData();
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formData;

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        loadUser();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await updateUser({
        name: name,
        email: email,
      });
      loadUser();
      toast.success("Your profile has been updated");
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      toast.error("Could not update profile details");
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      {globalLoader ? (
        <Spinner />
      ) : (
        <Container>
          <header className="text-center">
            <h4 className="mt-4">Account settings</h4>
          </header>
          <main className="mt-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Form onSubmit={onSubmit}>

                  <Card>
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Card.Title className="fw-bold">
                          Account Name:{" "}
                          <small className="fw-light">{userDetails.name}</small>
                        </Card.Title>
                        <Form.Group className="mb-2">
                          <Form.Control
                            type="test"
                            id="name"
                            placeholder="Enter new name"
                            value={name}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Card.Title className="fw-bold">
                          Email:{" "}
                          <small className="fw-light">
                            {userDetails.email}
                          </small>
                        </Card.Title>
                        <Form.Group className="mb-2">
                          <Form.Control
                            type="email"
                            id="email"
                            placeholder="Enter new email"
                            value={email}
                            onChange={onChange}
                          />
                        </Form.Group>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Card.Title className="fw-bold">
                          Change Password:
                        </Card.Title>
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Control
                            type="password"
                            placeholder="New Password"
                            className="mt-2"
                          />
                        </Form.Group>
                        <FormGroup className="mb-3" controlId="passwordConfirm">
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            className="mt-2"
                          />
                        </FormGroup>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
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
                </Form>
              </div>
            </div>
          </main>
        </Container>
      )}
    </>
  );
}

export default Profile;
