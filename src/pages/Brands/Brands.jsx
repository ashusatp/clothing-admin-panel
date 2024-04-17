import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  useTheme,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useParams } from "react-router-dom";
import {
  addBrandToProductApi,
  getBrandApi,
  removeBrandFromProductApi,
} from "../../http";

const Brands = ({ brands, fetchProduct }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const handleRemove = async (brandId) => {
    try {
      const { data } = await removeBrandFromProductApi(id, brandId);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    // { field: "_id", headerName: "ID", flex: 1.5 },
    { field: "brand", headerName: "Name", flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            height={"200px"}
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center" // Center the image vertically
            gap={"20px"}
            borderRadius="4px"
            // border="1px solid #ccc" // Add border for better visualization
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" // Add shadow for better visualization
          >
            <img
              src={params.row.image.url}
              alt=""
              height={"100%"}
              style={{ maxWidth: "100%", maxHeight: "80%", padding: "20px" }} // Make image responsive
            />
          </Box>
        );
      },
    },

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
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleRemove(params.row._id);
              }}
            >
              Remove
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
        fetchProduct={fetchProduct}
        handleClose={handleClose}
        productId={id}
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
          Add Brand
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
          //   checkboxSelection
          rows={brands}
          columns={columns}
          rowHeight={120}
          pageSize={5}
          getRowId={(row) => {
            const id = row._id; // Replace 'id' with your actual unique identifier property
            return id;
          }}
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

const CreateStock = ({ open, handleClose, fetchProduct, productId }) => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const fetchCategories = async () => {
    try {
      const { data } = await getBrandApi();
      const brandsWithIds = data.data.brands.map((brand, index) => ({
        ...brand,
        id: index + 1, // You can use any unique identifier here
      }));

      setBrands(brandsWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await addBrandToProductApi(productId, brand);
      fetchProduct();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 120, padding: 20 }}>
          <FormControl fullWidth sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Select Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              label="Property"
              onChange={(e) => setBrand(e.target.value)}
            >
              {brands.map((brand, index) => {
                return (
                  <MenuItem key={index} value={brand._id}>
                    {brand.brand}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
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

export default Brands;
