import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { addProduct } from "../store/features/products/products-thunk";
import Spinner from "../components/Spinner";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
  });
  const [imageFile, setImageFile] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { productName, productPrice, productDescription, productCategory } =
    formData;
  const imageInputRef = React.useRef();
  const reader = new FileReader();
  const { uid } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.products);
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // Image selection
  const types = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg",
    "image/ico",
    "image/jfif",
   "image/webp"
  ];

  const previewFile = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  const handleImageChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImageFile(selected);
      previewFile(selected);
    } else {
      setImageFile("");
      imageInputRef.current.value = "";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    // if (!currentUser) {
    //   toast.error("Please login to use this feature");
    //   navigate("/login");
    // }
      if (Object.keys(errors).length === 0) {
        setFormErrors({});
        dispatch(
          addProduct({
            productName,
            productPrice,
            productDescription,
            productCategory,
            imageFile,
          })
        );
        imageInputRef.current.value = "";
        setImageFile("");
        setFormData({
          productName: "",
          productPrice: "",
          productDescription: "",
          productCategory: "",
        });
      } else {
        setFormErrors(errors);
      }
  };

  const validate = () => {
    const errors = {};
    if (!productName) {
      errors.productName = "Product name is required!";
    }
    if (!productPrice) {
      errors.productPrice = "Product price is required!";
    }
    if (!productCategory) {
      errors.productCategory = "Product category is required!";
    }
    if (!productDescription) {
      errors.productDescription = "Product description is required!";
    }
    if (!imageFile) {
      errors.imageFile = "Product image is required!";
    }
    return errors;
  };

  return (
    <Container>
      <main className="mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 border shadow-sm w-75">
            <p className="text-center mt-4">
              <strong>Add a product</strong>
            </p>
            {isLoading && <Spinner />}
            <Form className="w-100">
              <Form.Group className="mb-3">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={onChange}
                  type="text"
                />
                <p className="text-danger">{formErrors.productName}</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  id="productPrice"
                  name="productPrice"
                  value={productPrice}
                  onChange={onChange}
                  type="text"
                />
                <p className="text-danger">{formErrors.productPrice}</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={onChange}
                  id="productCategory"
                  name="productCategory"
                  value={productCategory}
                >
                  <option>Select a category</option>
                  <option value="Audio">Audio</option>
                  <option value="Cell Phones">Cell Phones</option>
                  <option value="Desktop Computers">Desktop Computers</option>
                  <option value="Drones">Drones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Tablets">Tablets</option>
                  <option value="TVs">TVs</option>
                  <option value="VR Headsets">VR Headsets</option>
                  <option value="Watches">Watches</option>
                </Form.Select>
                <p className="text-danger">{formErrors.productCategory}</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  id="productDescription"
                  name="productDescription"
                  value={productDescription}
                  onChange={onChange}
                  as="textarea"
                  rows={3}
                />
                <p className="text-danger">{formErrors.productDescription}</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  onChange={handleImageChange}
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/svg, image/ico, image/jfif, image/webp"
                  ref={imageInputRef}
                />
                <p className="text-danger">{formErrors.imageFile}</p>
              </Form.Group>
              <div className="text-center">
              <small className="d-block">Allowed formats: .png, .jpg, .jpeg, .svg, .ico, .jfif, .webp</small>
                <Button disabled={isLoading} onClick={onSubmit} className="btn btn-sm my-3 w-100">
                {isLoading ? "Please wait..." : "Add Product"}
                </Button>
              </div>
            </Form>
            {imageFile && (
              <div className="text-center mt-2">
                <p>Product Image Preview:</p>
                <Image
                  src={imageFile}
                  style={{ width: 200, height: 200 }}
                ></Image>
              </div>
            )}
          </div>
        </div>
      </main>
    </Container>
  );
}

export default AddProduct;
