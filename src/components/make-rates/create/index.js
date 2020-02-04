import React, { Component } from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'

// components
import { FormQuotation } from './formQuotation'
import { GeneratePDF } from '../../common/pdf'
import { Menu } from '../../common/nav-bar'

// redux
import { connect } from 'react-redux'
import * as quotationActions from '../../../actions/quotationActions'
import { getQuotationActive } from '../../../actions/quotationActions'

class CreateQuotationHook extends Component {

  preViewPDF = false;

  constructor(props) {
    console.log('props llegando 1: ', props);
    super(props)
    this.state = {
      downloadPDF: false,
      preView: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.eventSavePDF = this.eventSavePDF.bind(this)
    // this.updatesQuotation = this.updatesQuotation.bind(this)
    // this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount() {
    const quotation = this.props.quotation;
    console.log('quotation: ', quotation);
    // const $navBar = document.querySelector('#nav-var-pluss')
    // $navBar.style.visibility = 'visible'
  }

  eventSavePDF(quotation) {
    console.log('quotation: ', quotation);
    // this.props.createQuotation(quotation);
    // this.setState({ preView: true })
    // this.preViewPDF = true
    // this.redirectToPDF()
    // const $link = document.querySelector('#new-tap');
    // $link.print()
    // this.amor($link)
    window.open('/cotizacion', '_blank','',true)
  }

  // amor($link) {
  //   let mywindow = window.open('', 'PRINT', 'height=400,width=600');

  //   mywindow.document.appendChild(
  //     $link
  //   )

  //   mywindow.document.close(); // necessary for IE >= 10
  //   mywindow.focus(); // necessary for IE >= 10*/

  //   mywindow.print();
  //   mywindow.close();
  // }

  redirectToPDF() {
    if (this.preViewPDF) {
      // return <Redirect to='/cotizacion' push={true} />
      
      this.props.history.push('/cotizacion')
    }
  }

  createQuotation(data) {
    this.props.createQuotation({ ...data })
  }

  render() {
    console.log('***', this.props)
    // let updatesQuotation = this.props.location.state.selectUpdate ? this.props.location.state.selectUpdate : null
    return (
      <div>
        {/* <Menu /> */}
        <FormQuotation
          eventCreateQuotation={this.createQuotation}
          preQuotation={this.props.quotation}
          eventSavePDF={this.eventSavePDF}
          updateQuotation={this.props.location.state}
        />          
        {/* {this.redirectToPDF()} */}
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