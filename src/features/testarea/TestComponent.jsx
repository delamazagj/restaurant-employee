import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { incrementAsync, decrementAsync } from './testActions'
import { openModal } from '../modals/modalActions'

const mapState = (state) => ({ //getting data from the store
    data: state.test.data,
    loading: state.test.loading
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

class TestComponent extends Component {
  render() {
    const {incrementAsync, decrementAsync, data, openModal, loading} = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color='green' content='Increment'/>
        <Button loading={loading} onClick={decrementAsync} color='red' content='Decrement'/>
        <Button onClick={() => openModal('TestModal', {data: 42})} color='teal' content='Open Modal'/>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent) //mapsstate with a Higher order component