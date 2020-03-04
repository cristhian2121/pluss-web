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
      redirectList: false
    }
    this.createQuotation = this.createQuotation.bind(this)
    this.eventSavePDF = this.eventSavePDF.bind(this)
    this.endQuotation = this.endQuotation.bind(this)
    // this.updatesQuotation = this.updatesQuotation.bind(this)
    // this.generatePDF = this.generatePDF.bind(this)
  }

  componentDidMount() {
    const quotation = this.props.quotationReducer.quotation;
    console.log('quotation: ', quotation);
  }

  eventSavePDF(quotation) {
    console.log('quotation: ', quotation);
    window.open('/cotizacion', '_blank','',true)
  }

  redirectToPDF() {
    if (this.preViewPDF) {
      this.props.history.push('/cotizacion')
    }
  }

  createQuotation(data) {
    console.log('data: ', data);
    this.props.createQuotation({ ...data })

    fetch(`${conf.api_url}/quotation/`,{ method: 'POST', body: JSON.stringify(data),
      headers:{ 'Content-Type': 'application/json' }})
      .then(async (response) => {
        let resp = await response.json()

        if (response.status === 200 ||  response.status == 201){
          // this.setState({
          //   OpenAlert: {
          //     open: true,
          //     message: 'La cotización se creo correctamente.',
          //     type:'success'
          //   }
          // })        
        }
    })
    .catch(error => console.log('Error: ', error))
  }

  updateQuotations (data) {
    console.log('data update index: ', data);
    let idSelectUpdate = data.id
    let dataEmail = data.email

    fetch(`${conf.api_url}/quotation/${idSelectUpdate}/`,{
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      let resp = await response.json()
      console.log('resp update: ', resp);

      if (response.status === 200 ||  response.status == 201){
        // this.setState({
        //   dataQuo: resp
        // //   open: true,
        // //   message: 'La cotización se actualizo correctamente.',
        // //   type:'success'
        // })
        if (dataEmail) {
          dataEmail.client = resp.client
          dataEmail.url = window.origin
          console.log('dataEmail: ', dataEmail);

          this.endQuotation(dataEmail)
        }

        // setOpenEmail && setRedirectList(true)  
      }
    })
    .catch(error => console.log('Error: ', error))
  }

  endQuotation (quotation) {
    console.log('data email: ', quotation)

    // quotation.quotation.id ? this.updateQuotations(quotation.quotation) : this.createQuotation(quotation)
    // let data = quotation
    // data.url = window.origin
    // // let data.url = origin
    // data.id = this.state.dataQuo
    // console.log('data llega al index: ', data);
    
    fetch(`${conf.api_url}/quotation/send_email/`,{ method: 'POST', body: JSON.stringify(quotation),headers:{ 'Content-Type': 'application/json' } })
    .then(async (response) => {
      console.log('response mail: ', response);
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
          updateQuotation={this.props.location.state}
          // endQuotation = {this.endQuotation}
          updateQuotations = {this.updateQuotations}
        />          
        {this.state.OpenAlert && <Redirect to={{ pathname: '/cotizaciones', state: this.state.openAlert}}/>}
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