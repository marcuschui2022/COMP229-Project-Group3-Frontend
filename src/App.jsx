// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import NavBar from "./components/NavBar";
// import { Box } from "@mui/material";
import Container from "@mui/material/Container";
function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <NavBar />
      </Container>
    </div>
  );
}

export default App;
