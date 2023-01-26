import React from "react";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { AppProps } from "next/app";

const theme = extendTheme(
  {
    components: {
      Steps,
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
