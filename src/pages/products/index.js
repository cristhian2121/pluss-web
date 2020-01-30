import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import { connect } from 'react-redux'


import Button from '@material-ui/core/Button';


import Detail from '../../components/products/detail'
import conf from '../../config'

import '../../styles/product.css'

import * as productActions from '../../actions/productActions';

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProducts: [],
      detailProducts: {},
      open: false,
      count: 0,
      productSelect: []
    }
  }

  componentDidMount() {
    const productsSelect = this.getProducts()
    console.log('this.props: ', this.props);
    console.log('productsSelect: ', productsSelect);
  }

  getProducts = async () => {
    try {
      let response = await fetch(`${conf.api_url}/product/`)
      const data = await response.json();
      console.log('data: ', data);
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
    console.log('dataProduct: ', dataProduct);
    this.props.addProduct(dataProduct)
  }

  render() {
    return (
      <div>
        <div className="title">
          <div className="col-12 px-0 d-flex">
            <div className="col-8 px-0">
              Productos
            </div>
            <div className="col-4 px-0 d-flex flex-row-reverse">
              {this.props.products.length}
              <LocalGroceryStoreIcon />
            </div>
          </div>
        </div>
        <br /><br />

        <form id="productsForm" >
          <Grid container spacing={12}>
            {this.state.dataProducts.map(function (obj) {
              return (
                <Grid container md={3} className="material-card">
                  <img className="img-product" alt="complex" src="https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png" />
                  <div>
                    <p>
                      {obj.descripcion}
                    </p>
                    <p>
                      Ref. {obj.referencia}
                    </p>
                    <div className="col-12 px-0 d-flex">
                      <div className="col-8 px-0">
                        ${obj.vlrUnitario} c/u
                      </div>
                      {/* <Divider orientation="vertical" /> */}
                      <div className="d-flex col-4 px-0">
                        <div className="icon-active d-flex justify-content-center align-items-center">
                          <Tooltip title="Ver detalle" arrow>
                            <VisibilityIcon onClick={() => { this.productDetail(obj) }} />
                          </Tooltip>
                        </div>
                        <div className="icon-active d-flex justify-content-center align-items-center">
                          <Tooltip title="Agregar producto" arrow>
                            <AddCircleIcon onClick={() => { this.addProduct(obj) }} />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
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