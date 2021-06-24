import React, { useState } from "react";

// Material
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { zhCN } from "@material-ui/core/locale";

// config theme
const theme = createMuiTheme({}, zhCN);

export const TableGeneric = (props) => {
  const [page, setPage] = useState(0);
  const [pageForPage, setPageForPage] = useState(10);

  /**
   * Build action buttons for each rowData
   * @param {*} props { ...actions }
   * @returns [buttons] for TablePaginator
   */
  const buildActions = (props) => {
    let actionsAux = [];
    props.actions.forEach((item) => {
      let eventEmitter;
      let icon;
      switch (item.type) {
        case "edit":
          eventEmitter = props.editItem;
          icon = "edit";
          break;
        case "delete":
          eventEmitter = props.deleteItem;
          icon = "delete";
          break;
        case "show":
          eventEmitter = props.showItem;
          icon = "remove_red_eye";
          break;
        case "file_copy":
          eventEmitter = props.duplicateItem;
          icon = "file_copy";
          break;
        default:
          break;
      }
      const action = {
        icon: icon,
        tooltip: item.title,
        onClick: (event, rowData) => {
          eventEmitter(rowData);
        },
      };
      actionsAux.push(action);
    });
    return actionsAux;
  };

  /**
   * Handle change page either next o prev page
   * @param {*} event
   * @param {*} nextPage
   */
  const handleChangePage = (event, nextPage) => {
    const maxPage = props.count / pageForPage
    const last = maxPage - nextPage
    let extrems = ''
    if(last <= 1 ){
      extrems = 'last';
    }
    if(nextPage == 0){
      extrems = 'first';
    }
    setPage(nextPage);
    if(extrems) {
      props.changePage(extrems)
      return
    }
    nextPage > page ? props.changePage("next") : props.changePage("previous");
  };

  /**
   * Handle change page method
   * @param {*} event
   */
  const handleNumberChangePage = (event) => {
    setPageForPage(event.target.value);
  };

  /**
   * Build a Material Table custume
   * @param {} props
   * @returns
   */
  const buildTable = (props) => {
    return (
      <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        actions={buildActions(props)}
        components={{
          Pagination: (propsPaginator) => {
            return (
              <ThemeProvider theme={theme}>
                <TablePagination
                  {...propsPaginator}
                  rowsPerPage={pageForPage}
                  rowsPerPageOptions={[10]}
                  // labelRowsPerPage='{10}'
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleNumberChangePage}
                  // backIconButtonText={backIconButtonText} // name button
                  // nextIconButtonText={'Siguiente'} // text button
                  count={props.count}
                  page={page}
                />
              </ThemeProvider>
            );
          },
        }}
        localization={{
          header: {
            actions: "Opciones",
          },
          toolbar: {
            searchPlaceholder: "Buscar",
            searchTooltip: "Buscar",
          },
          pagination: {
            nextAriaLabel: "Siguiente",
            nextTooltip: "Siguiente",
            lastAriaLabel: "Última",
            lastTooltip: "Última Pagina",
            searchTooltip: "Buscar",
            firstTooltip: "Primera Pagina",
            searchPlaceholder: "Buscar",
            previousTooltip: "Anterior",
            labelRowsSelect: "Filas",
          },
        }}
        options={{
          search: true,
          // exportFileName: "Clientes",
          // exportButton: true,
          pageSize: pageForPage,
          searchTooltip: "Buscar",
          searchPlaceholder: "Buscar",
        }}
      />
    );
  };

  return <>{buildTable(props)}</>;
};
