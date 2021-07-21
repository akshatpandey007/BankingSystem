import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button, InputGroup } from "react-bootstrap";
import "./MakeTransaction.css";

class MakeTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allcustomers: [],
      selectFrom: "",
      selectTo: "",
      balance: "",
      transactionHistory: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/customers")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          allcustomers: result,
        });
      })
      .catch((err) => {
        console.log("failed to fetch customers");
      });
  }

  handleSelectFromChange = (event) => {
    this.setState({
      selectFrom: event.target.value,
    });
  };

  handleSelectToChange = (event) => {
    this.setState({
      selectTo: event.target.value,
    });
  };

  handleBalanceChange = (event) => {
    this.setState({
      balance: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let senderbalance = 0;

    for (const val of this.state.allcustomers) {
      if (val.name === this.state.selectFrom) {
        senderbalance = val.amount;
      }
    }

    if (senderbalance - this.state.balance < 0) {
      return alert("Insufficient Balance , Transaction Failed");
    } else {
      fetch("http://localhost:3002/transaction", {
        method: "put",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          sender_name: this.state.selectFrom,
          bal: this.state.balance,
          reciever_name: this.state.selectTo,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch("http://localhost:3002/transactionHistory", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sender_name: this.state.selectFrom,
                bal: this.state.balance,
                reciever_name: this.state.selectTo,
              }),
            })
              .then((response) => response.json())
              .then((transactionResult) => {
                this.setState({
                  transactionHistory: transactionResult,
                });
              });
          }
        })
        .catch((err) => {
          console.log("failed to make transaction");
        });

      alert(
        `Transaction Successful,
        amount of Rs. ${this.state.balance} transferred from ${this.state.selectFrom} to ${this.state.selectTo}`
      );
      event.preventDefault();
    }
  };

  render() {
    let button=<Button variant="btn btn-secondary">Submit</Button>
    if (this.state.selectFrom && this.state.selectTo && this.state.balance) {
      button = (
        <Button type="submit" className="my-3" style={{ width: "125px" }}>
          Submit
        </Button>
      );
    }

    return (
      <div className="form-container">
        <h3 className="text-muted">Transaction Form</h3>
        <Form inline onSubmit={this.handleSubmit} className="container">
          <div className="container">
          <div className="row"> 
          <div className="col">
          {/* <Form.Label className="d-inline mx-3" htmlFor="inlineFormFrom">
            From
          </Form.Label> */}
           <InputGroup  style = {{width : '100%'}}>
            <InputGroup.Prepend>
              <InputGroup.Text>From</InputGroup.Text>
            </InputGroup.Prepend>
          <Form.Control
            as="select"
            className="my-1 mr-md-3"
            id="inlineFormFrom"
            custom
            onChange={this.handleSelectFromChange}
            style={{ width: "75%" }}
          >
            <option value=""></option>
            {this.state.allcustomers.map((val, key) => {
              return (
                <option value={val.name} key={key}>
                  {val.name}
                </option>
              );
            })}
          </Form.Control>
          </InputGroup>
          </div>
          <div className="col">
          <InputGroup  style = {{width : '100%'}}>
            <InputGroup.Prepend>
              <InputGroup.Text>To</InputGroup.Text>
            </InputGroup.Prepend>
          {/* <Form.Label className="d-inline mx-3" htmlFor="inlineFormTo">
            To
          </Form.Label> */}
          <Form.Control
            as="select"
            className="my-1 mr-sm-3"
            id="inlineFormTo"
            custom
            onChange={this.handleSelectToChange}
            style={{ width: "75%" }}
          >
            <option value=""></option>
            {this.state.allcustomers.map((val, key) => {
              return (
                <option value={val.name} key={key}>
                  {val.name}
                </option>
              );
            })}
          </Form.Control>
          </InputGroup>
          </div>
          </div>
          <div className="row my-2">
          <div className="col">
          <InputGroup  style = {{width : '100%'}}>
            <InputGroup.Prepend>
              <InputGroup.Text>Amount</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              value={this.state.balance}
              onChange={this.handleBalanceChange}
              
            />
          </InputGroup>
          </div>
          </div>
          {button}
          </div>
        </Form>
      </div>
    );
  }
}

export default MakeTransaction;
