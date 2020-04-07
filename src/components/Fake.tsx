import React from "react"
import AppWithStore from '../containers/App/AppWithStore'

export default class Fake extends React.Component<any, any> {

  render() {
      return (
            <div className="App">
            <AppWithStore />
            </div>
      );
  }
}
