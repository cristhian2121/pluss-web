import React, { Component } from 'react'

// components
import { FormQuotation } from './formQuotation'

// redux 
import { connect } from 'react-redux'
import * as quotationActions from '../../../actions/quotationActions'

class CreateQuotation extends Component {

  render() {
    console.log(this.props)
    console.log('***');
    return (
      <div>
        <FormQuotation />
      </div>
    );
  }
}

// pass state to props (console.log(pros)) end i selected the into return

const mapStateToProps = (reducers) => {
  console.log('reducers.quotationReducer: ', reducers.quotationReducer);
  return reducers.quotationReducer;
};

// connect reducer to component
const CreateQuotations = connect(
  mapStateToProps,
  quotationActions
  )(CreateQuotation);
export {
  CreateQuotations
}