import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class App extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default App

export const actionName = (param) => ({
  type: type,
  payload: payload
})

export const constantName = 'constantName'

const initialState = {

}

export default (state = initialState, action) => {
  switch (action.type) {

  case typeName:
    return { ...state }

  default:
    return state
  }
}
