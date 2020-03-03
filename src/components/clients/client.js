import React from "react"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import { CreateClient } from './createClient'
import { ClientList } from './clientList'
import config from '../../config'

export class Clients extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      updateClient: [],
      alert: {
        open: false,
        message: '',
        type: '',
      },
      openCreateUpdate: false
    }
    this.clientDelete = this.clientDelete.bind(this)
  }

  componentDidMount() {
    this.getClient()
  }

  getClient() {
    fetch(`${config.api_url}/client`)
      .then(response => {
        return response.json()
      })
      .then(res => {
        this.setState({
          clients: res.results
        })
      })
      .catch(e => {
        console.log('Error getClient: ', e)
      })
    // this.clearForm()
  }

  saveClient = (client) => {
    console.log('client: ', client);
    fetch(`${config.api_url}/client/`,
      {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.log('Error saveClient: ', error))
      .then(response => {
        console.log('response: ', response)
        this.setState({
          clients: [...this.state.clients, client],
          alert: {
            open: true,
            message: 'El cliente se creo correctamente.',
            type: 'success'
          }
        })
        // this.clearForm()
        this.setState({
          openCreateUpdate: false
        })
      })
  }

  updateClient = (client) => {
    console.log('client: ', client);
    let idClient = this.state.updateClient.id
    console.log('idClient: ', idClient);
    fetch(`${config.api_url}/client/${idClient}/`,
      {
        method: 'PUT',
        body: JSON.stringify(client),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        let resp = await response.json()
        if (response.status === 200 || response.status == 201) {
          let clients = this.state.clients.filter(item => item.id != resp.id)
          this.setState({
            clients: [...clients, resp],
            updateClient: [],
            alert: {
              open: true,
              message: 'El cliente se actualizo correctamente.',
              type: 'success'
            }
          })
          // this.clearForm()
          this.showForm()
        } else {
          let idCli = this.state.updateClient.id
          this.setState({
            alert: {
              updateClient: [...client, idCli],
              open: true,
              message: 'No se pudieron guardar los cambios por favor valide los campos.',
              type: 'error'
            }
          })
        }
      })
      .catch(error => console.log('Error updateClient: ', error))
  }

  clientDelete = (client) => {
    fetch(`${config.api_url}/client/${client.id}`, { method: 'DELETE' })
      .then(response => {
        if (response.status === 204) {
          let clients = this.state.clients.filter(item => item.id != client.id)
          this.setState({
            clients: clients,
            alert: {
              open: true,
              message: 'El cliente se elimino correctamente.',
              type: 'success'
            }
          })
        }
      })
      .catch(e => { console.log('Error clientDelete: ', e) })
  }

  // clearForm() {
  //   // document.getElementById("clientForm").reset()
  // }

  selectUpdate = (client) => {
    this.showForm('update')
    this.setState({
      updateClient: client
    })
  }

  showForm = (action) => {
    console.log('action: ', action);
    this.setState({
      openCreateUpdate: !this.state.openCreateUpdate
    })
    if (action != "update") {
      this.setState({
        updateClient: {},
      })
    }
  }

  render() {

    return (
      <>
        <div className="title row">
          <div className="title-text col-md-6 col-xs-12">
            Clientes
          </div>
          <div className="action-title col-md-6 col-xs-12">
            <span onClick={this.showForm} className="text">
            Crear Cliente
            <Button className="button-more" onClick={this.showForm}><AddCircleIcon/>  </Button>
            </span>
          </div>
        </div>

        {
          this.state.openCreateUpdate &&
          <CreateClient 
          saveClient={this.saveClient}
          clientUpdate={this.state.updateClient}
          updateClient={this.updateClient}
          cancelForm={this.showForm}
          />
        }

        <ClientList duplicateClient={this.saveClient} selectDelete={this.clientDelete} selectUpdate={this.selectUpdate} clientList={this.state.clients} />

        <Snackbar
          open={this.state.alert.open}
          autoHideDuration={4000}
          onClose={() =>
            this.setState({ alert: { open: false } })
          }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}>
          <Alert variant="filled" severity={this.state.alert.type}>{this.state.alert.message}</Alert>
        </Snackbar>
      </>
    )
  }
}
