import { createGlobalStyle } from 'styled-components'
export default createGlobalStyle`
 * {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 }
 html {
 font-size: 15px;
 /* Dimensions */
 --border-radius: 4px;
 /* Colors */
 --primary: #3a70e9;
 }
 body {
 -webkit-font-smoothing: antialiased;
 }
 button {
 font-family: 'Roboto Slab', sans-serif;
 }
 select {
	font-family: 'Roboto Slab', sans-serif;
 }
 a {
 font-family: 'Roboto Slab', sans-serif;
 }
 body, input , button, select {
		font-family: 'Roboto Slab', serif;
		font-size: 16px;
	}

	h1, h2, h3, h4, h5, strong {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}

`
