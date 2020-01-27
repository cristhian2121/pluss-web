import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { connect } from 'react-redux'


import Button from '@material-ui/core/Button';


import Detail from '../../components/products/detail'
import conf from '../../config'

import '../../styles/product.css'

import * as productActions from '../../actions/productActions';

class Products extends Component {
  constructor() {
    super()
    this.state = {
      dataProducts: [],
      detailProducts: {},
      open: false,
      count: 0
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    try {
      let response = await fetch(`${conf.api_url}/product/`)
      const data = await response.json();
      this.setState({
        dataProducts: data.results,
        count: data.count
      })
      console.log('data', this.state.dataProducts);
    } catch (error) {
      console.log('error', error)
    }
  }

  productDetail = (dataProduct) => {
    if (dataProduct) {
      this.setState({
        open: true,
        detailProducts: dataProduct
      })
    }
  }

  addProduct = (dataProduct) => {

  }

  render() {
    return (
      <div>
        <div className="title">
          Productos
        </div>
        <br /><br />

        <form id="productsForm" >
          <Grid container spacing={12}>
            {this.state.dataProducts.map(function (obj) {
              return (
                <Grid container md={3} className="material-card">
                  <img className="img-product" alt="complex" src="https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png" />
                  <div>
                    {obj.descripcion}<br />
                    Ref. {obj.referencia} <br />
                    ${obj.vlrUnitario} c/u
                      {/* <Divider orientation="vertical" /> */}
                    <Tooltip title="Ver detalle" arrow>
                      <VisibilityIcon className="icon-active" onClick={() => { this.productDetail(obj) }} />
                    </Tooltip>
                    <Tooltip title="Agregar producto" arrow>
                      <AddCircleIcon className="icon-active" onClick={() => { this.addProduct(obj) }} />
                    </Tooltip>
                  </div>
                </Grid>
              )
            }, this)}
          </Grid>
        </form>
        <Dialog
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
        >
          <Detail selectDetail={this.state.detailProducts} />
        </Dialog>
      </div>
    )
  }


}

const mapStateToProps = (reducers) => {
  return reducers.productReducer;
}

const ProductComponent = connect(mapStateToProps, productActions)(Products)
  
export {
  ProductComponent
}