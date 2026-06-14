import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import MainLayout from "./components/layouts/MainLayout";
import { lazy } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AdminRoute from "./components/auth/AdminRoute.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage.tsx"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider value={theme}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />

            <Route path="/product/:id" element={<ProductPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
            </Route>
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Toaster />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
