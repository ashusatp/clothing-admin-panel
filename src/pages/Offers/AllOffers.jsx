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
  TextareaAutosize,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { createOfferApi, deleteOfferApi, getOffersApi } from "../../http";
import Header from "../../components/Header";

const AllOffers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const { data } = await getOffersApi();
      const categoriesWithIds = data.data.offers.map((offer, index) => ({
        ...offer,
        id: index + 1, // You can use any unique identifier here
      }));

      setOffers(categoriesWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (offerId) => {
    try {
      const { data } = await deleteOfferApi(offerId);
      fetchOffers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "_id", headerName: "Offer Id", flex: 1.5 },
    { field: "title", headerName: "Offer Name", flex: 1 },
    {
      field: "discount",
      headerName: "Discount in (%)",
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
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes().toString().padStart(2, "0");
        const seconds = dateTime.getSeconds().toString().padStart(2, "0");
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${meridiem}`;
        return <>{formattedDateTime}</>;
      },
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1.5,
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
              color="success"
              onClick={() => {
                // handleDelete(params.row._id);
              }}
            >
              View
            </Button>
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
        fetchOffers={fetchOffers}
      />

      <Stack
        direction="row"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={"10px"}
      >
        <Header title="Offers" />
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={handleClickOpen}
        >
          Create Offer
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
          rows={offers}
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

const CreateCategory = ({ open, handleClose, fetchOffers }) => {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async () => {
    const payload = {
      title,
      discount: Number(discount),
      description,
      end_at: expiresAt + "T23:59:59",
    };
    try {
      const { data } = await createOfferApi(payload);
      fetchOffers();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Offer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Title"
          type="text-area"
          label="Title"
          placeholder="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="standard"
          sx={{ color: "text.primary", margin: "10px 0" }}
          inputProps={{ style: { fontSize: "20px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Discount Percentage"
          label="Discount in (%)"
          type="number"
          placeholder="Discount Percentage %"
          fullWidth
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          variant="standard"
          sx={{ color: "text.primary", margin: "10px 0" }}
          inputProps={{ style: { fontSize: "20px" } }}
          InputLabelProps={{ style: { fontSize: "20px" } }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Expires At"
          type="date"
          label="Expires At"
          fullWidth
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          variant="standard"
          sx={{ color: "text.primary", margin: "20px 0" }}
          InputLabelProps={{ shrink: true, style: { fontSize: "20px" } }}
          InputProps={{
            style: { fontSize: "20px" },
            inputProps: {
              //   style: { fontSize: "20px", cursor: "pointer" },
              min: new Date().toISOString().split("T")[0], // Block previous dates
              //   max: new Date().toISOString().split('T')[0], // Block today's date
            },
          }}
        />

        <TextareaAutosize
          autoFocus
          required
          id="name"
          name="email"
          aria-label="Description"
          placeholder="Description"
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            resize: "none",
            fontFamily: "inherit",
            color: "inherit",
            background: "inherit",
            marginTop: "20px",
            fontSize: "20px",
          }}
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

export default AllOffers;
