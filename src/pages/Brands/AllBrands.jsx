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

import { useNavigate } from "react-router-dom";
import { createBrandApi, deleteBrandApi, getBrandApi } from "../../http";
import Header from "../../components/Header";

const AllBrands = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const { data } = await getBrandApi();
      const brandsWithIds = data.data.brands.map((brand, index) => ({
        ...brand,
        id: index + 1, // You can use any unique identifier here
      }));
      console.log(brandsWithIds);
      setBrands(brandsWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  
  const handleDelete = async (brandId) => {
    try {
      const { data } = await deleteBrandApi(brandId);
      fetchBrands();
    } catch (error) {
      console.log(error);
    }
  };


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "brand", headerName: "Name", flex: 0.5 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="200px"
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
      <CreateBrand open={open} handleClose={handleClose} fetchBrands={fetchBrands} />
      <Stack
        direction="row"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={"10px"}
      >
        <Header title="Brands" />
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={handleClickOpen}
        >
          Create Brand
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

const CreateBrand = ({ open, handleClose,fetchBrands }) => {
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
  const [brand, setBrand] = useState("");

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
        brand,
        file: image,
      };

      const { data } = await createBrandApi(payload);
      fetchBrands();
      handleClose();
    } catch (error) {
      console.log(error);
    }
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
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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

export default AllBrands;
