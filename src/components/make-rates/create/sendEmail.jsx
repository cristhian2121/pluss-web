import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

// Material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const validate = (values) => {
  const errors = {};
  if (!values.subject) {
    errors.subject = true;
  }
  if (!values.message) {
    errors.message = true;
  }
  return errors;
};

export const SendEmail = (props) => {
  console.log("props denEmail: ", props);
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
      send_copy: "",
    },
    validate,
    onSubmit: (values) => {
      sendEmail(values);
    },
  });

  useEffect(() => {}, []);

  const sendEmail = (values) => {
    console.log("send");
    const data = {
      ...values,
      status: "Finalizado",
    };
    data.status = "Finalizado";
    console.log("data: ", data);
    props.sendEmail(data);
  };

  const handleClose = () => {
    props.cancelEmail(false);
  };

  return (
    <div className="create-update">
      <div className="create-update-form">
        <div className="title-modal">Enviar cotización</div>
        <form onSubmit={formik.handleSubmit} id="form-send-email">
          <TextField
            required
            id="subject"
            name="subject"
            label="Asunto"
            margin="normal"
            className="col-md-6 col-sm-12"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            error={formik.errors.subject && formik.touched.subject}
            helperText={
              formik.errors.subject &&
              formik.touched.subject &&
              "Este campo es requerido."
            }
          />
          <TextField
            id="send_copy"
            name="send_copy"
            label="Enviar copia"
            margin="normal"
            className="col-md-6 col-sm-12"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.send_copy}
          />
          <TextField
            id="message"
            name="message"
            multiline
            rowsMax="4"
            label="Observaciones"
            className="col-md-12 col-sm-12"
            margin="normal"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.message && formik.touched.message}
            helperText={
              formik.errors.message &&
              formik.touched.message &&
              "Este campo es requerido."
            }
          />
          <div className="col-12 px-0 d-flex justify-content-end container-button">
            <Button variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Enviar Correo con la cotización
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
