import React from "react"
import { CreateClient } from './createClient'
import { ClientList } from './clientList'
import config from '../../config'
export class Clients extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      clients: []
    }

    this.insertClient = this.insertClient.bind(this)
    this.clientDelete = this.clientDelete.bind(this)
  }

  componentDidMount() {
    this.getClient()

  }

  getClient() {
    fetch(`${config.api_url}/client`)
      .then(response => {
        console.log('Response: ', response)
        return response.json()
      })
      .then(res => {
        this.setState({
          clients: res.results
        })
      })
      .catch(e => {
        console.log('Error: ', e)
      })
  }

  insertClient = (client) => {
    console.log('client: ', client);
    this.setState({
      clients: [...this.state.clients, client]
    })

  }

  clientDelete = (client) => {
    console.log('clientclientclient: ', client);
    const clients = this.state.clients.filter(item => item.id != client.id)
    console.log('clients: ', clients);
    this.setState({
      clients: clients
    })
    // for (let [item, index] of this.state.clients.entries()) {
    //   console.log('item: ', inde);
    //   if (item.id === client.id) {
    //     const clientsAux = [...this.state.clients]
    //     console.log('clientsAux: ', clientsAux[0]);
    //     const newClient = clientsAux.splice(index, 1)
    //     console.log('newClient: ', newClient);
        
    //     console.log('clients: ', this.state.clients);
    //   }
    // }
    // fetch(`${config.api_url}/client/${client.id}` , {method: 'DELETE'})
    // .then(response => {        
    //   if (response.status === 204) {
    //     this.props.clientDelet(client)
    //     // for (let item of this.props.clientList ) {
    //     //   if (item.id === client.id) {
    //     //     this.props.clientList = this.props.clientList.splice(item, 1)
    //     //     return
    //     //   }
    //     // }
    //   }
    // })
    // .then(res => { console.log('reseeeeeeeeeeeeeeee: ', res) })
    // .catch(e => { console.log('Erroraaaaaa: ', e) })

  }
  // clientDelete(client) {
  //   console.log('client: ', this.state.clients);
  //   for (let item of this.state.clients ) {
  //     console.log('item: ', item);
  //     if (item.id === client.id) {
  //       this.setState({
  //         clients: this.clients.splice(item, 1)
  //       })
  //       return
  //     }
  //   }
  // }

  render() {

    return (
      <>
        <div className="title">
          Clientes
        </div>
        <br />
        <CreateClient addClientToList={this.insertClient} />
        <br /><br />
        <ClientList selectDelet={this.clientDelete} clientList={this.state.clients} />
      </>
    )
  }
}
