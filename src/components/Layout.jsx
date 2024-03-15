import React from "react";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
