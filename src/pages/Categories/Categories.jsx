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
  addCategoryToProductApi,
  getCategoriesApi,
  removeCategoryFromProductApi,
} from "../../http";

const Categories = ({ categories, fetchProduct }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const handleRemove = async (catId) => {
    try {
      const { data } = await removeCategoryFromProductApi(id, catId);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1.5 },
    { field: "category", headerName: "Category", flex: 0.5 },
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
        handleClose={handleClose}
        fetchProduct={fetchProduct}
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
          Add Category
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
          rows={categories}
          columns={columns}
          getRowId={(row) => {
            const id = row._id; // Replace 'id' with your actual unique identifier property
            return id;
          }}
          rowHeight={90}
          pageSize={5}
          rowsPerPageOptions={[9]}
          getRowClassName={getRowClassName}
        />
      </Box>
    </Box>
  );
};

const CreateStock = ({ open, handleClose, fetchProduct, productId }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await getCategoriesApi();
      const categoriesWithIds = data.data.categories.map((category, index) => ({
        ...category,
        id: index + 1, // You can use any unique identifier here
      }));

      setCategories(categoriesWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await addCategoryToProductApi(productId, category);
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
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Property"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem key={index} value={category._id}>
                    {category.category}
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

export default Categories;
