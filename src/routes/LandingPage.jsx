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

          <Link to="login">
            <Button size="large" style={buttonMargin} variant="outlined">
              Login
            </Button>
          </Link>

          <Link to="signup">
            <Button size="large" style={buttonMargin} variant="outlined">
              User Register
            </Button>
          </Link>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
