import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { CreateClient } from "./createClient";
import { ClientList } from "./clientList";
import config from "../../config";
import { assembleUrlPage } from "../../utils/pagination-utils";

export class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      updateClient: null,
      editUser: false,
      alert: {
        open: false,
        message: "",
        type: "",
      },
      clientsCount: 0,
    };
    this.clientDelete = this.clientDelete.bind(this);
    this.previousPage = null;
    this.nextPage = null;
  }

  componentDidMount() {
    this.getClient();
  }

  getClient(params = "") {
    fetch(`${config.api_url}/client${params}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.previousPage = res.previous;
        this.nextPage = res.next;
        this.setState({
          clients: res.results,
          clientsCount: res.count,
        });
      })
      .catch((e) => {
        console.log("Error getClient: ", e);
      });
  }

  saveClient = (client) => {
    fetch(`${config.api_url}/client/`, {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error saveClient: ", error))
      .then((response) => {
        this.setState({
          clients: [...this.state.clients, response],
          clientsCount: this.state.clientsCount + 1,
          alert: {
            open: true,
            message: "El cliente se creo correctamente.",
            type: "success",
          },
        });
      });
  };

  updateClient = (client) => {
    const idClient = this.state.updateClient.id;
    fetch(`${config.api_url}/client/${idClient}/`, {
      method: "PUT",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const resp = await response.json();
        if (response.status === 200 || response.status == 201) {
          const clientIndex = this.state.clients.findIndex(
            (item) => item.id == resp.id
          );
          const clients = this.state.clients.map((_, index) => {
            if (index == clientIndex) {
              _ = resp;
            }
            return _;
          });
          this.setState({
            clients: [...clients],
            updateClient: null,
            alert: {
              open: true,
              message: "El cliente se actualizo correctamente.",
              type: "success",
            },
          });
        } else {
          this.setState({
            alert: {
              open: true,
              message:
                "No se pudieron guardar los cambios por favor valide los campos.",
              type: "error",
            },
          });
        }
      })
      .catch((error) => console.log("Error updateClient: ", error));
  };

  clientDelete = (client) => {
    fetch(`${config.api_url}/client/${client.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          let clients = this.state.clients.filter(
            (item) => item.id != client.id
          );
          this.setState({
            clients: clients,
            clientsCount: this.state.clientsCount - 1,
            alert: {
              open: true,
              message: "El cliente se elimino correctamente.",
              type: "success",
            },
          });
        }
      })
      .catch((e) => {
        console.log("Error clientDelete: ", e);
      });
  };

  selectUpdate = (client) => {
    this.setState({
      updateClient: client,
      editUser: true,
    });
  };

  handleChangePage = (forward) => {
    const final =
      Math.ceil(this.state.clientsCount / config.ROWS_FOR_PAGES) *
        config.ROWS_FOR_PAGES -
      config.ROWS_FOR_PAGES;
    const params = assembleUrlPage(
      forward,
      this.nextPage,
      this.previousPage,
      final
    );
    params && this.getClient(params);
  };

  render() {
    return (
      <div className="container-body">
        <div className="title">
          <div className="title-actions">
            <div className="title-text">Clientes</div>
            <div className="action-title">
              <CreateClient
                saveClient={this.saveClient}
                clientUpdate={this.state.updateClient}
                updateClient={this.updateClient}
                open={this.state.editUser}
                close={() => this.setState({ editUser: !this.state.editUser })}
                openDialog={() =>
                  this.setState({ editUser: !this.state.editUser })
                }
              />
            </div>
          </div>
        </div>

        <ClientList
          duplicateClient={this.saveClient}
          selectDelete={this.clientDelete}
          selectUpdate={this.selectUpdate}
          clientList={this.state.clients}
          changePage={this.handleChangePage}
          count={this.state.clientsCount}
        />

        <Snackbar
          open={this.state.alert.open}
          autoHideDuration={4000}
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
