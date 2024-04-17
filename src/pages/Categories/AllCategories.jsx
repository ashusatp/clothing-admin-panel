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

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useNavigate } from "react-router-dom";
import { createCategoriesApi, deleteCategoryApi, getCategoriesApi } from "../../http";
import Header from "../../components/Header";

const AllCategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);


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


  const handleDelete = async (catId) => {
    try {
      const { data } = await deleteCategoryApi(catId);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete(params.row._id);
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
      <CreateCategory
        open={open}
        handleClose={handleClose}
        fetchCategories={fetchCategories}
      />
      <Stack
        direction="row"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={"10px"}
      >
        <Header title="Categories" />
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={handleClickOpen}
        >
          Create Category
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

const CreateCategory = ({ open, handleClose ,fetchCategories}) => {
  const [category, setCategory] = useState("");
  const handleSubmit = async () => {
    try {
      const { data } = await createCategoriesApi({category});
      fetchCategories();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Title"
          type="text-area"
          placeholder="Title"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="standard"
          sx={{ color: "text.primary" }}
        />
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

export default AllCategories;
