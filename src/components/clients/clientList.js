import React from "react";

import { AlertDialog, TableGeneric } from "../common/common";
import {
  clientsColumnsMock,
  clientsActionsMock,
} from "../common/table/columnMock";

export class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        open: false,
      },
      dataUser: [],
      showAlert: false,
      selectRegister: null,
      loader: true,
    };
  }

  rendered = true;

  componentDidMount() {
    this.setState({ loader: false });
  }

  /**
   * Before update render validate rules
   * @param {*} props before props
   * @param {*} state before state
   * @returns 
   */
  shouldComponentUpdate(props, state) {
    // Validate if state.loader is equal to update loader in componentDidMount so render
    // If is not equal then no render
    if (state.loader === this.rendered) {
      return true;
    }
    this.rendered = state.loader;
    return false;
  }

  /**
   * Show delete modal
   * @param {*} rowData elemet to delete 
   */
  showConfirmation = (rowData) => {
    this.setState({
      showAlert: {
        open: true,
        option: "delete",
      },
      selectRegister: rowData,
    });
  };

  /**
   * Change page table dispath event to parent component betweent props
   * @param {*} forward 
   */
  handleChangePage = (forward) => {
    this.props.changePage(forward);
  };

  /**
   * Call and send props to AlertDialog Component (alert to aplication)
   * @returns AlertDialog Component
   */
  AlertComponet = () => (
    <AlertDialog
      open={this.state.showAlert.open}
      option={this.state.showAlert.option}
      close={() => this.setState({ showAlert: !this.state.showAlert })}
      confirm={() => this.props.selectDelete(this.state.selectRegister)}
    />
  );

  /**
   * Call and send props to TableGeneric Component (table to aplication)
   * @returns TableGeneric Component
   */
  tableComponent = () => {
    return (
      <TableGeneric
        title=""
        columns={clientsColumnsMock}
        data={this.props.clientList}
        actions={clientsActionsMock}
        editItem={this.props.selectUpdate}
        deleteItem={this.showConfirmation}
        duplicateItem={this.props.duplicateClient}
        changePage={this.handleChangePage}
        count={this.props.count}
      />
    );
  };

  render() {
    return (
      <div>
        <div className="sub-title">
          <span className="text">Lista de Clientes</span>
        </div>
        {!this.state.loader && this.tableComponent()}
        {!this.state.loader &&
          this.state.showAlert.open &&
          this.AlertComponet()}
      </div>
    );
  }
}
