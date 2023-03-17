import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { addProductReview } from "../features/reviews/review-thunk";
import { Button, Container } from "react-bootstrap";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    body: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { name, title, rating, body } = formData;
  const { userDetails } = useSelector((state) => state.user);
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (!currentUser) {
      toast.error("Please login to use this feature");
      navigate("/login");
    }
    try {
      if (Object.keys(errors).length === 0) {
        setFormErrors({});
        const data = {
          productId: id,
          user: name,
          userId: userDetails._id,
          title: title,
          rating: 5,
          body: body,
        };
        dispatch(addProductReview(data));
        toast.success("Review Submitted");
      } else {
        setFormErrors(errors);
      }
    } catch (error) {
      toast.error("An error has occured");
    }
  };

  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required!";
    }
    if (!title) {
      errors.title = "Title is required!";
    }
    if (!body) {
      errors.body = "Review is required!";
    }
    return errors;
  };

  return (
    <div>
      <div className="border border-dark border-opacity-50">
        <Container>
          <Form className="p-2 w-auto needs-validation">
            <p className="text-center">
              <strong>Leave a review</strong>
            </p>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                type="text"
                required
              />
              <p className="text-danger">{formErrors.name}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                type="text"
                required
              />
              <p className="text-danger">{formErrors.title}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                id="body"
                name="body"
                value={body}
                onChange={onChange}
                as="textarea"
                rows={3}
                required
              />
              <p className="text-danger">{formErrors.body}</p>
            </Form.Group>
            <div className="text-center">
              <Button onClick={onSubmit} className="btn btn-sm">
                Submit Review
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
