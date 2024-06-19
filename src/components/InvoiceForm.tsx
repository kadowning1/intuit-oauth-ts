// components/InvoiceForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface InvoiceData {
  customerId: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  invoiceDate: string;
  totalAmount: number;
  roomNights: number;
  unitPrice: number;
}

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    customerId: '',
    customerAddress: '',
    customerCity: '',
    customerCountry: '',
    invoiceDate: '',
    totalAmount: 0,
    roomNights: 0,
    unitPrice: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      alert('Invoice created successfully');
    } catch (error) {
      console.error('Error creating invoice', error);
      alert('Failed to create invoice');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="customerId"
          value={invoiceData.customerId}
          onChange={handleChange}
          placeholder="Customer ID"
        />
        <input
          name="customerAddress"
          value={invoiceData.customerAddress}
          onChange={handleChange}
          placeholder="Customer Address"
        />
        <input
          name="customerCity"
          value={invoiceData.customerCity}
          onChange={handleChange}
          placeholder="Customer City"
        />
        <input
          name="customerCountry"
          value={invoiceData.customerCountry}
          onChange={handleChange}
          placeholder="Customer Country"
        />
        <input
          name="invoiceDate"
          type="date"
          value={invoiceData.invoiceDate}
          onChange={handleChange}
        />
        <input
          name="totalAmount"
          type="number"
          value={invoiceData.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount"
        />
        <input
          name="roomNights"
          type="number"
          value={invoiceData.roomNights}
          onChange={handleChange}
          placeholder="Room Nights"
        />
        <input
          name="unitPrice"
          type="number"
          value={invoiceData.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
        />
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
