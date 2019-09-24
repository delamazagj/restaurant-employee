import React, { Component } from "react";
import RevListItem from "./RevListItem";

class RevList extends Component {
  render() {
    const { payment, deleteEvent } = this.props;

    return (
      <div>
        {payment &&
          payment.map(payment => (
            <RevListItem
              key={payment.id}
              payment={payment}
              deleteEvent={deleteEvent}
            />
          ))}
      </div>
    );
  }
}
export default RevList;
