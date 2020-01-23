import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import conf from '../../config'

export class CreateClient extends React.Component {

  constructor(props) {
    super(props)
    this.saveClient = this.saveClient.bind(this)
  }

  saveClient(event) {
    event.preventDefault()
    let name = document.getElementById('name').value
    let nit = document.getElementById('nit').value
    let phone = document.getElementById('phone').value
    let agent = document.getElementById('agent').value
    let city = document.getElementById('city').value
    let address = document.getElementById('address').value
    let email = document.getElementById('email').value
    let phone_two = document.getElementById('phone_two').value
    const validate = this.validator(name, nit, phone, agent, city, address)
    if(validate){
      const client = {
        name: name,
        nit: nit,
        phone: phone,
        agent :{
         name: agent 
        },
        city : city,
        address: address,
        email: email,
        phone_two: phone_two,
      }
      console.log("ok", client)
      this.addClient(client)
    }else{
      console.log('faltan datos')
    }
  }

  generateData() {
    let elements = document.getElementById('clientForm').elements;
    let obj = {};
    
    for (let item of elements) {
      if (item.name) {
        obj[item.name] = item.value;
      }
    }

    return obj
  }

  validator(name, phone, agent, city, address){
     if(name != "" && phone != "" && agent != "" && city != "" && address != ""){
      return true
     }else{
      return false
    }
  }

  addClient(client){
    fetch(`${conf.api_url}/client/`,{
      method: 'POST',
      body: JSON.stringify(client),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.log('Error: ', error))
    .then(response => {
      console.log('Success: ', response)
      this.props.addClientToList(response)
      this.clearForm()
    })
  }

  clearForm = () => {
    this.client = {}
    document.getElementById("clientForm").reset()
  };

  render() {
    return (
      <>
        <div className="sub-title">
          <Button onClick={this.showForm}>
            Crear Cliente
          </Button>
        </div>
        <form noValidate autoComplete="off" id="clientForm">
          <TextField id="name" label="Nombre empresa" />
          <TextField id="nit" label="Nit" />
          <TextField id="city" label="Ciudad" />
          <TextField id="address" label="Dirección" />
          <TextField id="agent" label="Nombre representante" />
          <TextField id="email" label="Correo electrónico" />
          <TextField id="phone" label="Teléfono" />
          <TextField id="phone_two" label="Teléfono alternativo" />
          {/* <Button variant="contained" color="primary" type="submit" onClick={this.saveClient}>
            Guardar
          </Button> */}
          <div className="text-center">
            <br/>
            <Button variant="contained" color="secondary" onClick={this.clearForm}>
              Limpiar
            </Button>
            <Button variant="contained" color="primary" onClick={this.saveClient}>
              Guardar
            </Button>
          </div>
        </form>
        
      </>
    )
  }
}
