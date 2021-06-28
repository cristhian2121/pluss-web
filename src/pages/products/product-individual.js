import React, { useEffect, useState } from "react";

// Material-ui
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import config from "../../config";

export const ProductIndividual = ({
  productDetail,
  addProduct,
  product,
  selected,
}) => {
  return (
    <div className="pl-1 pr-1 pb-3 ">
      <div className="card" style={{ width: "16.5rem", height: "25rem" }}>
        <Tooltip title={product.name}>
          <img
            onClick={() => productDetail(product)}
            className="img-product cursor-pointer"
            alt={product.name}
            src={`${product.image_sm}`}
          />
        </Tooltip>
        <div className="card-body scroll-y">
          <div className="px-0 card-text text-common">{product.detail}</div>
        </div>
        <div
          className="card-footer text-alter"
          style={{ padding: "0.5rem 0.7rem" }}
        >
          <div className="col-12 px-0">Ref. {product.referency_id}</div>
          <div className="col-12 px-0 d-flex justify-content-between">
            <div>$ {product.cost} c/u</div>
            <div className={`icon-active ${selected ? "secondary-color" : ""}`}>
              <Tooltip title="Agregar producto">
                <AddCircleIcon
                  className="icon-size"
                  onClick={() => {
                    addProduct(product);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
