import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UseAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { addProductReview } from "../features/reviews/review-thunk";
import { getReviews } from "../features/reviews/review-thunk";
import { Button, Container } from "react-bootstrap";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    body: "",
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const { title, rating, body } = formData;
  const { product } = useSelector((state) => state.products)
  const { userDetails } = useSelector((state) => state.user)
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
    if (!currentUser) {
      toast.error("Please login to use this feature");
      navigate("/login");
    } else {
    try {
      const formData = {
        product: id,
        user: userDetails._id,
        title: title,
        rating: 5,
        body: body,
      };
      dispatch(addProductReview(formData));
      // navigate(`/reviews/product/${product._id}`)
      toast.success("Review Submitted");
    } catch (error) {
      toast.error("An error has occured");
    }
}
  };

  return (
    <div>
      <div className="border">
        <Container>
        <Form className="p-2 w-auto">
        <p className="text-center"><strong>Leave a review</strong></p>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              type="text"
            />
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
            />
          </Form.Group>
          <div className="text-center">
          <Button onClick={onSubmit} className="btn btn-sm">Submit Review</Button>
          </div>
        </Form>
        </Container>
      </div>
    </div>
  );
}
