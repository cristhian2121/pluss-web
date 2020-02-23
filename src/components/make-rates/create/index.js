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
import * as productActions from '../../../actions/productActions'
import * as quotationActions from '../../../actions/quotationActions'

class CreateQuotationHook extends Component {

  preViewPDF = false;

  constructor(props) {
    console.log('props llegando 1: ', props);
    super(props)
    this.state = {
      downloadPDF: false,
      preView: false,
      dataInput: this.props.location.state,
      rendered: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.eventSavePDF = this.eventSavePDF.bind(this)
    // this.updatesQuotation = this.updatesQuotation.bind(this)
    // this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount() {
    const quotation = this.props.quotationReducer.quotation;
    console.log('quotation: ', quotation);
    if (this.props.productReducer.products.length) {
      this.setState({
        dataInput: {
          selectUpdate: {
            ...this.props.productReducer
          }
        }
      })
    }
    this.setState({
      rendered: true
    })

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
    window.open('/cotizacion', '_blank', '', true)
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
    // let updatesQuotation = this.props.location.state.selectUpdate ? this.props.location.state.selectUpdate : null
    return (
      <div>
        {/* <Menu /> */}
        {this.state.rendered && <FormQuotation
          eventCreateQuotation={this.createQuotation}
          preQuotation={this.props.quotationReducer.quotation}
          eventSavePDF={this.eventSavePDF}
          updateQuotation={this.state.dataInput}
        />}
        {/* {this.redirectToPDF()} */}
      </div>
    );
  }
}

// pass state to props (console.log(pros)) end i selected the into return

const mapStateToProps = reducers => {
  return {
    productReducer: reducers.productReducer,
    quotationReducer: reducers.quotationReducer
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    productActions,
    quotationActions
  }
}

// connect reducer to component
const CreateQuotation = connect(mapStateToProps, mapDispatchToProps)(CreateQuotationHook);
export {
  CreateQuotation
}