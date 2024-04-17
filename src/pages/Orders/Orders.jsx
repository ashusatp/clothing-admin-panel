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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
 
  const handleChange = (e)=> {

  }
  const OrderData = [
    {
      id: 1,
      orderId: "sdsda",
      userId: "sdsadas",
      status: "Placed",
      total_amount: 2000,
      transcationId: "wkjdndm",
      req_type: "Approved",
      order_items: [
        {
          productId: "sdadasdads",
          stockId: "dfsdfsdfds",
          quantity: 10,
        },
        {
          productId: "sdadasdad",
          stockId: "dfsdfsdfd",
          quantity: 2,
        },
      ],
    },
  ];

  const columns = [
    { field: "orderId", headerName: "ID", flex: 0.5 },
    { field: "userId", headerName: "User Id", flex: 0.5 },
    { field: "transcationId", headerName: "Transcation Id", flex: 0.5 },
    { field: "total_amount", headerName: "Total Amount", flex: 0.5 },
    { field: "status", headerName: "Status", flex: 0.5 },
    { field: "req_type", headerName: "Reqest Type", flex: 0.5 },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Properties
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={params.row.status}
                  label="Property"
                  onChange={handleChange}
                >
                  <MenuItem value={"Placed"}>Placed</MenuItem>
                  <MenuItem value={"Shipped"}>Shipped</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate(`/orders/${params.row.orderId}`);
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
      <CreateBrand open={open} handleClose={handleClose} />
      <Header title="Orders" sx={{ fontSize: "24px" }} />
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
            fontSize: "16px", // Adjust the font size as needed
          },
          "& .odd-row": {
            fontSize: "16px", // Adjust the font size as needed
          },
        }}
      >
        <DataGrid
          //   checkboxSelection
          rows={OrderData}
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

const CreateBrand = ({ open, handleClose }) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleSubmit = () => {
    handleClose();
  };
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Brand</DialogTitle>
      <DialogContent>
        <Stack>
          {imagePrev && ( // Check if imagePrev has a value before rendering Image
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={imagePrev} /> // Ensure Image is imported correctly
          )}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={changeImageHandler}
          >
            Brand Image
            <VisuallyHiddenInput type="file" />
          </Button>
        </Stack>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Title"
          type="text-area"
          placeholder="Title"
          fullWidth
          variant="standard"
          sx={{ color: "text.primary" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setImagePrev("");
            setImage("");
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Orders;
