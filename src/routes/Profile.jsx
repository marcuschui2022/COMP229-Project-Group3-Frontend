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
  useLoaderData,
} from "react-router-dom";
function App() {
  const profile = useLoaderData();
  const errors = useActionData();

  // console.log(profile);

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
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              User name: {profile.username}
            </Typography>
            <Box
              // component="form"
              // noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <input
                  id="_id"
                  name="_id"
                  defaultValue={profile._id}
                  type="hidden"
                />
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="nickname"
                    required
                    fullWidth
                    id="nickname"
                    label="NICKNAME"
                    defaultValue={profile.nickname}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Profile
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/dashboard">
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

export async function loader({ params }) {
  if (
    !localStorage.getItem("user") ||
    !localStorage.getItem("token") ||
    !localStorage.getItem("nickname")
  ) {
    localStorage.clear();
    return redirect("/login");
  }
  const response = await fetch(
    "https://comp229-group3-w2023.azurewebsites.net/api/auth/profile/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  // const resData = await response.json();
  return response;
}

export async function action({ request }) {
  // console.log(`first`);
  // return null;
  const formData = await request.formData();
  const errors = {};

  const postData = Object.fromEntries(formData); // { body:... , author:... }
  const result = await fetch(
    "https://comp229-group3-w2023.azurewebsites.net/api/auth/profile/",
    {
      method: "PATCH",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
    // .then(async (x) => await x.json())
    // .then((x) => ({
    //   username: x.body.username,
    //   token: x.token,
    // }))
    // .then((x) => {
    //   console.log(x);
    //   return x;
    // })
    .catch((err) => null);

  if (result.statusText === "OK") {
    // console.log("first");
    // console.log(postData);
    localStorage.setItem("nickname", postData.nickname);
  }
  return redirect("/dashboard");
  // return null;
  // if (result === null) {
  //   errors.msg = "Incorrect username or password. ";
  //   return errors;
  // } else {
  //   localStorage.setItem("user", result.username);
  //   localStorage.setItem("token", result.token);
  //   // console.log(result.body);
  //   return redirect("/dashboard");
  //   // return null;
  // }
}
