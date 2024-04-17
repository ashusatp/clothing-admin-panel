import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
  Button,
  styled,
  TextareaAutosize,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Image } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OrderItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  //   order_items: [
  //     {
  //       productId: "sdadasdads",
  //       stockId: "dfsdfsdfds",
  //       quantity: 10,
  //     },
  //     {
  //       productId: "sdadasdad",
  //       stockId: "dfsdfsdfd",
  //       quantity: 2,
  //     },
  //   ],

  const StocksData = [
    {
      id: "1",
      productId: "sdadasdads",
      stockId: "dfsdfsdfds",
      quantity: 10,
    },
    {
      id: "2",
      productId: "sdadasdads",
      stockId: "dfsdfsdfds",
      quantity: 10,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "productId", headerName: "Product Id", flex: 2 },
    { field: "stockId", headerName: "Stock Id", flex: 2 },
    { field: "quantity", headerName: "Qty", flex: 0.5 },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 2,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="0 10px"
            display="flex"
            justifyContent="center"
            gap={"20px"}
            borderRadius="4px"
          >
            <Button
              variant="outlined"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                // navigate(`/products/${params.row.id}`);
              }}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getRowClassName = (params) => {
    return params.index % 2 === 0 ? "even-row" : "odd-row";
  };
  return (
    <Box m="20px">
      <Box
        // m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .even-row": {
            fontSize: "18px", // Adjust the font size as needed
          },
          "& .odd-row": {
            fontSize: "18px", // Adjust the font size as needed
          },
        }}
      >
        <DataGrid
          //   checkboxSelection
          rows={StocksData}
          columns={columns}
          rowHeight={90}
          pageSize={5}
          rowsPerPageOptions={[9]}
          getRowClassName={getRowClassName}
        />
        {/* <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        /> */}
      </Box>
    </Box>
  );
};

export default OrderItems;
