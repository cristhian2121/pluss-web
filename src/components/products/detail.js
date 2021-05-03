import React from "react";

// Material
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

// styles
import "./styles.css";

export default function Detail({ selectDetail }) {
  console.log("selectDetail: ", selectDetail);

  return (
    <div className="container">
      <div className="container-img">
        <img src={selectDetail.image} />
      </div>

      <div className="description">
        {/* Title */}
        <h5 className="description-title">{selectDetail.name}</h5>
        {/* Body */}
        <p className="description-body">
          <strong>Código del producto:</strong> {selectDetail.cod_product}
        </p>
        <p className="description-body">
          <strong>Color:</strong> {selectDetail.colors}
        </p>
        <p className="description-body">
          <strong>Material:</strong> {selectDetail.material}
        </p>
        <p className="description-body">
          <strong>Medidas:</strong> {selectDetail.size}
        </p>
        <p className="description-body">
          <strong>Marcas:</strong> {selectDetail.prints}
        </p>

        <Divider />
        <p className="description-detail">{selectDetail.detail}</p>
        <p className="description-body">
          <strong>Unidades disponibles:</strong> {selectDetail.inventory}
        </p>
        <p className="description-body">
          <strong>Valor unitario: </strong> ${selectDetail.cost}
        </p>

        <form noValidate>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Seleccionar producto"
          />
        </form>
      </div>
    </div>
  );
}
