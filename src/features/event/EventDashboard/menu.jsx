import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { reduxForm, Field } from "redux-form";
import { Grid, Segment, Form, Button, Item, Popup } from "semantic-ui-react";
import MenuList from "../EventList/MenuList";
import { deleteEvent, loadMenu } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { combineValidators, hasLengthLessThan } from "revalidate";
import EventActivity from "../EventActivity/EventActivity";
import EventForm from "../EventForm/EventForm";
import TextArea from "../../../app/common/form/TextArea";
import { stat } from "fs";

//loads menu from database
const mapState = state => ({
  events: state.events,
  menu: state.firestore.ordered.menu,
  loading: state.async.loading
});

//loads the possible action
const actions = {
  deleteEvent
};

const validate = hasLengthLessThan(255)({
  message: "Must be less than 255 characters."
});

//renders the menu for edition
class Menu extends Component {
  state = {
    var: {
      edition: false,
      itemId: false
    }
  };

  //use for deletion
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  //gets the category( app, entree, etc)
  filterCategory = cat => {
    let selected = this.props.menu.filter(table => {
      return table.category === cat;
    });
    return selected;
  };

  //shows edition form
  handleEdition = id => {
    console.log(id);
    const newstate = {
      edition: true,
      itemId: id
    };

    this.setState({ var: newstate });
    console.log(this.state.var.edition);
  };

  //hides edition form
  noEdition = () => {
    const newstate = {
      edition: false,
      itemId: this.state.var.itemId
    };

    this.setState({ var: newstate });
    console.log(this.state.var.edition, "noEdition");
  };

  //renders the menu
  render() {
    //const {selectedEvent} = this.state;
    const { menu, loading, events } = this.props;

    //console.log(events)
    const tempTotal = events.reduce((prev, cur) => prev + cur.price, 0);

    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <div>
        <Grid>
          <Grid.Column width={9}>
            <h2>Appetizer</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Appetizer"
              handleEdition={this.handleEdition}
            />
            <h2>Entree</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Entree"
              handleEdition={this.handleEdition}
            />
            <h2>Kid's Meals</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Kid's Meals"
              handleEdition={this.handleEdition}
            />
            <h2>Dessert</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Dessert"
              handleEdition={this.handleEdition}
            />
            <h2>Drinks</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Drinks"
              handleEdition={this.handleEdition}
            />
            <h2>Special of the Day</h2>
            <MenuList
              deleteEvent={this.handleDeleteEvent}
              menu={menu}
              arr="Special"
              handleEdition={this.handleEdition}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            {this.state.var.edition && (
              <EventActivity
                events={events}
                deleteItem={this.handleDeleteEvent}
                noEdition={this.noEdition}
                itemId={this.state.var.itemId}
                menu={menu}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

//exports new state
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "menu" }])(Menu));
