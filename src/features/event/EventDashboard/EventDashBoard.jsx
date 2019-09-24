import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Header } from "semantic-ui-react";
import { deleteEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { stat } from "fs";
import Tables from "../Tables/Tables";

const mapState = state => ({
  seeTable: state.firestore.ordered.TableStatus,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

class EventDashBoard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
    /*const updatedEvents = this.state.events.filter(e => e.id !== eventId); //creates new array of events that dont match event id
    this.setState({
        events: updatedEvents
    })*/
  };
  render() {
    //const {selectedEvent} = this.state;
    const { events, loading, seeTable } = this.props;
    //console.log(menus)
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <div>
        <Grid>
          <Grid.Column width={12}>
            <Tables sayTable={seeTable} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "TableStatus" }])(EventDashBoard));
