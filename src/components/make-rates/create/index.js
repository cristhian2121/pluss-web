import React, { Component } from 'react'

// components
import { FormQuotation } from './formQuotation'

// redux 
import { connect } from 'react-redux'
import * as quotationActions from '../../../actions/quotationActions'

import { pdf } from '../../common/pdf'

class CreateQuotation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      downloadPDF: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
  }

  generatePDF(quotation) {
    console.log('quotation: ', quotation);
    this.setState({
      downloadPDF: true
    })
    pdf.GeneratePFD('a')

  }

  createQuotation() {

  }

  render() {
    console.log(this.props)
    console.log('***');
    return (
      <div>
        {/* {this.state.downloadPDF && <GeneratePFD />} */}
        <FormQuotation
          eventGeneratePDF={this.generatePDF}
          eventCreateQuotation={this.createQuotation} />
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