import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { editItem } from "../eventActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({});

//action to edit menu
const actions = {
  editItem
};

//compnent and local state
class EventForm extends Component {
  state = {
    event: {
      calories: 0,
      category: "",
      description: "",
      image: "",
      name: "",
      price: 0
    }
  };

  //submit event
  onFornmSubmit = evt => {
    evt.preventDefault();
    console.log(this.state.event);
    if (this.state.event.name !== "")
      this.props.editItem(this.state.event, this.props.menu, this.props.itemId);
    this.props.noEdition();
  };

  //to handle changes in form
  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  //renders the form for the edition of the selected item
  render() {
    const { handleCancel, noEdition, itemId, menu } = this.props;
    const { event } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFornmSubmit}>
          <Form.Field>
            <label>Calories</label>
            <input
              name="calories"
              onChange={this.onInputChange}
              value={event.calories}
              placeHolder="Calories"
            />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <input
              name="category"
              onChange={this.onInputChange}
              value={event.category}
              placeholder="Category"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              name="description"
              onChange={this.onInputChange}
              value={event.description}
              placeholder="Description"
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              name="image"
              onChange={this.onInputChange}
              value={event.image}
              placeholder="Image"
            />
          </Form.Field>
          <Form.Field>
            <label>Name</label>
            <input
              name="name"
              onChange={this.onInputChange}
              value={event.name}
              placeholder="Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              name="price"
              onChange={this.onInputChange}
              value={event.price}
              placeholder="Price"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={() => noEdition()}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
//exports the new state
export default connect(
  mapState,
  actions
)(EventForm);
