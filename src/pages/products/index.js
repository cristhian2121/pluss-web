import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


import Detail from '../../components/products/detail'
import conf from '../../config'

export class Products extends Component {
  constructor () {
    super()
    this.state = {
      dataProducts: [],
      detailProducts: {},
      open: false
    }
    // this.open = false
    this.dataProducts= []
  }
  componentDidMount() {
    this.getProducts()
  }
  
  getProducts = async() => {
    try {
      let response = await fetch(`${conf.api_products}`)
      // this.dataProducts = await response.json();
      this.setState({
        dataProducts: await response.json()
      })
      console.log('data', this.state.dataProducts);
    } catch (error) {
      console.log('error', error)
    }
  }
  productDetail = (dataProduct) => {
    console.log('dataProduct: ', dataProduct);
    if (dataProduct !== '' || dataProduct!== null) {
      console.log('entro el popuelo: ', dataProduct);
      // this.open = true

      this.setState({
        open: true, 
        detailProducts: dataProduct
      })
    }
  }
  render () {
      return (
        <div>
          <div className="title">
              Productos
          </div>
          <br/><br/>

          <form id="productsForm" >
            <Grid container spacing={12}>
              {this.state.dataProducts.map(function(obj){
                return (
                  <Grid container md={3} className="material-card">
                    <img className="img-product" alt="complex" src="https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png" />
                    <div>
                      {obj.descripcion}
                      {/* <Divider orientation="vertical" /> */}
                      <a><VisibilityIcon onClick={() => {this.productDetail(obj)}}/></a>
                    </div>
                  </Grid>
                )
              }, this)}
            </Grid>
          </form>
          <Dialog open={this.state.open}>
            <Detail selectDetail={this.state.detailProducts}/>

          </Dialog>
        </div>
      )
  }
}