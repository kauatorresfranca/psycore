import { createGlobalStyle } from "styled-components";

export const colors = {
    primary: '#083ed1',
    secondary: '#10b981',
    background: '#e9ecee',
}

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: ${colors.background};
        color: #334155;
    }
    `