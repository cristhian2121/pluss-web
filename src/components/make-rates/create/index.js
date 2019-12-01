import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

// components
import { FormQuotation } from './formQuotation'

// redux 
import { connect } from 'react-redux'
import * as quotationActions from '../../../actions/quotationActions'

class CreateQuotationHook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      downloadPDF: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
  }

  generatePDF(quotation) {
    this.props.createQuotation(quotation);
  }

  createQuotation(data) {
    this.props.createQuotation({ ...data })
  }

  render() {
    console.log('***', this.props)
    return (
      <div>
        {/* {this.state.downloadPDF && <GeneratePFD />} */}
        <FormQuotation
          eventGeneratePDF={this.generatePDF}
          eventCreateQuotation={this.createQuotation} />
        <Link to="/cotizacion" >amor</Link>
      </div>
    );
  }
}

// pass state to props (console.log(pros)) end i selected the into return

const mapStateToProps = (reducers) => {
  return reducers.quotationReducer;
};

// connect reducer to component
const CreateQuotation = connect(mapStateToProps, quotationActions)(CreateQuotationHook);
export {
  CreateQuotation
}