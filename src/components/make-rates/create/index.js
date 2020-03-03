import React, { Component } from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'

// components
import { FormQuotation } from './formQuotation'
import conf from '../../../config'

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
      OpenAlert: null,
      redirectList: false,
      productReducerAux: {
        selectUpdate: {
          products: this.props.productReducer.products,
          units: this.props.productReducer.units,
        }
      } // Create for pass product from products
    }
    console.log('this.props.location.state: ', this.props.location.state);
    this.createQuotation = this.createQuotation.bind(this)
    this.eventSavePDF = this.eventSavePDF.bind(this)
    // this.updatesQuotation = this.updatesQuotation.bind(this)
    // this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount() {
    console.log('************************************************************************');
    if (this.props.productReducer.products.length) {
      this.setState({
        productReducerAux: {
          selectUpdate: {
            products: this.props.productReducer.products,
            units: this.props.productReducer.units,
            selectUpdate: 1
          }
        }
      })
    }
  }

  eventSavePDF(quotation) {
    console.log('quotation: ', quotation);
    window.open('/cotizacion', '_blank', '', true)
  }

  redirectToPDF() {
    if (this.preViewPDF) {
      this.props.history.push('/cotizacion')
    }
  }

  createQuotation(data) {
    this.props.createQuotation({ ...data })

    fetch(`${conf.api_url}/quotation/`, {
      method: 'POST', body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (response) => {
        let resp = await response.json()

        if (response.status === 200 || response.status == 201) {
          this.setState({
            OpenAlert: {
              open: true,
              message: 'La cotización se creo correctamente.',
              type: 'success'
            }
          })
        }
      })
      .catch(error => console.log('Error: ', error))
  }

  endQuotation(data) {
    console.log('data llega al index: ', data);
    fetch(`${conf.api_url}/quotation/send_email/`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then(async (response) => {
        console.log('response: ', response);
        let resp = response.json()
        console.log('entro al senemail: ', resp);
      })
      .catch(e => console.log('no entro al send Email', e))
  }

  render() {
    return (
      <div>
        <FormQuotation
          eventCreateQuotation={this.createQuotation}
          preQuotation={this.props.quotationReducer.quotation}
          eventSavePDF={this.eventSavePDF}
          updateQuotation={this.props.location.state || {...this.state.productReducerAux}}
          endQuotation={this.endQuotation}
        />
        {this.state.OpenAlert && <Redirect to={{ pathname: '/cotizaciones', state: this.state.openAlert }} />}
      </div>
    );
  }
}

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