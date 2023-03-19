import NavBar from "../components/NavBar";

import Tickets from "../components/Tickets";
import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <NavBar />
        <br />
        <Typography variant="h4" gutterBottom>
          Incident Dashboard
        </Typography>
        <Link to="/create-ticket">
          <Button
            variant="contained"
            style={{ marginTop: "40px", marginBottom: "40px" }}
            // href="/createticket"
          >
            new incident(Tickets)
          </Button>
        </Link>
        <Tickets />
        {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} /> */}
        {/* <AddBar /> */}
      </Container>
    </div>
  );
}

export default App;

export async function loader() {
  const response = await fetch(
    // "https://comp229-group3-w2023.azurewebsites.net/api/incidentTicket/tickets"
    "https://comp229-group3-w2023.azurewebsites.net/api/incident-ticket/tickets"
  );
  const resData = await response.json();

  // console.log("first");
  return resData;
}
