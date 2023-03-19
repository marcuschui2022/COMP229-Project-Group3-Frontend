import { Button, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const buttonMargin = { marginTop: "40px" };

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "100vh" }}
        >
          {/* <Button size="large" variant="outlined" href="/dashboard">
            Guest
          </Button> */}
          <Link to="dashboard">
            <Button size="large" variant="outlined">
              Guest
            </Button>
          </Link>

          <Button
            size="large"
            style={buttonMargin}
            variant="outlined"
            href="/login"
          >
            Login
          </Button>

          <Button
            size="large"
            style={buttonMargin}
            variant="outlined"
            href="/register"
          >
            User Register
          </Button>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
