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

import { useNavigate } from "react-router-dom";

const Brands = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
 

  const StocksData = [
    {
      id: "1",
      name: "Adidas",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAnCAMAAABt2HtiAAAAYFBMVEX///8AAAAjHyDv7+/29vYTDQ4yLzDp6emura4JAADz8/OIh4cdGRp9fHwaFBaioaHh4eHb29s2NDTKyspYVlaQjo+op6dnZWa3t7fU09NDQUEqJyeYl5dKSEhycXHFxMWKJvkBAAAA5UlEQVRIie2STa+DIBBF5/IlCigWtNha+f//8mHy9qJJky48q7s5mTsMRDc3P8T8uKQFBegrYpSMtRe8joMxac5qTbQ0tYyhOec59JipdO3jOfFZHFAqZRFOaH7p9v0cvSyzqloTBm9a9/38uI+cKz0OSAzErMSHNkiJrtJcTSFoNRmXlj2n6rIFm/dPsw7Vgu/BUoK1euMWSudyl/Hz2g5FtVAcJAloF0OJEALJ5uMHkpy2qVyg1e7RkJtYiV4b+CMxIyI5pTA/Q4navBUyBvDDkXwUgnzDBafuP5JYxKF3c/Nd/gC2igl9lUxDXgAAAABJRU5ErkJggg==",
    },
    {
      id: "2",
      name: "Nike",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAY1BMVEX///8AAAD4+Pjs7OzLy8vV1dWAgIDa2tpMTEzn5+ceHh6Hh4fd3d2hoaHz8/P8/PxiYmKoqKhpaWmampp1dXUYGBiwsLDExMRUVFQsLCwTExM+Pj66urpvb28LCwuNjY0zMzMOFsniAAAA2UlEQVRIie2S2RKDIAwAjXig1vustdD//8qKUhUFsdPHsm+QbCYJWJbBYDD8gnMxL3Vce3vObFXmFpQXJRJuaKWV7NYjdbO7bME9t/wSA3SHpATgrL+mgBEvOIYwhAopdaI7s/pYtoMB5OItxjDxGORlWWxfEA1PMluQqeaPWZQK/dEXfIgko3HmyuXSX7dIUEtH47g8qffyhmZktZSjcUqQU2ie1vKkWoQ02vjbjlaYp1ptekUR3F6wGKL29C9q4wdeLUL1o21A1dwi1e1RQhIk30sGg+FPeQOwhQdDf2OfWwAAAABJRU5ErkJggg==",
    },
    {
      id: "3",
      name: "Puma",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAArCAMAAAAaGrsZAAAAYFBMVEX///8dHRsAAAAbGxnm5uYMDAgREQ4FBQAZGRcWFhTs7OzHx8fKysr19fVUVFOzs7LBwcGSkpFsbGytra2JiYl1dXSDg4NdXVynp6bV1dUvLy6hoaFHR0c0NDNjY2I7OzpljU9yAAABuElEQVRIiZ2W2RaCIBRF4SAIVA6lWFb6/38ZoBXmlO4nWLkF7oAR4ijI5UD+J6vqox/cUUH+rZ0SKPFwoxRUUYlnmf3jRYpTKho7ykE9koPnpzVPc0Upg9tqq+gbBuQr4kO4p9zenpwGMMjjkncHjfndD1vQARLlvHcCg3lPStjDhSrqaE7Mu12+Z+eLiUNTIZ0R+eiXfGBSFJNeiiaY6UOa6VIMT4pqSmyhv8dN4PjxKI3bcUpv38AQcgblI8sh5ChESbAgqSU3JWLWpyIIr/wNRIpzMMtgX6MLgAsBEZVhVtEEK9iN4ha+R3ezzFTN3R7LhKbAt3iP6FpilmJQSUDpX6wN5HDBMddhiDnwfNTgEqtdFyXgLHSlklTSlfU8N6NsbuOYfzsuzMTystk1L0zyyY9I/hR79Cc/WOzTCS69yRfadJq+5ZjaKhJ0IcZse8/R9+p6Hn/R3Slx3SqSypdSvHZzjon8ktysP/mLb5k9IqnVTjGyKVHL7TjD0W4WW76hHzIwtrlcPQcIhsseU7dKNOuPTRBhX3xcHWwv9F7ceg90nGCvrD2i/bewq3rcLRLvE8mVfsQX7ccP9tnQVoAAAAAASUVORK5CYII=",
    },
    {
      id: "4",
      name: "Zara",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRb9ubgr-GQd9D5pd33Yaotr44yJvG_8glJN5mOL8KVLNNVnibe",
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
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
              src={params.row.image}
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
                handleClose();
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
      <CreateStock open={open} handleClose={handleClose} />
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
          rows={StocksData}
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

const CreateStock = ({ open, handleClose }) => {
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
      <DialogTitle>Add Product</DialogTitle>
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
            Product Image
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
        <TextareaAutosize
          autoFocus
          required
          id="name"
          name="email"
          aria-label="Description"
          placeholder="Description"
          minRows={3}
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

export default Brands;
