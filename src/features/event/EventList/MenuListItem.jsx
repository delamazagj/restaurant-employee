import React, { Component } from "react";
import { Segment, Item, Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";
import { createEvent } from "../eventActions";

//loads database
const mapState = state => ({
  //getting data from the store
  loading: state.test.loading
});

//loads actions
const actions = {
  createEvent
};

//renders each items and its edit button
class MenuListItem extends Component {
  addToCart = (name, price, category) => {
    //console.log(values)
    //console.log(this.state.event) //property from Component, accesses refs

    const newEvent = {
      name: name,
      price: price,
      id: cuid(),
      category: category
    };
    this.props.createEvent(newEvent); //new event
  };

  editMenu = () => {
    this.props.handleEdition(this.props.item.id);
  };

  render() {
    const { item } = this.props; //destructor, alternative to call an element
    //would be {this.props.event.someElement like hostPhotoURL}

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={item.image}
                data-content={item.calories}
              />
              <Item.Content>
                <Popup
                  key={item.name}
                  trigger={<Item.Header as="a">{item.name}</Item.Header>}
                  header="Calories"
                  content={item.calories}
                />
                <Item.Description>
                  <span clearing>${item.price}</span>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>
          <span>{item.description}</span>
          <Button
            onClick={() => this.editMenu()}
            color="green"
            floated="right"
            content="Edit"
          />
        </Segment>
      </Segment.Group>
    );
  }
}
export default connect(
  mapState,
  actions
)(MenuListItem);
