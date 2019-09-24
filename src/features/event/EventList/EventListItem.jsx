import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'




class EventListItem extends Component {
  render() {

    const {event, deleteEvent}  = this.props; //destructor, alternative to call an element
    //would be {this.props.event.someElement like hostPhotoURL}

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>Table ID: {event.TableID}</Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment secondary>
            stuff, map here later
        </Segment>
        <Segment clearing>
          <Button onClick={deleteEvent(event.id)}as="a" color="blue" floated="right" content="Delivered" />
        </Segment>
      </Segment.Group>
    );
  }
}
export default EventListItem; 
