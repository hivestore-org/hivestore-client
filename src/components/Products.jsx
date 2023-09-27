import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { popularProducts } from '../data';
import { Product } from './Product';
import { mobile } from '../responsive';

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const Heading = styled.h1`
  color: #393d46;
  font-size: 60px;
  padding: 40px 20px;

  ${mobile({ fontSize: '40px', paddingBottom: '10px' })}
`;

export const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(cat ? `http://localhost:5000/api/v1/products?category=${cat}` : `http://localhost:5000/api/v1/products`);
          // const res = await axios.get(`http://localhost:5000/api/v1/products`);
          setProducts(res.data);
          console.log(res.data);

        } catch(error) { 
          console.log(error.message)
         }
      };

      getProducts();

    }, [cat]);

  // get products based on filters selected
     useEffect(() => {
       cat && setFilteredProducts(products.filter(item =>
  //      Object.entries(filters) turns the filters object into an array of arrays where each inner array
  //      contains a key-value pair.
         Object.entries(filters).every(([key, value]) => //every returns true if all the elements matches the conditions
           item[key].includes(value)
         )
       ))
     }, [products, cat, filters]);

     useEffect(() => {
       if(sort === "newest") {
           setFilteredProducts(prev =>
             [...prev].sort((a, b) => a.createdAt - b.createdAt) //Sort array in ascending order
             );
       } else {
         setFilteredProducts(prev =>
           [...prev].sort((a, b) => b.price - a.price) //Sort array in descending order
           );
       }
     }, [sort])

  useEffect(() => {
    cat && setFilteredProducts(products.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return item[key].includes(value);
      })
    }))
  }, [])
  return (
    <>
      <Heading>Our Products</Heading>
      <Container>
        {/* If there's a category, map from the filteredProducts array, else map from the products array. Use slice method to limit on 8 products, starting from index 0 - index 7, to show on the home page */}
        { cat ? filteredProducts.map(item => (
            <Product item = {item} key = {item._id} />
        )) : products.slice(0, 8).map(item => (
          <Product item = {item} key = {item._id} />
      ))}
      </Container>
    </>
  );
};
