import React, { Component } from "react";
import BillItem from "./BillItem";
import { Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { handleComp } from "../eventActions";

class BillList extends Component {
  constructor() {
    super();
    this.state = { table: [] };
  }

  render() {
    const { bills } = this.props;
    console.log("bills", bills);

    return (
      <div>
        {bills &&
          bills.items.map(bill => (
            <BillItem key={bill.id} bill={bill} bills={bills} />
          ))}
      </div>
    );
  }
}

export default BillList;
