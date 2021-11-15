import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import DashboardNav from "../Dashboard/DashboardNav/DashboardNav";

const AddProducts = () => {
  const formRef = useRef();
  const [product, setProduct] = useState({});
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newProduct = { ...product };
    newProduct[field] = value;
    console.log(newProduct);
    setProduct(newProduct);
  };
  const handleAddProduct = (e) => {
    fetch("https://hidden-refuge-12669.herokuapp.com/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Product Successfully Added");
          formRef.current.reset();
          setProduct({});
        }
      });

    e.preventDefault();
  };
  return (
    <>
      <DashboardNav></DashboardNav>
      <Container>
        <h3 className="text-center my-5">Add a Product</h3>
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <Form ref={formRef} onSubmit={handleAddProduct}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="name"
                  type="text"
                  placeholder="Product Name/Model"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onBlur={handleOnBlur}
                  name="price"
                  type="text"
                  placeholder="Enter the Price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  onBlur={handleOnBlur}
                  className="me-sm-2"
                  id="inlineFormCustomSelect"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </Form.Select>
              </Form.Group>

              <FloatingLabel
                controlId="floatingTextarea"
                label="Descriptions"
                className="mb-3"
              >
                <Form.Control
                  onBlur={handleOnBlur}
                  name="description"
                  as="textarea"
                  placeholder="Enter Product Descriptions"
                />
              </FloatingLabel>
              <FloatingLabel controlId="" label="Image URL" className="mb-3">
                <Form.Control
                  onBlur={handleOnBlur}
                  name="img"
                  placeholder="Enter Product Image"
                />
              </FloatingLabel>

              <Button variant="warning" type="submit">
                Add Product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProducts;
