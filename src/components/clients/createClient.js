import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import conf from '../../config'

export class CreateClient extends React.Component {

  constructor(props) {
    console.log('props: ', props);
    super(props)
    this.state = {
      idClient: props.clientUpdate ? props.clientUpdate.id : null,
      name: props.clientUpdate ? props.clientUpdate.name : null,
      nit: props.clientUpdate ? props.clientUpdate.nit : null,
      phone: props.clientUpdate ? props.clientUpdate.phone : null,
      agent: props.clientUpdate.agent ? props.clientUpdate.agent : null,
      dependece: props.clientUpdate.dependece ? props.clientUpdate.dependece : null,
      city: props.clientUpdate ? props.clientUpdate.city : null,
      address: props.clientUpdate ? props.clientUpdate.address : null,
      email: props.clientUpdate ? props.clientUpdate.email : null,
      phone_two: props.clientUpdate ? props.clientUpdate.phone_two : null,
    }
  }

  addClient = (event) => {
    event.preventDefault()
    let name = document.getElementById('name').value
    let nit = document.getElementById('nit').value
    let phone = document.getElementById('phone').value
    let agent = document.getElementById('agent').value
    let dependece = document.getElementById('dependece').value
    let city = document.getElementById('city').value
    let address = document.getElementById('address').value
    let email = document.getElementById('email').value
    let phone_two = document.getElementById('phone_two').value
    // let data = this.generateData()
    const validate = this.validator(name, nit)
    if(validate){
      const client = {
        name: name,
        nit: nit,
        phone: phone,
        agent : agent,
        city : city,
        address: address,
        email: email,
        phone_two: phone_two,
        dependece: dependece
      }
      console.log("ok", this.state)
      this.state.idClient ? this.props.updateClient(client) : this.props.saveClient(client)
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

  clearForm = () => {
    this.client = {}
    document.getElementById("clientForm").reset()
    this.setState({
      idClient: null,
      name: null,
      nit: null,
      city: null,
      address: null,
      agent: null,
      dependece: null,
      email: null,
      phone: null,
      phone_two: null
    })
    this.props.cancelForm(false)
  };

  handleChange = e => {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value })
        break
      case "nit":
        this.setState({ nit: e.target.value })
        break
      case "city":
        this.setState({ city: e.target.value })
        break
      case "address":
        this.setState({ address: e.target.value })
        break
      case "agent":
        this.setState({ agent: e.target.value })
        break
      case "dependece":
        this.setState({ dependece: e.target.value })
        break
      case "email":
        this.setState({ email: e.target.value })
        break
      case "phone":
        this.setState({ phone: e.target.value })
        break
      case "phone_two":
        this.setState({ phone_two: e.target.value })
        break
    }
  };

  render() {
    return (
      <div className="create-update">
        <div className="create-update-form">
          <div className="title-modal">
              {this.state.idClient ? 'Editar' : 'Crear' } Cliente
          </div>
          <form noValidate id="clientForm">
            <TextField id="name" name="name" label="Nombre empresa" value={this.state.name} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="nit" name="nit" label="Nit" value={this.state.nit} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="agent" name="agent" label="Nombre responsable" value={this.state.agent} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="dependece" name="dependece" label="Area responsable" value={this.state.dependece} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="email" name="email" label="Correo electrónico" value={this.state.email} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="phone" name="phone" label="Teléfono" value={this.state.phone} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="phone_two" name="phone_two" label="Teléfono alternativo" value={this.state.phone_two} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="city" name="city" label="Ciudad" value={this.state.city} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>
            <TextField id="address" name="address" label="Dirección" value={this.state.address} onChange={this.handleChange} className="col-md-4 col-xs-12" margin="normal"/>

            <div className="text-center container-button">
              <Button variant="contained" onClick={this.clearForm}>
                Cancelar
              </Button>
              <Button variant="contained" color="secondary" onClick={this.addClient}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
