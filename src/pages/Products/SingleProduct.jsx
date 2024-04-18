import React, { useEffect, useState } from "react";
import styles from "./SingleProduct.module.css";
import { Box, Button, FormControl, InputLabel, Select } from "@mui/material";
import Stocks from "../Stocks/Stocks";
import { MenuItem } from "@mui/material";
import Categories from "../Categories/Categories";
import Brands from "../Brands/Brands";
import { useNavigate, useParams } from "react-router-dom";
import { getProductApi } from "../../http";
import Offer from "../Offers/Offer";
const props = {
  Stocks: Stocks,
  Categories: Categories,
  Brands: Brands,
  Offer: Offer,
};
const SingleProduct = () => {
  const [property, setProperty] = useState("Stocks");
  const [product, setProduct] = useState({
    title: "",
    image: {
      url: "",
    },
    description: "",
  });
  const State = props[property];
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const { data } = await getProductApi(id);
      // const productsWithIds = data.data.products.map((product, index) => ({
      //   ...product,
      //   id: index + 1, // You can use any unique identifier here
      // }));
      setProduct(data.data.product);
      // setProducts(productsWithIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
              navigate("/products");
            }}
          >
            Back
          </Button>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Properties</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={property}
                label="Property"
                onChange={(e) => setProperty(e.target.value)}
              >
                <MenuItem value={"Stocks"}>Stocks</MenuItem>
                <MenuItem value={"Categories"}>Categories</MenuItem>
                <MenuItem value={"Brands"}>Brands</MenuItem>
                <MenuItem value={"Offer"}>Offer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <div className={styles.image}>
          <img
            src={product.image.url ? product.image.url : ""}
            alt=""
            height={"200px"}
          />
          <div className="btns">
            <Button
              variant="outlined"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                // navigate(`/products/${params.row.id}`);
              }}
            >
              View Image
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                // handleClose();
              }}
            >
              Update Image
            </Button>
          </div>
        </div>
        <div className={styles.details}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div>
            <Button
              variant="outlined"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                // navigate(`/products/${params.row.id}`);
              }}
            >
              Edit Details
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {property === "Stocks" ? (
          <State stocks={product.stocks} />
        ) : property === "Brands" ? (
          <State brands={product.brands} fetchProduct={fetchProduct} />
        ) : property === "Offer" ? (
          <State Offer={product.offers} fetchProduct={fetchProduct} />
        ) : (
          <State categories={product.categories} fetchProduct={fetchProduct} />
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
