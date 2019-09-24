import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  Segment,
  Button,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";
import OrderItem from "./OrderItem";
import cuid from "cuid";
import { submitOrder, deleteEvent, addToBill } from "../eventActions";
import { firestoreConnect } from "react-redux-firebase";
import EventForm from "./EventForm";
//importing all components

//loading the state and the activebill collection from database
const mapState = state => ({
  //getting data from the store
  loading: state.test.loading,
  activeBills: state.firestore.ordered.ActiveBill
});

//possible actions
const actions = {
  submitOrder,
  addToBill,
  deleteEvent
};

//Eventactivity component
class EventActivity extends Component {
  constructor() {
    super();
    this.state = { notes: "" }; //sets the local state
  }

  //to handle changes on the form and update state
  handleChange = (e, { name, value }) => {
    //console.log("Im called")
    this.setState({ [name]: value });
  };

  //for new orders
  submitNewOrder = (items, bills) => {
    if (items.length > 0) {
      this.props.submitOrder(items, this.state.notes); //new order
      this.props.addToBill(items, bills[0]);
      items.map(item => this.props.deleteEvent(item.id)); //delete current items after sent to firebase
    }
  };

  //gets total
  calcTotal = bills => {
    let total = bills[0].items.reduce((prev, cur) => prev + cur.price, 0);
    return total;
  };

  render() {
    const {
      deleteItem,
      events,
      activeBills,
      noEdition,
      itemId,
      menu
    } = this.props;
    const { notes } = this.state;
    //destructuring state and props

    //rendering the form
    return (
      <div>
        <Header>Edit Item</Header>
        <div>
          <EventForm noEdition={noEdition} itemId={itemId} menu={menu} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "ActiveBill" }])(EventActivity));
