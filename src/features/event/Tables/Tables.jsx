import React, { Component } from "react";
import { Grid, Button, Container, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import BillList from "./BillList";
import { helpDone, refillDone, resetDone, readyDone } from "../eventActions";

//loads the activebill collection from database
const mapState = state => ({
  bills: state.firestore.ordered.ActiveBill,
  loading: state.async.loading
});

//gets the possible actions
const actions = {
  helpDone,
  refillDone,
  resetDone,
  readyDone
};

//component and local state
class Tables extends Component {
  constructor() {
    super();
    this.state = { table: {}, bill: false };
  }

  //handles colors for the tables
  handleColor = pos => {
    if (this.props.sayTable[pos].help) {
      return "red";
    }

    if (this.props.sayTable[pos].refill) {
      return "yellow";
    }

    if (this.props.sayTable[pos].ready) {
      return "blue";
    }

    if (this.props.sayTable[pos].active) {
      return "green";
    }
  };

  //selects the right table
  selectTable = num => {
    let selected = this.props.sayTable.filter(table => {
      return table.TableID === num;
    });
    console.log(selected);
    this.setState({ table: selected[0] });
    this.filterTable(num);
  };

  //filters to get right table
  filterTable = num => {
    console.log(this.props.bills);
    let selected = this.props.bills.filter(table => {
      return table.id === "Table" + num;
    });
    console.log("filtered bill", selected[0]);
    this.setState({ bill: selected[0] });
  };

  //calls the help table action
  handleHelp = table => {
    console.log("try help 1", table);
    this.props.helpDone(table);
  };

  //calls the refill action
  handleRefill = table => {
    console.log("try refill 1", table);
    this.props.refillDone(table);
  };

  ////calls the food ready action
  handleReady = table => {
    console.log("try ready 1", table);
    this.props.readyDone(table);
  };

  //calls the reset table action
  handleReset = table => {
    console.log("try reset 1", table);
    this.props.resetDone(table);
  };

  //renders table for main page
  render() {
    const { sayTable, bills } = this.props;

    return (
      <div>
        {sayTable && (
          <div>
            <Grid celled padded style={{ height: "10vh" }}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(0)}
                    content="Table 1"
                    onClick={() => this.selectTable(1)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(1)}
                    content="Table 2"
                    onClick={() => this.selectTable(2)}
                  />
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(2)}
                    content="Table 3"
                    onClick={() => this.selectTable(3)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(3)}
                    content="Table 4"
                    onClick={() => this.selectTable(4)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid celled padded style={{ height: "10vh" }}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(4)}
                    content="Table 5"
                    onClick={() => this.selectTable(5)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(5)}
                    content="Table 6"
                    onClick={() => this.selectTable(6)}
                  />
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(6)}
                    content="Table 7"
                    onClick={() => this.selectTable(7)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(7)}
                    content="Table 8"
                    onClick={() => this.selectTable(8)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid celled padded style={{ height: "10vh" }}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(8)}
                    content="Table 9"
                    onClick={() => this.selectTable(9)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(9)}
                    content="Table 10"
                    onClick={() => this.selectTable(10)}
                  />
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(10)}
                    content="Table 11"
                    onClick={() => this.selectTable(11)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(11)}
                    content="Table 12"
                    onClick={() => this.selectTable(12)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid celled padded style={{ height: "10vh" }}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(12)}
                    content="Table 13"
                    onClick={() => this.selectTable(13)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(13)}
                    content="Table 14"
                    onClick={() => this.selectTable(14)}
                  />
                </Grid.Column>

                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(14)}
                    content="Table 15"
                    onClick={() => this.selectTable(15)}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button
                    color={sayTable && this.handleColor(15)}
                    content="Table 16"
                    onClick={() => this.selectTable(16)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Segment>Selected Table: {this.state.table.TableID}</Segment>
                <Segment>
                  Help Status: {String(this.state.table.help)}{" "}
                  <Button
                    onClick={() => this.handleHelp(this.state.table)}
                    float="right"
                    content="Done"
                  />
                </Segment>
                <Segment>
                  Refill Status: {String(this.state.table.refill)}{" "}
                  <Button
                    onClick={() => this.handleRefill(this.state.table)}
                    float="right"
                    content="Done"
                  />
                </Segment>
                <Segment>
                  Ready Status: {String(this.state.table.ready)}{" "}
                  <Button
                    onClick={() => this.handleReady(this.state.table)}
                    float="right"
                    content="Done"
                  />
                </Segment>
                <Segment>
                  Active Status: {String(this.state.table.active)}{" "}
                  <Button
                    onClick={() => this.handleReset(this.state.table)}
                    float="right"
                    content="Done"
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                Table's Active Bill
                {this.state.bill && <BillList bills={this.state.bill} />}
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

//exports new state
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "ActiveBill" }])(Tables));
