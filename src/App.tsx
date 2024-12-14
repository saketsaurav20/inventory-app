import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import "./index.css";
import NavBar from "./components/navbar/NavBar";
import Card from "./components/card/Card";
import { useFetchData } from "./hooks/useFetchData";
import ReusableTable from "./components/table/Table";
import Popup from "./components/popup/Popup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SyncIcon from "@mui/icons-material/Sync";
import CategoryIcon from "@mui/icons-material/Category";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";


interface Product {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
}

const App = () => {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState<Product | null>(null);
  const [tableData, setTableData] = React.useState<Product[]>([]);
  const { data, loading, error } = useFetchData<Product[]>("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory");

  const cardIcons: { [key: string]: React.ReactNode } = {
    "Total product": <ShoppingCartIcon fontSize="large" />,
    "Total store value": <SyncIcon fontSize="large" />,
    "Out of stocks": <RemoveShoppingCartIcon fontSize="large" />,
    "No of Category": <CategoryIcon fontSize="large" />,
  };

  React.useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const handleSwitch = () => {
    setIsAdmin((prev) => !prev);
  };

  const handleEdit = (row: Product) => {
    console.log(row);
    setCurrentRow(row);
    setPopupOpen(true);
  };

  const handleDelete = (row: Product) => {
    console.log(`Deleting row: ${row.name}`);
    setTableData((prevData) => prevData.filter((item) => item.name !== row.name));
  };

  const handleSave = (updatedRow: Product) => {
    console.log(updatedRow);
    setTableData((prevData) =>
      prevData.map((row) => (row.name === updatedRow.name ? updatedRow : row))
    );
    setPopupOpen(false);
  };

  const cardData = tableData
    ? [
        {
          title: "Total product",
          value: tableData.reduce((acc, item) => acc + (item.quantity || 0), 0),
        },
        {
          title: "Total store value",
          value: `$${tableData
            .reduce((acc, item) => acc + parseFloat((item.value || "0").replace("$", "")), 0)
            .toLocaleString()}`,
        },
        {
          title: "Out of stocks",
          value: tableData.filter((item) => item.quantity === 0).length,
        },
        {
          title: "No of Category",
          value: new Set(tableData.map((item) => item.category)).size,
        },
      ]
    : [];

    const columns = tableData?.length
    ? Object.keys(tableData[0]).map((key) => {
        if (key === "value" || key === "price") {
          return {
            title: key.charAt(0).toUpperCase() + key.slice(1),
            key,
            render: (value: string) => `$${parseFloat(value.replace("$", "")).toFixed(2)}`,
          };
        }
        return {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          key,
        };
      })
    : [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar isAdmin={isAdmin} handleSwitch={handleSwitch}/>
      <div className="text-3xl font-bold bg-gray-900 text-white pl-10">Inventory stats</div>
      <div className="flex justify-center gap-4 p-4 bg-gray-900">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}
        {!loading &&
          !error &&
          cardData.map((card, index) => (
            <Card 
            key={index} 
            icon={cardIcons[card.title]} 
            title={card.title} 
            value={card.value} 
          />
          ))}
      </div>
      {!loading && !error && (
        <div className="p-8 bg-gray-900">
          <ReusableTable isAdmin={isAdmin} columns={columns} data={tableData} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
      )}
      {/* Popup */}
      {currentRow && (
        <Popup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          data={currentRow}
          onSave={handleSave}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
