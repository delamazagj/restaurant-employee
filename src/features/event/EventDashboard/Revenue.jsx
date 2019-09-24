import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Segment, Item } from "semantic-ui-react";
import RevList from "../EventList/RevList";
import { deleteEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  payment: state.firestore.ordered.payment
});

const actions = {
  deleteEvent
};

class Revenue extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
    /*const updatedEvents = this.state.events.filter(e => e.id !== eventId); //creates new array of events that dont match event id
    this.setState({
        events: updatedEvents
    })*/
  };

  calcIncome = () => {
    let val = this.props.payment.reduce((prev, cur) => prev + cur.total, 0);
    return val;
  };

  calcExpense = () => {
    let val = this.props.payment.reduce((prev, cur) => prev + cur.noItems, 0);
    val = val * 2;
    return val;
  };

  calcTips = () => {
    let val = this.props.payment.reduce((prev, cur) => prev + cur.tip, 0);
    return val;
  };

  render() {
    //const {selectedEvent} = this.state;
    const { payment, events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <div>
        <Grid>
          <Grid.Column width={16}>
            <Segment.Group>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header>Revenue</Item.Header>
                      {payment && (
                        <Segment>
                          Income: ${this.calcIncome()}
                          <br />
                          <br />
                          Expenses: ${this.calcExpense()}
                          <br />
                          <br />
                          Tips: ${this.calcTips()}
                          <br />
                          <br />
                          Tip per employee: ${this.calcTips() / 2}
                          <br />
                        </Segment>
                      )}
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <RevList
              deleteEvent={this.handleDeleteEvent}
              events={events}
              payment={payment}
            />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "payment" }])(Revenue));
