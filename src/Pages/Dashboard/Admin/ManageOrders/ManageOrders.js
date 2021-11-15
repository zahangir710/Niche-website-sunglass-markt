import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row, Table } from "react-bootstrap";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://hidden-refuge-12669.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  let count = 1;
  const handleShipped = (id) => {
    console.log(id);
    const status = "Shipped";
    const updatedStatus = { status };
    fetch(`https://hidden-refuge-12669.herokuapp.com/orders/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Order Status Updated");
        }
      });
  };
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center my-5">MANAGE ORDERS</h1>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer name</th>
                <th>Delivery address</th>
                <th>Order ID</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{count++}</td>
                  <td>
                    {order.CustomerName ? order.CustomerName : "Not Available"}
                  </td>
                  <td>{order.address}</td>
                  <td>{order._id}</td>
                  <td>{order.status}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Update Status
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShipped(order._id)}>
                          Shipped
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageOrders;
