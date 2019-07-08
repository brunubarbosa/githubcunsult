import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    -ms-hyphenate-limit-chars, border-style, #root {
        min-height: 100%;
    }

    body {
        background-color: #7159c1;
        -webkit-font-smoothings: antialiased !important;

    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;

    }

    button {
        cursor: pointer;
    }
`;
