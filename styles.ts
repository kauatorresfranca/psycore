import { createGlobalStyle } from "styled-components";

export const colors = {
    primary: '#083ed1',
    secondary: '#10b981',
    background: '#ebeef0',
    primary_transparent: '#083ed14b',
    title: '#1e293b',
    text: '#64748b',
}

export const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: ${colors.background};
    }
    `