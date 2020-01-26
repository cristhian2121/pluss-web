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
        <div className="title">
          Clientes
        </div>
        <br/>
        <CreateClient addClientToList={this.insertClient} />
        <br/><br/>
        <ClientList clientList={this.state.clients}/>
      </>
    )
  }
}
