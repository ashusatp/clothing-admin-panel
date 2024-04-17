import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
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
                  onClick={()=>{
                    // navigate(`/products/${params.row.id}`)
                  }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                //   handleClose();
                }}
              >
                Ban
              </Button>
            </Box>
          );
        },
      },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="List of Users" />
      <Box
        m="40px 0 0 0"
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
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
