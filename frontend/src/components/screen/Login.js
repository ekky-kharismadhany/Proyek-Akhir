import { Avatar, Card, CardContent, Grid, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ButtonComponent from "../Button";
import TextFieldComponent from "../TextField";
import { blue } from "@mui/material/colors";
import auth from "../../services/auth";
import { Navigate } from 'react-router-dom';

function LoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setLoginState] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        if (auth(username, password)) {
            setLoginState(true);
        } else {
            alert("Login gagal");
        }
    }

    const Form = (
        <React.Fragment>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                <Card elevation={8}>
                    <CardContent>
                        <Toolbar>
                            <form onSubmit={handleSubmit} method="POST">
                                <Grid container justify="center" alignItems="center" wrap="wrap" direction="column">
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: blue[500] }}>PA</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <TextFieldComponent name="username" label="Username" value={username} type="text" onChange={(event) => setUsername(event.target.value)}></TextFieldComponent>
                                    </Grid>
                                    <Grid item>
                                        <TextFieldComponent name="password" label="Password" value={password} type="password" onChange={(event) => setPassword(event.target.value)}></TextFieldComponent>
                                    </Grid>
                                    <ButtonComponent text="Login" type="submit"></ButtonComponent>
                                </Grid>
                            </form>
                        </Toolbar>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    )

    return (
        <div>
            {isLogin
                ? <Navigate to="/dashboard"/> 
                : Form
            }
        </div>

    );
}

export default LoginScreen;