import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import ActionButton from "./ActionButton";

function EnhancedTableRow({ index, data = [], actionButtons = [] }) {
  let rowData = data.slice(1, data.length);
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
      {rowData.map((item, id) => {
        return (
          <TableCell component="th" key={id} scope="row" align="center">
            {item}
          </TableCell>
        );
      })}
      {/* render buttons if defined */}
      {actionButtons.length > 0 && (
        <TableCell align="center" component="th" scope="row">
          {actionButtons.map((action, id) => {
            return (
              <ActionButton
                key={id}
                actionClickHandler={() => action.actionFunc(data[0])}
                text={action.btnName}
              ></ActionButton>
            );
          })}
        </TableCell>
      )}
    </TableRow>
  );
}

export default EnhancedTableRow;
