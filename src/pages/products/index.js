import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Divider from '@material-ui/core/Divider';

import conf from '../../config'

export class Products extends Component {
  constructor () {
    super()
    this.state = {
      dataProducts: []
    }
  }
  componentDidMount() {
    this.getProducts()
  }
  
  getProducts = async () => {
    try {
      let response = await fetch(`${conf.api_products}`)
      let data = await response.json();
      console.log('data', data);
      this.setState({
        dataProducts: data
      })
    } catch (error) {
      console.log('error', error)
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
                      <a><VisibilityIcon /></a>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </form>
        </div>
      )
  }
}