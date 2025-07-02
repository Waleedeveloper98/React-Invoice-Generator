import React, { useRef } from "react";
import { Eye, Download } from "lucide-react";
import Heading from "../Heading/Heading";
import html2pdf from "html2pdf.js";
import "./InvoicePreview.css";

const InvoicePreview = ({ formData, items, subtotal, tax, total }) => {
  const {
    senderName,
    senderAddress,
    senderEmail,
    clientName,
    clientAddress,
    clientEmail,
    invoiceNumber,
    date,
  } = formData;

  const invoiceContentRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!invoiceContentRef.current) {
      console.log("Invoice content ref is not available");
      return;
    }
    try {
      const element = invoiceContentRef.current;
      const opt = {
        margin: 0.5,
        filename: `invoice-${invoiceNumber || "XXXX"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error(`Error generating PDF`, error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="invoice-preview-wrapper">
      <div className="invoice-preview-header">
        <div className="invoice-preview-header-inner">
          <Heading
            text="Invoice Preview"
            icon={<Eye size={24} />}
            itemPlace="items-center"
          />
          <button onClick={handleDownloadPDF} className="download-button">
            <Download size={20} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div ref={invoiceContentRef} className="invoice-content">
        <div className="invoice-top">
          <div>
            <h2 className="invoice-title">INVOICE</h2>
            <h5 className="invoice-number">#{invoiceNumber || "INV-XXXX"}</h5>
          </div>
          <div className="invoice-date">
            <p className="label">Invoice Date</p>
            <p className="value">
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </p>
          </div>
        </div>

        <div className="invoice-addresses">
          <div>
            <h4 className="section-heading">FROM</h4>
            <div className="address-box">
              <p className="name">{senderName || "Your Company"}</p>
              <p className="text">{senderAddress || "Company Address"}</p>
              <p className="email">{senderEmail || "email@example.com"}</p>
            </div>
          </div>
          <div>
            <h4 className="section-heading">TO</h4>
            <div className="address-box">
              <p className="name">{clientName || "Client Name"}</p>
              <p className="text">{clientAddress || "Client Address"}</p>
              <p className="email">{clientEmail || "client@example.com"}</p>
            </div>
          </div>
        </div>

        <div className="invoice-items">
          <div className="item-header">
            <div>Description</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>
          </div>

          {items.length === 0 ? (
            <div className="no-items">No items added yet.</div>
          ) : (
            <div className="item-list">
              {items.map((item, index) => (
                <div key={index} className="item-row">
                  <div>{item.itemDesc}</div>
                  <div>{item.quantity}</div>
                  <div>${item.price.toFixed(2)}</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="invoice-totals">
              <div className="totals-box">
                <div>
                  <p>Subtotal:</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div>
                  <p>Tax (10%):</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="total-amount">
                  <p>Total:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="invoice-footer">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(InvoicePreview);
