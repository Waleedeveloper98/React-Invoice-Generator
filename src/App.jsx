import React from "react";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import InvoiceGenerator from "./invoiceGenerator/InvoiceGenerator";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <InvoiceGenerator />
      <Footer />
    </div>
  );
};

export default App;
