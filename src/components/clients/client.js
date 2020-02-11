import React from "react"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
      }
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
    this.clearForm()
  }

  saveClient = (client) => {
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
        this.setState({
          clients: [...this.state.clients, client],
          alert: {
            open: true,
            message: 'El cliente se agrego.',
            type: 'success'
          }
        })
        this.clearForm()
      })
  }

  updateClient = (client) => {
    let idClient = this.state.updateClient.id
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
              message: 'El cliente se modifico.',
              type: 'success'
            }
          })
          this.clearForm()
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
              message: 'El cliente se elimino.',
              type: 'success'
            }
          })
        }
      })
      .catch(e => { console.log('Error clientDelete: ', e) })
  }

  clearForm() {
    document.getElementById("clientForm").reset()
  }

  selectUpdate = (client) => {
    this.setState({
      updateClient: client
    })
  }

  render() {

    return (
      <>
        <div className="title">
          Clientes
        </div>

        <CreateClient saveClient={this.saveClient} clientUpdate={this.state.updateClient} updateClient={this.updateClient} />

        <ClientList selectDelete={this.clientDelete} selectUpdate={this.selectUpdate} clientList={this.state.clients} />

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
          <Alert severity={this.state.alert.type}>{this.state.alert.message}</Alert>
        </Snackbar>
      </>
    )
  }
}
