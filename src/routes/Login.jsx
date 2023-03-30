import Container from "@mui/material/Container";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Link, redirect, useActionData } from "react-router-dom";
function App() {
  const errors = useActionData();

  // console.log(localStorage.setItem("user", "marucs"));
  // console.log(localStorage.getItem("user"));
  // console.log(localStorage.getItem("token"));
  // console.log(errors);

  return (
    <div className="App">
      <Container maxWidth="md">
        <Form method="post">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              // component="form"
              // noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    // autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              {errors && <span style={{ color: "red" }}>{errors?.msg}</span>}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/">
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      </Container>
    </div>
  );
}

export default App;

export async function action({ request }) {
  // console.log(`first`);
  // return null;
  const formData = await request.formData();
  const errors = {};

  const postData = Object.fromEntries(formData); // { body:... , author:... }
  const result = await fetch(
    "https://comp229-group3-w2023.azurewebsites.net/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (x) => await x.json())
    .then((x) => ({
      username: x.body.username,
      token: x.token,
    }))
    .catch((err) => null);

  console.log(result);
  // return null;
  if (result === null) {
    errors.msg = "Incorrect username or password. ";
    return errors;
  } else {
    localStorage.setItem("user", result.username);
    localStorage.setItem("token", result.token);
    // console.log(result.body);
    return redirect("/dashboard");
    // return null;
  }
}
