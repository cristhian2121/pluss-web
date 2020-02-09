import React, { PureComponent } from "react";

import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import { connect } from 'react-redux'

// services
import { ProductsService } from '../../services/products';


import Button from '@material-ui/core/Button';


import Detail from '../../components/products/detail'

// common
import conf from '../../config'
import Loader from '../../components/common/loader';

import '../../styles/product.css'

import * as productActions from '../../actions/productActions';

class Products extends PureComponent {

  productsService = new ProductsService()

  constructor(props) {
    super(props)
    this.state = {
      dataProducts: [],
      detailProducts: {},
      open: false,
      count: 0,
      productSelect: [],
      loader: true
    }
  }

  componentDidMount() {
    const productsSelect = this.getProducts()
    console.log('this.props: ', this.props);
    console.log('productsSelect: ', productsSelect);
  }

  getProducts = async () => {
    this.setState({ loader: true })
    const res = await this.productsService.getProducts();
    if (res.state) {
      this.setState({
        dataProducts: res.data.results,
        count: res.data.count,
        loader: false
      })
    }
    console.log('data', this.state.dataProducts);
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

  htmlProduct = () => (
    <div className="col-12 px-0 d-flex flex-wrap justify-content-between">
      {this.state.dataProducts.map(function (obj) {
        return (
          <div className="pl-1 pr-1 pb-3 ">
            <div class="card" style={{ width: '16.5rem', height: '25rem' }}>
              <img className="img-product" alt={obj.bame} src="https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png" />
              <div class="card-body card-body">
                <div className="px-0 card-text text-common">
                  {obj.detail}
                </div>

              </div>
              <div className="card-footer text-alter" style={{padding: '0.5rem 0.7rem'}}>
                <div className="py-0 px-0">
                  Ref. {obj.referency_id}
                </div>
                <div className="col-12 px-0 py-0 d-flex">
                  <div className="col-8 d-flex d-flex align-items-center px-0 py-0">
                    ${obj.more_info.vlrUnitario} c/u
                      </div>
                  <div className="d-flex col-4 px-0 py-0">
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
            </div>
          </div>
        )
      }, this)}
    </div>
  )

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

        <div className="col-12 px-0">
          {
            this.state.loader ?
              (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '50vh', width: '100%' }}>
                  <Loader size={70} />
                </div>
              )
              : this.htmlProduct()
          }
        </div>


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