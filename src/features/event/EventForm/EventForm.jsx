import React, { Component } from "react";
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan} from 'revalidate'
import cuid from 'cuid'
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent} from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import DateInput from '../../../app/common/form/DateInput'
import { throws } from "assert";

/*const emptyEvent = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
}*/

const mapState = (state, ownProps) =>{
    const eventId = ownProps.match.params.id;

    let event = {} //redux-forms takes care of this now
    

    if(eventId && state.events.length > 0){
        event = state.events.filter(event => event.id === eventId)[0]
    }

    return {
        initialValues: event
    }
}

const actions = {
    createEvent,
    updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired({message: 'Please provide a category'}),
    description: composeValidators(
        isRequired({message: 'Please enter a description'}),
        hasLengthGreaterThan(4)({message: 'Description needs to be longer...'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
})

class EventForm extends Component {
  
   /* componentDidMount(){ //lifecycle event, triggers re-rendering for setting state here
        if(this.props.selectedEvent !== null){
            this.setState({
                event: this.props.selectedEvent
            })
        }
    }
            THE USE OF THESE METHODS IS REPLACED BY REDUX
    /*componentWillReceiveProps(nextProps){
        //console.log('current: ', this.props.selectedEvent) basically diffing props to make changes when necessary
        //console.log('next: ', nextProps.selectedEvent)
        if(nextProps.selectedEvent !== this.props.selectedEvent){
            this.setState({
                event: nextProps.selectedEvent || emptyEvent
            })
        }
    }*/

    onFormSubmit = (values) => {
        values.date = moment(values.date).format()
        //console.log(values)
        //console.log(this.state.event) //property from Component, accesses refs
        if(this.props.initialValues.id){ //check for id, if true then its an existing event
            this.props.updateEvent(values)
            this.props.history.goBack();
        }else{

            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: 'assets/user.png',
                hostedBy: 'Bob'
            }
            this.props.createEvent(newEvent); //new event 
            this.props.history.push('/events')
        }
        
    }

  render() {
      const {invalid, submitting, pristine} = this.props;
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment>
                  <Header sub color='teal' content='Event Details'/>
                    <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                    <Field name='title' type='text' component={TextInput} placeholder='Give your event a name'/>
                    <Field name='category' type='text' component={SelectInput} options={category} placeholder='What is your event about'/>
                    <Field name='description' type='text' rows={3} component={TextArea} placeholder='Tell us about your event'/>
                    <Header sub color='teal' content='Event Location Details'/>
                    <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                    <Field name='venue' type='text' component={TextInput} placeholder='Event Venue'/>
                    <Field 
                        name='date' 
                        type='text' 
                        component={DateInput} 
                        dateFormat='YYYY-MM-DD HH:mm' 
                        timeFormat='HH:mm' 
                        showTimeSelect 
                        placeholder='Date and Time'/>

                    <Button disabled={invalid || submitting || pristine} positive type="submit">
                        Submit
                    </Button>
                    <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                    </Form>
                 </Segment>
            </Grid.Column>
        </Grid>
      
    );
  }
}
export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm));
