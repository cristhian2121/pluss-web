import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class CreateClient extends React.Component {

  

  constructor(props) {
    super(props)
    this.saveClient = this.saveClient.bind(this)
  }

  saveClient(event) {
    event.preventDefault()
    let name = document.getElementById('name').value
    let phone = document.getElementById('phone').value
    let agent = document.getElementById('agent').value
    let city = document.getElementById('city').value
    let address = document.getElementById('address').value
    const validate = this.validator(name, phone, agent, city, address)
    if(validate){
      const client = {
        name: name,
        phone: phone,
        agent :{
         name: agent 
        },
        city : city,
        address: address
      }
      console.log("ok")
      this.addClient(client)
    }else{
      console.log('faltan datos')
    }
  }

  validator(name, phone, agent, city, address){
     if(name != "" && phone != "" && agent != "" && city != ""){
      return true
     }else{
      return false
    }
  }

  addClient(client){
    fetch('http://174.138.41.183:8000/api/client/',{
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
    })
  }

  render() {
    return (
      <>
        <div className="sub-title">
          <Button onClick={this.showForm}>
            Crear Cliente
          </Button>
        </div>
        <form noValidate autoComplete="off">
          <TextField id="name" label="Nombre empresa" />
          <TextField id="agent" label="Asesor de venta" />
          <TextField id="city" label="Ciudad" />
          <TextField id="address" label="Dirección" />
          <TextField id="email" label="Correo electrónico" />
          <TextField id="phone" label="Teléfono" />
          <TextField id="phone" label="Teléfono alternativo" />
          {/* <Button variant="contained" color="primary" type="submit" onClick={this.saveClient}>
            Guardar
          </Button> */}
          <div className="text-center">
            <br/>
            <Button variant="contained" color="secondary" onClick={this.clear}>
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
