import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";

const App = () => {
  return (
    <>
      <ChakraProvider value={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/sign-in" element={<SignInPage />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
