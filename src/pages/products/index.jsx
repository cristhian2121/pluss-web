import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";

import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";

// services
import { ProductsService } from "../../services/products";
import Detail from "../../components/products/detail";

// common
import conf from "../../config";
import Loader from "../../components/common/loader";
import * as productActions from "../../actions/productActions";

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
  filtered = false;

  fieldsFilter = [
    {
      id: "code",
      type: "input",
      name: "code",
      label: "Código",
      placeHolder: "Código",
      query: `${conf.api_url}/product?referency_id=_referency_id`,
    },
    {
      id: "name",
      type: "input",
      name: "name",
      label: "Nombre",
      placeHolder: "Nombre",
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
    this.openfilters = !this.openfilters;
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
        // avoid re render when chield filter pass params
        !this.filtered && this.getProducts();
      }
    });
    element$.observe(this.myRef.current);
  }

  componentDidMount() {
    // reset scroll
    this.scrolling = 0;
    this.getProducts();
    this.observerElement();
    window.addEventListener("scroll", this.handleScroll);
    this.filtered = false;
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

  /**
   * get products by FilterComponent
   */
  getFilterProducts = async (next) => {
    this.setState({ loader: true });
    const res = await this.productsService.getProducts(next);
    if (res.state) {
      this.nextPage = res.data.next;
      this.setState({
        // dataProducts: res.data.results,
        dataProductsDisplay: res.data.results,
        count: res.data.count,
        loader: false,
      });
      // Set filter to filter again
      this.filtered = false;
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

  /**
   * Clear filter and renew data
   */
  clearFilter = () => {
    this.setState({
      dataProductsDisplay: [...this.state.dataProducts],
      // count: res.data.count,
      loader: false,
    });
    this.filtered = false;
  };

  onFilter = async (values) => {
    let nextPage;
    if (values.name) {
      nextPage = `name=${values.name}`;
    }
    if (values.code) {
      nextPage = `referency_id=${values.code}`;
    }
    this.filtered = true;
    await this.getFilterProducts(nextPage);
  };

  render() {
    return (
      <div className="container-products-list">
        <div id="js-products-filters" className="container-filters-products">
            <FilterComponent
              getEntities={this.onFilter}
              clearFilter={this.clearFilter}
            />
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
                <div className="store-car__position">
                  <div className="store-car" onClick={this.goToCreateQuotation}>
                    <LocalGroceryStoreIcon className="icon-size" />
                    {this.state.productsSelecteds.length}
                  </div>
                </div>
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
