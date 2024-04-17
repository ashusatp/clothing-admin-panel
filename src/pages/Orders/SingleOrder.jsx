import React, { useState } from "react";
import styles from "./SingleOrder.module.css";
import { Box, Button, FormControl, InputLabel, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Stocks from "../Stocks/Stocks";
import { MenuItem } from "@mui/material";
import Categories from "../Categories/Categories";
import Brands from "../Brands/Brands";
import { useNavigate } from "react-router-dom";
import OrderItems from "./OrderItems";
import Header from "../../components/Header";

const SingleOrder = () => {
  const [status, setStatus] = useState("Placed");
  const navigate = useNavigate();
  function createData(title, value) {
    return { title, value };
  }
  
  const rows = [
    createData('Order Id', '12exiobnnbbo23we212exiobnnbbo23we212exiobnnbbo23we'),
    createData('User Id', '2exiobnnbbo23we212exiobnnbbo23we212exiobnnbbo23we2'),
    createData('Transaction Id', '2exiobnnbbo23we212exiobnnbbo23we212exiobnnbbo23wec'),
    createData('Total Amount', 1590),
    createData('Status', 'placed'),
    createData('Reqest Type', 'Approved'),
    createData('Date', '12-4-2024'),
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              navigate("/orders");
            }}
          >
            Back
          </Button>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Property"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"Placed"}>Placed</MenuItem>
                <MenuItem value={"Shipped"}>Shipped</MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    {/* <TableCell align="right">{row.title}</TableCell> */}
                    <TableCell align="left">{row.value}</TableCell>
                
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <div className={styles.right}>
        <h2 style={{ marginLeft: "10px" }}>Ordered Items</h2>
        <OrderItems />
      </div>
    </div>
  );
};

export default SingleOrder;
