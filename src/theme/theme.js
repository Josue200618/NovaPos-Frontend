import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette:{

        mode:"light",

        primary:{
            main:"#2563EB"
        },

        secondary:{
            main:"#06B6D4"
        },

        success:{
            main:"#10B981"
        },

        warning:{
            main:"#F59E0B"
        },

        error:{
            main:"#EF4444"
        },

        background:{
            default:"#F4F7FC",
            paper:"#FFFFFF"
        }

    },

    typography:{

        fontFamily:"Roboto",

        h4:{
            fontWeight:700
        },

        h5:{
            fontWeight:600
        },

        button:{
            textTransform:"none",
            fontWeight:600
        }

    },

    shape:{
        borderRadius:12
    }

});

export default theme;