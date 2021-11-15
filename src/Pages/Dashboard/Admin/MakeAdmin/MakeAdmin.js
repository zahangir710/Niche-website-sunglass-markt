import React, { useRef, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import DashboardNav from "../../DashboardNav/DashboardNav";

const MakeAdmin = () => {
  const fieldRef = useRef();
  const [email, setEmail] = useState("");
  const handleOnBlur = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleMakeAdmin = () => {
    const user = { email };
    const proceed = window.confirm("Confirm Creating Admin? ");
    if (proceed) {
      fetch("https://hidden-refuge-12669.herokuapp.com/users/admin", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            alert("User made an Admin successfully");
            fieldRef.current.reset();
          }
        });
    }
  };
  return (
    <>
      <DashboardNav></DashboardNav>
      <Container className="my-5">
        <h2 className="text-center my-5">Make an Admin</h2>
        <InputGroup className="mb-3">
          <FormControl
            ref={fieldRef}
            onBlur={handleOnBlur}
            placeholder="User's Email"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button
            onClick={handleMakeAdmin}
            variant="outline-secondary"
            className="bg-warning text-dark"
            id="button-addon2"
          >
            Make Admin
          </Button>
        </InputGroup>
      </Container>
    </>
  );
};

export default MakeAdmin;
