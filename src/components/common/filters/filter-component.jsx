import React, { PureComponent, useEffect, useState } from "react";
import { useFormik } from "formik";

// Material
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Styles
import "../../../styles/filters.css";

const validate = (values) => {
  const errors = {};
  if (!values.code && !values.name) {
    errors.common = "Seleccione algún filtro";
  }
  return errors;
};

export const FilterComponent = () => {
  const handleSubmit = (e) => {
    console.log("e: ", e);
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("values: ", values);
      // isSubmitting = false
    },
  });

  return (
    <div className="container-filters">
      {/* <FilterComponent /> */}
      <div className="filters-title filters--inputs__margin">Filtrar por</div>
      <div className="filters-body">
        <form className="filters-form" onSubmit={formik.handleSubmit}>
          <div className="filters--inputs">
            <TextField
              type="code"
              name="code"
              label="Código"
              className="w-100 filters--inputs__margin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
            <TextField
              type="name"
              name="name"
              label="Nombre"
              className="w-100 filters--inputs__margin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          {formik.errors.common && <div>Err</div>}
          <div className="filters--buttons">
            <Button type="submit" className="button--search" variant="contained" color="secondary">
              Buscar
            </Button>
            <Button variant="contained" onClick={() => formik.resetForm()}>limpiar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Create dynamic forms
 * @input : id, name placeHolder, query
 * @Select : id, name placeHolder, data:array<value,text>, query
 */
export class FiltersComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formElements: [],
    };
  }

  componentDidMount() {
    if (this.props.fields.length) {
      this.initializefilter(this.props.fields);
    }
  }

  initializefilter = (arrayForm) => {
    const formElements = [];
    for (let item of arrayForm) {
      switch (item.type) {
        case "input":
          formElements.push(
            this.renderInput(
              item.id,
              item.name,
              item.placeHolder,
              item.required,
              item.regex
            )
          );
          break;
        case "select":
          formElements.push(
            this.renderSelect(item.id, item.name, item.placeHolder, item.data)
          );
          break;
        default:
          break;
      }
    }
    this.setState({ formElements: formElements });
  };

  renderInput = (id, name, placeHolder, regex = false) => {
    return (
      <input
        id={id}
        name={name}
        className="base-input-filter"
        placeholder={placeHolder}
      />
    );
  };

  renderSelect = (id, name, placeHolder, data = []) => {
    return (
      <select
        id={id}
        name={name}
        placeHolder={placeHolder}
        className="base-input-filter"
      >
        {data.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>
    );
  };

  filterData = async () => {
    console.log("to filter");
    let data = this.props.data;
    for (let item of this.state.formElements) {
      const element = document.getElementById(item.props.id);
      let elementValue = element.value;
      if (element.type === "select-one") {
        const valueAux = element.options[element.selectedIndex].value;
        elementValue = valueAux == "0" ? 0 : valueAux;
      }
      if (elementValue) {
        if (this.props.external) {
          data = await this.filterExternal(element.name, elementValue);
        } else {
          data = data.filter((item) => {
            let product = item[element.name] || "";
            let characteristic = product.toString();
            characteristic = characteristic.toLowerCase();
            return characteristic == elementValue.toLowerCase();
          });
        }
        console.log("data filtered: ", data);
      }
    }
    this.props.dataFiltered(data);
  };

  filterExternal = async (elementName, elementValue) => {
    const field = this.props.fields.find((_) => _.name == elementName);
    console.log("field: ", field);
    let data;
    if (field.query) {
      try {
        const rawResponse = await fetch(
          field.query.replace(`_${elementName}`, elementValue)
        );
        data = await rawResponse.json();
      } catch (error) {
        // this.buildResponseError(error)
        console.log("error", error);
      }
      console.log("rowData: ", data);
    }
    return data;
  };

  clearFilters = () => {
    const form = document.getElementById("formFielter");
    form.reset();
    this.props.dataFiltered(this.props.data);
  };

  render() {
    return (
      <div>
        <input type="checkBox" className="checkboxFilter" id="checkFilter" />
        <label className="menuFilter" for="checkFilter">
          <span class="material-icons">filter_list</span>
        </label>
        <div className="rigth-panel">
          <form id="formFielter">
            <div className="title-filter">Filtrar {this.props.nameFilter}</div>
            {this.state.formElements.map((item) => (
              <div className={item.className ? item.className : ""}>
                <div className="input-filter-underline input-filter-root select-input-filter">
                  {item}
                </div>
              </div>
            ))}
            <br />
            <div className="button-actions-filters">
              <div className="button-base-root button-root button-contained button-containedSecondary">
                <input
                  className="button-label button-label-secondary"
                  type="button"
                  value="Filtrar"
                  onClick={this.filterData}
                />
              </div>
              <div className="button-base-root button-root button-contained">
                <input
                  className="button-label"
                  type="button"
                  value="Limpiar filtros"
                  onClick={this.clearFilters}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
