import React from "react";

// Material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export class CreateClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idClient: props.clientUpdate ? props.clientUpdate.id : "",
      name: props.clientUpdate ? props.clientUpdate.name : "",
      nit: props.clientUpdate ? props.clientUpdate.nit : "",
      phone: props.clientUpdate ? props.clientUpdate.phone : "",
      agent: props.clientUpdate ? props.clientUpdate.agent : "",
      dependece: props.clientUpdate ? props.clientUpdate.dependece : "",
      city: props.clientUpdate ? props.clientUpdate.city : "",
      address: props.clientUpdate ? props.clientUpdate.address : "",
      email: props.clientUpdate ? props.clientUpdate.email : "",
      phone_two: props.clientUpdate ? props.clientUpdate.phone_two : "",
      errors: {},
    };
  }

  /**
   * Add or update client depend on idClient
   * @param {*} event
   */
  addClient = (event) => {
    event.preventDefault();
    let data = this.generateData();
    if (this.validator(data)) {
      this.clearForm();
      this.state.idClient
        ? this.props.updateClient(data)
        : this.props.saveClient(data);
    }
  };

  generateData() {
    let elements = document.getElementById("clientForm").elements;
    let obj = {};

    for (let item of elements) {
      if (item.name) {
        obj[item.name] = item.value;
      }
    }

    return obj;
  }

  validator(data) {
    let error = [];
    !data.name && error.push("name");
    !data.nit && error.push("nit");
    !data.agent && error.push("agent");
    !data.dependece && error.push("dependece");
    !data.email && error.push("email");
    !data.phone && error.push("phone");
    !data.city && error.push("city");

    if (error.length > 0) {
      let errors = {};
      for (let item of error) {
        errors[item] = true;
      }
      this.setState({ errors: errors });

      return false;
    } else return true;
  }

  clearForm = () => {
    this.client = {};
    this.errors = {};
    document.getElementById("clientForm").reset();
    this.props.close();
    this.setState({
      idClient: "",
      name: "",
      nit: "",
      city: "",
      address: "",
      agent: "",
      dependece: "",
      email: "",
      phone: "",
      phone_two: "",
    });
  };

  handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "nit":
        this.setState({ nit: e.target.value });
        break;
      case "city":
        this.setState({ city: e.target.value });
        break;
      case "address":
        this.setState({ address: e.target.value });
        break;
      case "agent":
        this.setState({ agent: e.target.value });
        break;
      case "dependece":
        this.setState({ dependece: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "phone":
        this.setState({ phone: e.target.value });
        break;
      case "phone_two":
        this.setState({ phone_two: e.target.value });
        break;
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.clientUpdate !== this.props.clientUpdate) {
      this.setState({
        idClient: this.props.clientUpdate ? this.props.clientUpdate.id : "",
        name: this.props.clientUpdate ? this.props.clientUpdate.name : "",
        nit: this.props.clientUpdate ? this.props.clientUpdate.nit : "",
        phone: this.props.clientUpdate ? this.props.clientUpdate.phone : "",
        agent: this.props.clientUpdate ? this.props.clientUpdate.agent : "",
        dependece: this.props.clientUpdate ? this.props.clientUpdate.dependece : "",
        city: this.props.clientUpdate ? this.props.clientUpdate.city : "",
        address: this.props.clientUpdate ? this.props.clientUpdate.address : "",
        email: this.props.clientUpdate ? this.props.clientUpdate.email : "",
        phone_two: this.props.clientUpdate ? this.props.clientUpdate.phone_two : "",
        errors: {},
      });
    }
  }

  render() {
    return (
      <>
        <span className="text cursor-pointer" onClick={this.props.openDialog}>
          Crear Cliente
          <Button className="button-more">
            <AddCircleIcon className="icon-size" />
          </Button>
        </span>
        {this.props.open ? (
          <div className="create-update">
            <div className="create-update-form">
              <div className="title-modal">
                {this.state.idClient ? "Editar" : "Crear"} Cliente
              </div>
              <form noValidate id="clientForm">
                <TextField
                  id="name"
                  name="name"
                  label="Nombre empresa"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.name}
                  helperText={
                    this.state.errors.name && "Este campo es requerido."
                  }
                />
                <TextField
                  id="nit"
                  name="nit"
                  label="Nit"
                  value={this.state.nit}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.nit}
                  helperText={
                    this.state.errors.nit && "Este campo es requerido."
                  }
                />
                <TextField
                  id="agent"
                  name="agent"
                  label="Nombre responsable"
                  value={this.state.agent}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.agent}
                  helperText={
                    this.state.errors.agent && "Este campo es requerido."
                  }
                />
                <TextField
                  id="dependece"
                  name="dependece"
                  label="Area responsable"
                  value={this.state.dependece}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.dependece}
                  helperText={
                    this.state.errors.dependece && "Este campo es requerido."
                  }
                />
                <TextField
                  id="email"
                  name="email"
                  label="Correo electrónico"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.email}
                  helperText={
                    this.state.errors.email && "Este campo es requerido."
                  }
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Teléfono"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.phone}
                  helperText={
                    this.state.errors.phone && "Este campo es requerido."
                  }
                />
                <TextField
                  id="phone_two"
                  name="phone_two"
                  label="Teléfono alternativo"
                  value={this.state.phone_two}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                />
                <TextField
                  id="city"
                  name="city"
                  label="Ciudad"
                  value={this.state.city}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                  required
                  error={this.state.errors.city}
                  helperText={
                    this.state.errors.city && "Este campo es requerido."
                  }
                />
                <TextField
                  id="address"
                  name="address"
                  label="Dirección"
                  value={this.state.address}
                  onChange={this.handleChange}
                  className="col-md-4 col-sm-12"
                  margin="normal"
                />

                <div className="text-center container-button">
                  <Button variant="contained" onClick={this.clearForm}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.addClient}
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
