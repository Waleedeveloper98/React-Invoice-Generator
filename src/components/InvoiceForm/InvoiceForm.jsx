import React from "react";
import { FileText, Trash2 } from "lucide-react";
import Heading from "../Heading/Heading";
import './InvoiceForm.css';

const InvoiceForm = ({
  formData,
  setFormData,
  handleAddItems,
  items,
  itemInput,
  setItemInput,
  handleDelete,
}) => {
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setItemInput((prev) => ({
      ...prev,
      [name]: name === "itemDesc" ? value : Number(value),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="invoice-form-container">
      <Heading text={"Invoice Details"} icon={<FileText size={24} />} />
      <form onSubmit={onSubmit} className="invoice-form">
        <div className="section-divider">
          <h4 className="section-title">Sender Information</h4>
        </div>
        <div className="form-fields">
          {/* name */}
          <div className="field-group">
            <label className="field-label" htmlFor="name">
              Name <sup className="required">*</sup>
            </label>
            <input
              className="field-input"
              type="text"
              id="name"
              name="senderName"
              placeholder="Your company name"
              value={senderName}
              onChange={handleOnChange}
            />
          </div>
          {/* Address */}
          <div className="field-group">
            <label className="field-label" htmlFor="address">
              Address <sup className="required">*</sup>
            </label>
            <textarea
              rows={3}
              className="field-textarea"
              id="address"
              name="senderAddress"
              placeholder="Your company address"
              value={senderAddress}
              onChange={handleOnChange}
            />
          </div>
          {/* email */}
          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Email <sup className="required">*</sup>
            </label>
            <input
              className="field-input"
              type="email"
              id="email"
              name="senderEmail"
              placeholder="your@email.com"
              value={senderEmail}
              onChange={handleOnChange}
            />
          </div>

          <div className="section-divider section-divider-spaced">
            <h4 className="section-title">Client Information</h4>
          </div>
          {/* name */}
          <div className="field-group">
            <label className="field-label" htmlFor="cname">
              Name <sup className="required">*</sup>
            </label>
            <input
              className="field-input"
              type="text"
              id="cname"
              name="clientName"
              placeholder="Client company name"
              value={clientName}
              onChange={handleOnChange}
            />
          </div>
          {/* Address */}
          <div className="field-group">
            <label className="field-label" htmlFor="caddress">
              Address <sup className="required">*</sup>
            </label>
            <textarea
              rows={3}
              className="field-textarea"
              id="caddress"
              name="clientAddress"
              placeholder="Client company address"
              value={clientAddress}
              onChange={handleOnChange}
            />
          </div>
          {/* email */}
          <div className="field-group">
            <label className="field-label" htmlFor="cemail">
              Email <sup className="required">*</sup>
            </label>
            <input
              className="field-input"
              type="email"
              id="cemail"
              name="clientEmail"
              placeholder="client@email.com"
              value={clientEmail}
              onChange={handleOnChange}
            />
          </div>

          <div className="section-divider section-divider-spaced">
            <h4 className="section-title">Invoice Details</h4>
          </div>

          <div className="field-row">
            <div className="field-group field-flex">
              <label className="field-label" htmlFor="invoiceNum">
                Invoice Number
              </label>
              <input
                className="field-input"
                type="text"
                id="invoiceNum"
                name="invoiceNumber"
                placeholder="INV-001"
                value={invoiceNumber}
                onChange={handleOnChange}
              />
            </div>
            <div className="field-group field-flex">
              <label className="field-label" htmlFor="invoiceDate">
                Date <sup className="required">*</sup>
              </label>
              <input
                className="field-input"
                type="date"
                id="invoiceDate"
                name="date"
                value={date}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="section-divider section-divider-items">
            <h4 className="section-title">Add Invoice Items</h4>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="desc">
              Description
            </label>
            <input
              className="field-input"
              type="text"
              id="desc"
              name="itemDesc"
              value={itemInput.itemDesc}
              onChange={handleItemInputChange}
              placeholder="Item description"
            />
          </div>

          <div className="item-input-row">
            <div className="field-group field-flex">
              <label className="field-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="field-input"
                type="number"
                name="quantity"
                value={itemInput.quantity}
                onChange={handleItemInputChange}
                min="1"
              />
            </div>
            <div className="field-group field-flex">
              <label className="field-label" htmlFor="price">
                Price($)
              </label>
              <input
                className="field-input"
                type="number"
                name="price"
                value={itemInput.price}
                onChange={handleItemInputChange}
                min="0"
                step="0.01"
              />
            </div>
            <button
              onClick={handleAddItems}
              className="add-item-button "
              type="button"
            >
              Add Item
            </button>
          </div>

          <div>
            <h4 className="items-title">Current Items</h4>
            {items.length === 0 ? (
              <p className="no-items-text">
                No items added yet.
              </p>
            ) : (
              <ul className="items-list">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="item-row"
                  >
                    <div className="item-details">
                      <h3 className="item-name">{item.itemDesc}</h3>
                      <h6 className="item-calculation">
                        {item.quantity} x ${item.price.toFixed(2)} = $
                        {(item.quantity * item.price).toFixed(2)}
                      </h6>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(InvoiceForm);