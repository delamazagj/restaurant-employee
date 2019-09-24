import React, { Component } from "react";
import { Segment, Item, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { prepareOrder, submitCompleted } from "../eventActions";

const mapState = state => ({});

const actions = {};

class RevListItem extends Component {
  completeOrder = payment => {
    this.props.submitCompleted(payment);
  };

  render() {
    const { payment } = this.props; //destructor, alternative to call an element
    //would be {this.props.event.someElement like hostPhotoURL}

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>Table No. {payment.TableID}</Item.Header>
                <Segment>
                  Gross: ${payment.gross}
                  <br />
                  Tip: ${payment.tip}
                  <br />
                  Payment: ${payment.total}
                </Segment>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment.Group>
    );
  }
}
export default connect(
  mapState,
  actions
)(RevListItem);
