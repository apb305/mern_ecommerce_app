import { format } from "date-fns";
import React from "react";

function Reviews({reviews}) {
  return (
    <>
      {reviews.map((review) => (
        <div className="border mb-3 p-4" key={review._id}>
          <div className="d-flex flex-start">
            <div>
              <h5 className="fw-bold mb-1">{review.title}</h5>
              <div className="d-flex align-items-center mb-3">
                <p className="text-muted small mb-0">
                  {review.user} -{" "}
                  {format(new Date(review.created_at), "MM-dd-yyyy")}
                </p>
                <a href="#!" className="link-muted">
                  <i className="fas fa-pencil-alt ms-2"></i>
                </a>
                <a href="#!" className="link-muted">
                  <i className="fas fa-redo-alt ms-2"></i>
                </a>
                <a href="#!" className="link-muted">
                  <i className="fas fa-heart ms-2"></i>
                </a>
              </div>
              <p className="mb-0">{review.body}</p>
            </div>
          </div>
        </div>
      ))}{" "}
    </>
  );
}

export default Reviews;
