import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppRouter from "./routes/AppRouter";

const theme = createTheme({

    palette:{

        mode:"light",

        primary:{
            main:"#1976d2"
        }

    }

});

function App(){

    return(

        <ThemeProvider theme={theme}>

            <CssBaseline/>

            <AppRouter/>

        </ThemeProvider>

    )

}

export default App;