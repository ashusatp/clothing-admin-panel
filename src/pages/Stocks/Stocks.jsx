import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useTheme,
  Button,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import { ChromePicker } from "react-color";
import { createStockApi, getProductStocksApi } from "../../http";
const Stocks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { id } = useParams();
  const [stocks, setStocks] = useState([]);
  const fetchStocks = async () => {
    try {
      const { data } = await getProductStocksApi(id);
      const stocksWithIds = data.data.stocks.map((stock, index) => ({
        ...stock,
        id: index + 1, // You can use any unique identifier here
      }));
      setStocks(stocksWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="40%"
            height={"40px"}
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the image vertically
            gap={"20px"}
            borderRadius="4px"
            // border="1px solid #ccc" // Add border for better visualization
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" // Add shadow for better visualization
            style={{ background: `${params.row.color}` }}
          ></Box>
        );
      },
    },

    {
      field: "size",
      headerName: "Size",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "afterOffer",
      headerName: "Offer Amount",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <> {params.row.afterOffer === -1 ? "N/A" : params.row.afterOffer}</>
        );
      },
    },

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
                navigate(`/products/${params.row.id}`);
              }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleClose();
              }}
            >
              Delete
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
      <CreateStock
        open={open}
        handleClose={handleClose}
        fetchStocks={fetchStocks}
      />
      <Stack
        direction="row"
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        marginBottom={"10px"}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={handleClickOpen}
        >
          Add Stock
        </Button>
      </Stack>
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
          rows={stocks}
          columns={columns}
          rowHeight={90}
          pageSize={5}
          rowsPerPageOptions={[9]}
          getRowClassName={getRowClassName}
        />
      </Box>
    </Box>
  );
};

const CreateStock = ({ open, handleClose, fetchStocks }) => {
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

  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("#fff");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        color,
        size,
        amount: Number(amount),
        quantity: Number(quantity),
        file: image,
      };
      const { data } = await createStockApi(payload, id);
      fetchStocks();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Box display={"flex"} gap={"50px"}>
          <Box>
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
                Item Image
                <VisuallyHiddenInput type="file" />
              </Button>
            </Stack>
            <TextField
              autoFocus
              required
              margin="dense"
              name="Size"
              type="text-area"
              placeholder="Size"
              label="Size"
              value={size}
              fullWidth
              variant="standard"
              onChange={(e) => setSize(e.target.value)}
              sx={{ color: "text.primary" }}
              inputProps={{ style: { fontSize: "20px" } }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              name="Size"
              type="text-area"
              placeholder="Amount"
              label="Amount"
              value={amount}
              fullWidth
              variant="standard"
              onChange={(e) => setAmount(e.target.value)}
              sx={{ color: "text.primary" }}
              inputProps={{ style: { fontSize: "20px" } }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="Size"
              type="text-area"
              placeholder="Quantity"
              label="Quantity"
              value={quantity}
              fullWidth
              variant="standard"
              onChange={(e) => setQuantity(e.target.value)}
              style={{ color: "text.primary", fontSize: "20px" }}
              inputProps={{ style: { fontSize: "20px" } }}
            />
          </Box>
          <Box>
            <ChromePicker
              color={color}
              onChange={(value) => setColor(value.hex)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="Title"
              type="text-area"
              placeholder="Color"
              label="color"
              value={color}
              fullWidth
              variant="standard"
              onClick={() => setColorPickerVisible(!colorPickerVisible)}
              sx={{ color: "text.primary" }}
              inputProps={{ style: { fontSize: "20px" } }}
            />
          </Box>
        </Box>
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

export default Stocks;
