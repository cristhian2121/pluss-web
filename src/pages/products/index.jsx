import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";

// services
import { ProductsService } from "../../services/products";
import Button from "@material-ui/core/Button";
import Detail from "../../components/products/detail";

// common
import conf from "../../config";
import Loader from "../../components/common/loader";
import * as productActions from "../../actions/productActions";
import { assembleUrlPage } from "../../utils/pagination-utils";

// Style
import "../../styles/product.css";
import "./styles.css";

// Component
import { ProductIndividual } from "./product-individual";
import AlertDialog from "../../components/common/confirm";
import { FilterComponent } from "../../components/common/filters/filter-component.jsx";

class Products extends PureComponent {
  productsService = new ProductsService();
  longitud = 0;
  productsAux = [];
  externalQuery = true;
  nextPage = "";
  scrollMemo = 0;
  scrolling = false;
  openfilters = false;

  fieldsFilter = [
    {
      id: "referency_id",
      type: "input",
      name: "referency_id",
      placeHolder: "Referencia del producto",
      query: `${conf.api_url}/product?referency_id=_referency_id`,
    },
    {
      id: "provier_name",
      type: "select",
      name: "provier_name",
      placeHolder: "Proveedor",
      data: [
        {
          value: 0,
          text: "Todos",
        },
        {
          value: conf.PROVEEDORES.MPPROMOCIONALES,
          text: conf.PROVEEDORES.MPPROMOCIONALES,
        },
        {
          value: conf.PROVEEDORES.PRUEBA,
          text: conf.PROVEEDORES.PRUEBA,
        },
      ],
      query: `${conf.api_url}/product?provier_name=_provier_name`,
    },
    {
      id: "name",
      type: "input",
      name: "name",
      placeHolder: "Nombre del producto",
      query: `${conf.api_url}/product?name=_name`,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataProducts: [],
      dataProductsDisplay: [],
      detailProducts: {},
      open: false,
      count: 0,
      loader: true,
      products: props.products,
      productsSelecteds: [],
      units: [],
      showDialogUnits: false,
    };
    this.addProduct = this.addProduct.bind(this);
    this.myRef = React.createRef();
  }

  /**
   * suscribe to scroll
   */
  handleScroll = () => {
    if (document.documentElement.scrollTop) {
      this.scrollMemo = document.documentElement.scrollTop;
    }
  };

  hadleClickFilters = () => {
    const $element = document.getElementById("js-products-filters");
    this.openfilters
      ? $element.classList.remove("filter__show")
      : $element.classList.add("filter__show");
    this.openfilters = !this.openfilters
  };

  /**
   * Validate if scroll full so when new products page
   */
  observerElement() {
    const element$ = new IntersectionObserver((change) => {
      const { isIntersecting } = change[0];

      // If exist scrolling set scroll to value from handleScroll
      if (this.scrolling) {
        window.scroll(0, this.scrollMemo - 500);
        this.scrolling = false;
      }
      if (isIntersecting && this.state.dataProducts.length) {
        this.scrolling = true;
        this.getProducts();
      }
    });
    element$.observe(this.myRef.current);
  }

  componentDidMount() {
    // reset scroll
    this.scrolling = 0;

    this.getProducts();
    // if (this.state.products.length) {
    //   this.setState({
    //     productsSelecteds: this.state.products.map((_) => _.id),
    //   });
    // }
    this.observerElement();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Get products of 50 to 50
   */
  getProducts = async () => {
    this.setState({ loader: true });
    // Validate if is necesary other page
    let next = "";
    if (this.nextPage) {
      next = this.nextPage.split("?")[1];
    }

    const res = await this.productsService.getProducts(next);
    if (res.state) {
      this.nextPage = res.data.next;
      this.setState({
        dataProducts: [...this.state.dataProductsDisplay, ...res.data.results],
        dataProductsDisplay: [
          ...this.state.dataProductsDisplay,
          ...res.data.results,
        ],
        count: res.data.count,
        loader: false,
      });
    }
  };

  productDetail = (dataProduct) => {
    if (dataProduct) {
      this.setState({
        open: true,
        detailProducts: dataProduct,
      });
    }
  };

  addProduct = (dataProduct) => {
    this.props.addProduct(dataProduct);
    this.productsAux.push(dataProduct);
    this.setState({
      productsSelecteds: [...this.state.productsSelecteds, dataProduct.id],
    });
  };

  goToCreateQuotation = () => {
    if (!this.state.units.length) {
      // this.props.addProduct(this.state.prod);
      this.setState({
        showDialogUnits: {
          open: true,
          option: "units",
        },
      });
    }
  };

  addUnits = (_units) => {
    if (this.productsAux.length) {
      const productsWithUnits = this.productsAux.map((_) => {
        _.units = _units;
        return _;
      });
      this.props.addProducts(productsWithUnits);
      this.props.addUnits(_units);
      this.props.history.push("/cotizaciones/crear");
    }
  };

  afterFiltered = (newData) => {
    if (newData.results) {
      this.setState({ dataProductsDisplay: newData.results });
    } else {
      this.setState({ dataProductsDisplay: newData });
    }
  };

  render() {
    return (
      <div className="container-products-list">
        <div id="js-products-filters" className="container-filters-products">
          <FilterComponent />
        </div>
        <div className="container-body">
          <div className="title">
            <div className="title-actions">
              <div className="title-text">Productos</div>
              <div className="title--mark-cart">
                <div
                  className="title--filters cursor-pointer"
                  onClick={this.hadleClickFilters}
                >
                  Filtros
                </div>
                <span className="store-car" onClick={this.goToCreateQuotation}>
                  <LocalGroceryStoreIcon className="icon-size" />
                </span>
                {this.state.productsSelecteds.length}
              </div>
            </div>
          </div>

          <div className="container-product-list">
            {/* Filters */}

            {this.state.loader ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "50vh", width: "100%" }}
              >
                <Loader size={70} />
              </div>
            ) : (
              <div className="col-12 px-0 d-flex flex-wrap justify-content-between">
                {this.state.dataProductsDisplay.map((product) => {
                  let selected =
                    this.state.productsSelecteds.indexOf(product.id) < 0
                      ? false
                      : true;
                  return (
                    <ProductIndividual
                      key={product.id}
                      product={product}
                      productDetail={(obj) => this.productDetail(obj)}
                      addProduct={(obj) => this.addProduct(obj)}
                      selected={selected}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {/* Interception observe */}
          <div ref={this.myRef}>l</div>

          <Dialog
            onClose={() => this.setState({ open: false })}
            open={this.state.open}
            maxWidth="sm"
            fullWidth={false}
          >
            <Detail selectDetail={this.state.detailProducts} />
          </Dialog>
          {this.state.showDialogUnits && (
            <AlertDialog
              option={this.state.showDialogUnits.option}
              open={this.state.showDialogUnits.open}
              close={() => this.setState({ showDialogUnits: false })}
              confirm={this.addUnits}
            />
          )}

          {/* <div className="title">
          <div className="col-12 px-0 d-flex">
            <div className="col-8 px-0">
              Productos
            </div>
            <div className="col-4 px-0 d-flex flex-row-reverse">
              {this.state.productsSelecteds.length}
              <span className="store-car" onClick={this.goToCreateQuotation}>
                <LocalGroceryStoreIcon className="icon-size" />
              </span>
            </div>
          </div>
        </div>
        <br />
        <FiltersComponent fields={this.fieldsFilter}
          data={this.state.dataProducts}
          nameFilter={'produtos'}
          external={this.externalQuery}
          dataFiltered={this.afterFiltered} />
        <br />

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
                  {this.state.dataProductsDisplay.map(product => {
                    let selected = this.state.productsSelecteds.indexOf(product.id) < 0 ? false : true;
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
          maxWidth='sm'
          fullWidth={false}
        >
          <Detail selectDetail={this.state.detailProducts} />
        </Dialog>
        {this.state.showDialogUnits &&
          <AlertDialog
            option={this.state.showDialogUnits.option}
            open={this.state.showDialogUnits.open}
            close={() => this.setState({ showDialogUnits: false })}
            confirm={this.addUnits}
          />} */}
        </div>
      </div>
    );
  }
}

// Add reducers
const mapStateToProps = (reducers) => {
  return reducers.productReducer;
};

// Connect actions between redurcers with the component
const ProductComponent = connect(mapStateToProps, productActions)(Products);

export { ProductComponent };
