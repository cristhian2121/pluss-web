/**
 * Colums to clients list
 */
export const clientsColumnsMock = [
  { title: "Nit", field: "nit" },
  { title: "Nombre", field: "name" },
  { title: "Teléfono", field: "phone" },
  { title: "Asesor de venta", field: "agent" },
  { title: "Ciudad", field: "city" },
  { title: "id", field: "id" },
];

/**
 * Actions to clients list
 */
export const clientsActionsMock = [
  {
    type: "edit",
    title: "Editar cliente",
  },
  {
    type: "file_copy",
    title: "Duplicar cliente",
  },
  {
    type: "delete",
    title: "Eliminar cliente",
  },
];

/**
 * Colums to make rate list
 */
export const makeRatesColumnMock = [
  { title: "Identificador", field: "id" },
  {
    title: "Fecha creación",
    field: "date_created",
    // render: (rowData) => (
    //   <span>{dayjs(rowData.date_created).format("DD/MM/YYYY")}</span>
    // ),
  },
  { title: "Cliente", field: "client_name" },
  { title: "Creado por", field: "user_name" },
  { title: "Estado", field: "status" },
];

/**
 * Actions to Make rate list
 */
export const actionMakeRatesMock = [
  {
    title: "Ver cotización",
    type: "show",
  },
  {
    type: "edit",
    title: "Editar cotización",
    // onClick: (event, rowData) => {
    //   this.props.history.push({
    //     pathname: "/cotizaciones/crear",
    //     state: {
    //       selectUpdate: rowData,
    //     },
    //   });
    // },
    // hidden: rowData.status == "Finalizado",
  },
  {
    type: "file_copy",
    title: "Duplicar cotización",
    // hidden: rowData.status == "En progreso",
  },
];
