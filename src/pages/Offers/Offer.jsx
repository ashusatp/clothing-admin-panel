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
  addOfferToProductApi,
  getOffersApi,
  removeOfferFromProductApi,
} from "../../http";

const Offer = ({ Offer, fetchProduct }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const handleRemove = async (offerId) => {
    try {
      const { data } = await removeOfferFromProductApi(id, offerId);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "Offer Id", flex: 1.5 },
    { field: "title", headerName: "Offer Name", flex: 1 },
    {
      field: "discount",
      headerName: "Discount",
      flex: 0.5,
      renderCell: (params) => {
        return <>{`${params.row.discount} %`}</>;
      },
    },
    {
      field: "end_at",
      headerName: "Expires At",
      flex: 1,
      renderCell: (params) => {
        const dateTime = new Date(params.row.end_at);
        const day = dateTime.getDate().toString().padStart(2, "0");
        const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
        const year = dateTime.getFullYear();
        // let hours = dateTime.getHours();
        // const minutes = dateTime.getMinutes().toString().padStart(2, "0");
        // const seconds = dateTime.getSeconds().toString().padStart(2, "0");
        // const meridiem = hours >= 12 ? "PM" : "AM";
        // hours = hours % 12 || 12;

        const formattedDateTime = `${day}/${month}/${year}`;
        return <>{formattedDateTime}</>;
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
          Add Offer
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
            fontSize: "15px", // Adjust the font size as needed
          },
          "& .odd-row": {
            fontSize: "15px", // Adjust the font size as needed
          },
        }}
      >
        <DataGrid
          //   checkboxSelection
          rows={Offer}
          columns={columns}
          getRowId={(row) => {
            const id = row._id; // Replace 'id' with your actual unique identifier property
            console.log(id);
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
  const [offers, setOffers] = useState([]);
  const [offer, setOffer] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await getOffersApi();
      const offersWithIds = data.data.offers.map((offer, index) => ({
        ...offer,
        id: index + 1, // You can use any unique identifier here
      }));

      setOffers(offersWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data } = await addOfferToProductApi(productId, offer);
      fetchProduct();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogTitle>Add Offer</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 120, padding: 20 }}>
          <FormControl fullWidth sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Select Offer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={offer}
              label="Property"
              onChange={(e) => setOffer(e.target.value)}
            >
              {offers.map((offer, index) => {
                return (
                  <MenuItem key={index} value={offer._id}>
                    {offer.title}
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

export default Offer;
