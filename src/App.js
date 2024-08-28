import "./App.css";
import DownloadCSV from "./DownloadCSV";
import { useEffect, useState } from "react";
import { API } from "./api";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";

function App() {
  const userHeaders = [
    "Listing ID",
    "Listing Title",
    "Page Name",
    "Amount Per Stay",
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState(null);
  const [pageSize, setPageSize] = useState(50);
  const [address, setAddress] = useState("Bangalore");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await API.request(pageSize, address);
      const x = await data.json();
      setData(x);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TextField sx={{mb:3}} value={pageSize} label="Page Size" onChange={(e)=> {
          setPageSize(e.target.value)
        }} />
        <TextField sx={{mb:3}} value={address} label="Page Size" onChange={(e)=> {
          setAddress(e.target.value)
        }} />
        <FormControl sx={{ mb: 3, width: "50%" }}>
          <InputLabel id="multi-select-label">Select Headers</InputLabel>
          <Select
            labelId="multi-select-label"
            multiple
            value={selectedOptions}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {userHeaders.map((header) => (
              <MenuItem key={header} value={header}>
                <Checkbox checked={selectedOptions.indexOf(header) > -1} />
                <ListItemText primary={header} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button sx={{mb:3}} onClick={fetchData}>Fetch Data</button>
        <DownloadCSV
          data={data?.data?.searchQueries?.search?.results}
          fileName={"MyFile"}
          headers={selectedOptions}
        />
      </header>
    </div>
  );
}

export default App;
