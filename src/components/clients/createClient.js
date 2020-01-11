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
    const validate = this.validator(name, phone, agent, city)
    if(validate){
      const client = {
        name: name,
        phone: phone,
        agent :{
         name: agent 
        },
        city : city
      }
      console.log("ok")
      this.addClient(client)
    }else{
      console.log('faltan datos')
    }
  }

  validator(name, phone, agent, city){
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
        <p>Crear cliente {this.props.paola}</p>
        <form noValidate autoComplete="off">
          <TextField id="name" label="Nombre" />
          <TextField id="phone" label="Teléfono" />
          <TextField id="agent" label="Asesor de venta" />
          <TextField id="city" label="Ciudad" />
          <Button variant="contained" color="primary" type="submit" onClick={this.saveClient}>
            Guardar
          </Button>
        </form>
        <hr></hr>
        
      </>
    )
  }
}
