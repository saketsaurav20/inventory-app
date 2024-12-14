/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (updatedData: any) => void;
};

const Popup = ({ open, onClose, data, onSave }: PopupProps) => {
  const [formData, setFormData] = React.useState(data);

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData: any) => {
      const updatedData = {
        ...prevFormData,
        [name]: name === "quantity" ? parseInt(value || "0", 10) : value,
      };
  
      // Strip non-numeric characters from price
      const price = parseFloat((updatedData.price || "0").replace(/[^0-9.]/g, ""));
      const quantity = parseInt(updatedData.quantity || "0", 10);
  
      // Calculate the value
      updatedData.value = (price * quantity).toFixed(2);
  
      return updatedData;
    });
  };
  
  
  
  

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-gray-300 rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Edit product</h2>
          <button
            onClick={onClose}
            className="hover:text-white focus:outline-none text-limeGreen"
          >
            ✕
          </button>
        </div>

        {/* Product Name */}
        <p className="text-lg font-medium mb-4">{formData.name}</p>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || 0}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Value</label>
              <input
                type="text"
                name="value"
                value={formData.value || ""}
                disabled
                className="w-full px-3 py-2 bg-gray-800 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-md text-sm text-limeGreen hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 rounded-md text-sm text-white hover:bg-green-500 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
