import React from 'react';
import Announcement from '../components/Announcement';
import { Categories } from '../components/Categories';
import Navbar from '../components/Navbar';
import { Newsletter } from '../components/Newsletter';
import { Products } from '../components/Products';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import StayInTrend from '../components/StayInTrend';
import SearchBar from '../components/SearchBar';

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      <SearchBar />
      <Slider />
      <Categories />
      <StayInTrend />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};
