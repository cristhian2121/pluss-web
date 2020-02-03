import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import conf from '../../config'

export class CreateClient extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataEdit: null
    }
  }

  componentWillReceiveProps = (nextProps)=>{
    this.setState({
      dataEdit: nextProps.clientUpdate ? nextProps.clientUpdate.name : null,
      name: nextProps.clientUpdate ? nextProps.clientUpdate.name : null,
      nit: nextProps.clientUpdate ? nextProps.clientUpdate.nit : null,
      phone: nextProps.clientUpdate ? nextProps.clientUpdate.phone : null,
      agent: nextProps.clientUpdate.agent ? nextProps.clientUpdate.agent : null,
      dependece: nextProps.clientUpdate.dependece ? nextProps.clientUpdate.dependece : null,
      city: nextProps.clientUpdate ? nextProps.clientUpdate.city : null,
      address: nextProps.clientUpdate ? nextProps.clientUpdate.address : null,
      email: nextProps.clientUpdate ? nextProps.clientUpdate.email : null,
      phone_two: nextProps.clientUpdate ? nextProps.clientUpdate.phone_two : null,
    })
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
      this.state.dataEdit ? this.props.updateClient(client) : this.props.saveClient(client)
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
      dataEdit: null,
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
  };

  handleChange = e => {
    this.render()
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
      <>
        <div className="sub-title">
          <span className="text">
            {this.state.dataEdit ? 'Editar cliente' : 'Crear Cliente' }
          </span>
        </div>
        <form noValidate id="clientForm">
          <TextField id="name" name="name" label="Nombre empresa" value={this.state.name} onChange={this.handleChange}/>
          <TextField id="nit" name="nit" label="Nit" value={this.state.nit} onChange={this.handleChange}/>
          <TextField id="city" name="city" label="Ciudad" value={this.state.city} onChange={this.handleChange}/>
          <TextField id="address" name="address" label="Dirección" value={this.state.address} onChange={this.handleChange}/>
          <TextField id="agent" name="agent" label="Nombre representante" value={this.state.agent} onChange={this.handleChange}/>
          <TextField id="dependece" name="dependece" label="Area a la que pertenece" value={this.state.dependece} onChange={this.handleChange}/>
          <TextField id="email" name="email" label="Correo electrónico" value={this.state.email} onChange={this.handleChange}/>
          <TextField id="phone" name="phone" label="Teléfono" value={this.state.phone} onChange={this.handleChange}/>
          <TextField id="phone_two" name="phone_two" label="Teléfono alternativo" value={this.state.phone_two} onChange={this.handleChange}/>

          <div className="text-center container-button">
            <Button variant="contained" onClick={this.clearForm}>
              Limpiar
            </Button>
            <Button variant="contained" color="secondary" onClick={this.addClient}>
              Guardar
            </Button>
          </div>
        </form>
      </>
    )
  }
}
