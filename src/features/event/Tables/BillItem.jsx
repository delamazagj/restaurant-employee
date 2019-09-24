import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { handleComp } from "../eventActions";

const mapState = state => ({});

const actions = {
  handleComp
};

class BillItem extends Component {
  handleCompDone = (bill, bills) => {
    console.log(bill);
    console.log(bills);
    this.props.handleComp(bill, bills);
  };

  render() {
    const { bill, bills } = this.props;
    return (
      <div>
        <Segment.Group>
          <Segment>item: {bill.name}</Segment>
          <Segment>
            price: {bill.price}
            <Button
              onClick={() => this.handleCompDone(bill, bills)}
              floated="right"
              color="blue"
              content="Comp"
            />
          </Segment>
          <Segment secondary>catgeory: {bill.category}</Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(BillItem);
