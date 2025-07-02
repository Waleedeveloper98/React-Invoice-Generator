import React from "react";
import { FileText } from "lucide-react";
import "./Header.css"; // <-- import your CSS file

const Header = () => {
  return (
    <header className="invoice-header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <FileText className="logo-icon" />
            <h1 className="logo-text">Invoice Generator</h1>
          </div>
          <div className="tagline">Create professional invoices instantly</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
