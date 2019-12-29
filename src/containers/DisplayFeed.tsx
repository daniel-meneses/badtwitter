import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isObjectEmpty } from './../commons/helpers';
//import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';

// https://code.likeagirl.io/how-to-create-a-connected-hoc-with-react-and-redux-8631f7b1497

type Props = {
  ChildComponent: typeof React.Component,
  fetchData: any,
  dataName: any
};

export const displayFeed = ({ChildComponent, fetchData, dataName} : Props) => {

  class HOComponent extends Component<any>  {

    componentDidMount() {
      this.props.fetchData();
    }

    render() {
      // Assumes data, isFetching, error, are states in reducer
      const { data = {}, isFetching, error } = this.props[dataName];
      if (isFetching) {
        return (
          <div>Loading</div>
        );
      }

      if (error) {
        return (
          <div>Something is wrong. Please try again!</div>
        );
      }

      if (isObjectEmpty(data)) {
        return (
          <div>No Data!</div>
        );
      }

      return (
        <ChildComponent
          {...this.props}
        />
      );
    }
  }
  const dataSelector = (state :any) => state[dataName];
  const getData = () => createSelector(dataSelector, data => data);

  const mapStateToProps = (state :any) => {
    const data = getData();
    return {
      [dataName]: data(state),
    };
  };

  //HOComponent.displayName = `createInfoScreen(${getDisplayName(HOComponent)})`;

  return connect(
    mapStateToProps,
    { fetchData },
  )(HOComponent);
};
