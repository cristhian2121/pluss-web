import React from "react"
import { CreateClient } from './createClient'
import { ClientList } from './clientList'
export class Clients extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        clients: []
    }

    this.insertClient = this.insertClient.bind(this)
}

  componentDidMount() {
    this.getClient()

  }

  getClient() {
    fetch('http://174.138.41.183:8933/api/client/')
      .then(response => {
        console.log('Response: ', response)
        return response.json()
      })
      .then(res => {
        console.log('res: ', res);
        this.setState({
          clients: res
        })
      })
      .catch(e => {
        console.log('Error: ', e)
      })
  }

  insertClient(client) {
    console.log('client: ', client);
    this.setState({
      clients: [...this.state.clients, client]
    })

  }

  render() {

    return (
      <>
        <p>Clientes</p>
        <CreateClient paola="hola" addClientToList={this.insertClient} />
        <ClientList clientList={this.state.clients}/>
      </>
    )
  }
}
