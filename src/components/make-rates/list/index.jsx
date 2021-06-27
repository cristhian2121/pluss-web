import React, { Component } from "react";
import * as dayjs from "dayjs";

import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import conf from "../../../config";

// Components

// Common
import {
  TableGeneric,
  actionMakeRatesMock,
  makeRatesColumnMock,
} from "../../common/table";
import { assembleUrlPage, parseData } from "../../../utils";

export class MakeRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuotations: [],
      count: 0,
      redirectFormQuotation: false,
      alert: {
        open: props.location.state ? props.location.state.open : false,
        message: props.location.state ? props.location.state.message : "",
        type: props.location.state ? props.location.state.type : "",
      },
    };
  }

  componentDidMount() {
    this.getDataQuotations();
  }

  /**
   * Get pagined Make rates
   */
  getDataQuotations = async (params = "") => {
    try {
      const response = await fetch(`${conf.api_url}/quotation/${params}`);
      const data = await response.json();
      const quotations = parseData(data.results)
      this.setState({
        dataQuotations: quotations,
        count: data.count,
      });
    } catch (error) {
      console.log("error", error);
    }
  }; 

  /**
   * Edit make rate
   * @param {*} item mate rate to edit
   */
  editMakeRate = (item) => {
    this.props.history.push({
      pathname: "/cotizaciones/crear",
      state: {
        selectUpdate: item,
      },
    });
  };

  /**
   * Duplicate make rate
   * @param {*} quotation
   */
  duplicateQuotation = (quotation) => {
    const data = quotation;
    data.status = "En progreso";
    data.client = quotation.client.id;
    data.user = quotation.user.id;

    fetch(`${conf.api_url}/quotation/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        console.log("response duplicate: ", response);
        let resp = await response.json();
        console.log("resp duplicate: ", resp);
        if (response.status === 200 || response.status == 201) {
          this.setState({
            dataQuotations: [...this.state.dataQuotations, resp],
            alert: {
              open: true,
              message: "La cotización se duplico correctamente.",
              type: "success",
            },
          });
        }
      })
      .catch((error) => console.log("Error: ", error));
  };

  /**
   * Handle change page either next o prev page
   * @param {*} event
   * @param {*} nextPage
   */
  handleChangePage = (forward) => {
    const final =
      Math.ceil(this.state.count / conf.ROWS_FOR_PAGES) * conf.ROWS_FOR_PAGES -
      conf.ROWS_FOR_PAGES;
    const params = assembleUrlPage(
      forward,
      this.nextPage,
      this.previousPage,
      final
    );
    params && this.getClient(params);
  };

  handleShow = (rowData) => {
    // sessionStorage.setItem('quotation', JSON.stringify(rowData))
    window.open(`/cotizacion/${rowData.id}/`, "_blank", "", true);
    // window.open(`/cotizacion/`, '_blank','',true)
  };

 
  render() {
    return (
      <div className="container-body">
        <div className="title">
          <div className="title-actions">
            <div className="title-text">Cotizaciones</div>
          </div>
        </div>

        <div className="sub-title">
          <span className="text">Lista de cotizaciones</span>
        </div>
        <TableGeneric
          title=""
          columns={makeRatesColumnMock}
          data={this.state.dataQuotations}
          actions={actionMakeRatesMock}
          editItem={this.editMakeRate}
          showItem={this.handleShow}
          deleteItem={() => null}
          duplicateItem={this.duplicateQuotation}
          changePage={this.handleChangePage}
          count={this.state.count}
        />

        <Link
          to="chart"
          id="linkQuotation"
          target="_blank"
          to="/clientes"
        ></Link>

        <Snackbar
          open={this.state.alert.open}
          autoHideDuration={3000}
          onClose={() => this.setState({ alert: { open: false } })}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Alert variant="filled" severity={this.state.alert.type}>
            {this.state.alert.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
