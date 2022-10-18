import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfilScreen from './components/screens/ProfilScreen';
import UsersListScreen from "./components/screens/UsersListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-4">
        <Container className="container-index">
          <Routes>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfilScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/admin/userlist" element={<UsersListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />


          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter >


  );
}

export default App;
