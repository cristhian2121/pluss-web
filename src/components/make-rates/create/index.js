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

class CreateQuotationHook extends Component {

  preViewPDF = false;

  constructor(props) {
    super(props)
    this.state = {
      downloadPDF: false,
      preView: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount(){
    // const $navBar = document.querySelector('#nav-var-pluss')
    // $navBar.style.visibility = 'visible'
  }

  generatePDF(quotation) {
    this.props.createQuotation(quotation);
    this.setState({ preView: true })
    this.preViewPDF = true
    this.redirectToPDF()
    const $link = document.querySelector('#new-tap');
    // $link.print()
    // this.amor($link)
    // window.open('/cotizacion', '_blank','',true)
  }

  amor($link) {
    let mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.appendChild(
      $link
    )

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
  }

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
    return (
      <div>
        {/* <Menu /> */}
        <FormQuotation
          eventGeneratePDF={this.generatePDF}
          eventCreateQuotation={this.createQuotation} />
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