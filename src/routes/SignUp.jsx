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
import {
  Form,
  Link,
  redirect,
  useActionData,
  useOutletContext,
} from "react-router-dom";
import React, { useContext } from "react";
function App() {
  const errors = useActionData();
  console.log(errors);

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
              Sign up
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
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    // autoComplete={false}
                    // autoComplete="email"
                  />
                </Grid>
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
                    Sign Up
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
  const errors = {};

  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body:... , author:... }
  const statusCode = await fetch(
    "https://comp229-group3-w2023.azurewebsites.net/api/auth/signup",
    {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((x) => {
    return x.status;
  });
  if (statusCode !== 202) {
    // return redirect("/");
    errors.msg = "Username or email exists.";

    return errors;
  } else {
    return redirect("/");
  }
}
