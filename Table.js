import React from 'react';
import PropTypes from 'prop-types';

import MuiCircularProgress from '@mui/material/CircularProgress';

import { DataGrid } from '@mui/x-data-grid';

const Table = (props) => {
  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(ref.current.parentElement);
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingTop + paddingBottom);
  });

  // Fetch table data
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    fetch(props.dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.rows);
      })
      .catch((error) =>
        console.error(`Failed to load data from ${props.dataUrl}`)
      );
  }, []);

  return (
    <div ref={ref} style={{ height: props.height - padding, width: '100%' }}>
      {tableData.length ? (
        <DataGrid
          rows={tableData}
          columns={props.columns}
          autoPageSize={true}
          disableSelectionOnClick
          sx={{
            ' .MuiDataGrid-cell a': {
              color: '#009ef7',
              textDecoration: 'none',
            },
            ' .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
          }}
        />
      ) : (
        <MuiCircularProgress />
      )}
    </div>
  );
};

Table.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ),
  height: PropTypes.number.isRequired,
};

export default Table;
