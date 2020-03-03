import React, { PureComponent } from "react";

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import { connect } from 'react-redux'

// services
import { ProductsService } from '../../services/products';
import Button from '@material-ui/core/Button';
import Detail from '../../components/products/detail'

// common
import conf from '../../config'
import Loader from '../../components/common/loader';
import * as productActions from '../../actions/productActions';

// Style
import '../../styles/product.css'

// Component
import { ProductIndividual } from './product-individual';
import AlertDialog from '../../components/common/confirm'


class Products extends PureComponent {

  productsService = new ProductsService()
  longitud = 0
  productsAux = [];

  constructor(props) {
    super(props)
    console.log('Init');
    this.state = {
      dataProducts: [],
      detailProducts: {},
      open: false,
      count: 0,
      loader: true,
      products: props.products,
      productsSelecteds: [],
      units: [],
      showDialogUnits: false,
    }
    this.addProduct = this.addProduct.bind(this);

    // store.subscribe(() => {
    //   console.log('paso');
    //   this.setState({
    //     productDetail: store.getProducts()
    //   })
    // })
  }

  componentDidMount() {
    this.getProducts()
    if (this.state.products.length) {
      this.setState({
        productsSelecteds: this.state.products.map(_ => _.id)
      })
    }
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
      console.log('dataProduct: ', dataProduct);
      // this.setState({
      //   open: true,
      //   detailProducts: dataProduct
      // })
    }
  }

  addProduct = (dataProduct) => {
    console.log('dataProduct: ', dataProduct);
    // this.props.addProduct(dataProduct);
    console.log('dataProduct.id: ', dataProduct.id);
    this.productsAux.push(dataProduct)
    this.setState({ productsSelecteds: [...this.state.productsSelecteds, dataProduct.id] });
  }

  goToCreateQuotation = () => {
    console.log('***');
    if (!this.state.units.length) {
      this.props.addProduct(this.state.prod);
      console.log('xasd');
      this.setState({
        showDialogUnits: true
      });
    }
  }

  addUnits = (_units) => {
    console.log('_units', _units);
    if (this.productsAux.length) {
      const productsWithUnits = this.productsAux.map(_ => {
        _.units = _units
        return _
      })
      this.props.addProduct(productsWithUnits);
      this.props.addUnits(_units);
    }
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
              {this.state.productsSelecteds.length}
              <span className="store-car" onClick={this.goToCreateQuotation}>
                <LocalGroceryStoreIcon />
              </span>
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
              :
              (
                <div className="col-12 px-0 d-flex flex-wrap justify-content-between">
                  {this.state.dataProducts.map(product => {
                    let selected = this.state.productsSelecteds.indexOf(product.id) < 0 ? false : true;
                    console.log('selected: ', selected);
                    return (
                      <ProductIndividual
                        key={product.id}
                        product={product}
                        productDetail={obj => this.productDetail(obj)}
                        addProduct={obj => this.addProduct(obj)}
                        selected={selected} />)
                  })}
                </div>
              )
          }
        </div>


        <Dialog
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
        >
          <Detail selectDetail={this.state.detailProducts} />
        </Dialog>
        {this.state.showDialogUnits &&
          <AlertDialog
            option='units'
            open={this.state.showDialogUnits}
            close={() => this.setState({ showDialogUnits: false })}
            confirm={this.addUnits}
          />}
      </div>
    )
  }

}

// Add reducers
const mapStateToProps = (reducers) => {
  return reducers.productReducer;
}

// Connect actions between redurcers with the component
const ProductComponent = connect(mapStateToProps, productActions)(Products)

export {
  ProductComponent
}