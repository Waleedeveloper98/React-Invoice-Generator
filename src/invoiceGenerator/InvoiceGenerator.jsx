import React, { useEffect, useMemo, useState } from "react";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview/InvoicePreview";
import "./InvoiceGenerator.css"; // Import CSS

const InvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderEmail: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([]);

  const [itemId, setItemId] = useState(1);

  const [itemInput, setItemInput] = useState({
    itemDesc: "",
    quantity: 1,
    price: 0,
  });

  const getSubtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );
  }, [items]);

  const getTenPercentTax = useMemo(() => getSubtotal * 0.1, [getSubtotal]);

  const totalWithTax = useMemo(
    () => getSubtotal + getTenPercentTax,
    [getSubtotal, getTenPercentTax]
  );

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItems = () => {
    if (!itemInput.itemDesc.trim()) return;

    const newItem = {
      ...itemInput,
      id: itemId,
    };
    setItems((prev) => [...prev, newItem]);
    setItemId((prev) => prev + 1);

    setItemInput({
      itemDesc: "",
      quantity: 1,
      price: 0,
    });
  };

  return (
    <div className="invoice-generator-container">
      <InvoiceForm
        formData={formData}
        setFormData={setFormData}
        handleAddItems={handleAddItems}
        items={items}
        itemInput={itemInput}
        setItemInput={setItemInput}
        handleDelete={handleDelete}
      />
      <InvoicePreview
        formData={formData}
        items={items}
        subtotal={getSubtotal}
        tax={getTenPercentTax}
        total={totalWithTax}
      />
    </div>
  );
};

export default InvoiceGenerator;
