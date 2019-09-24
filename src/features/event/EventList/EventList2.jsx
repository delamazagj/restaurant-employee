import React, { Component } from 'react'
import EventListItem from './EventListItem'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { deleteEvent } from '../eventActions'
const mapState = state => ({
  events: state.firestore.ordered.completed,
  loading: state.async.loading
})

const actions = {
  deleteEvent
}
class EventList extends Component {

  render() {
    const {events, deleteEvent} = this.props;
    return (
      <div>
        {events && events.map((event) => (
          <EventListItem key ={event.id} event={event}  deleteEvent = {deleteEvent}/>
        ))}
        
      </div>
    )
  }
}
export default connect(mapState, actions)(firestoreConnect([{collection: 'completed'}])(EventList)); 