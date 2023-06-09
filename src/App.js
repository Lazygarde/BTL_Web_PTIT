
import { Route, Routes } from 'react-router-dom';
import Footer from './Component/Footer/Footer';
import Header from './Component/Header/Header';
import LoginPage from './Component/LoginPage/LoginPage';
import RegisterPage from './Component/RegisterPage/RegisterPage';
import BookTableBody from './Component/Body/BookTableBody';
import ClientHomePage from './Component/Body/ClientHomePage';
import OrderList from './Component/Order/OrderList';
import { Book } from './Component/BookDetail/Book';
import { BookClient } from './Component/BookClient/BookClient';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/library/login" element={<LoginPage />} />
        <Route path="/library/register" element={<RegisterPage />} />
        <Route path="/library" element={<MainPage />} />
        <Route path="/library/book/:id" element={<BookClient />} />
        <Route path="/admin" element={<BookTableBody />} />
        <Route path="/admin/book/:id" element={<Book />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
};


const MainPage = () => {
  return (
    <>
      <Header />
      {localStorage.getItem("token") === "admin" ? <BookTableBody /> : <ClientHomePage />}
      <Footer />
    </>
  );
};

const OrderPage = () => {
  return (
    <>
      <Header />
      <OrderList />
      <Footer />
    </>
  );
};

export default App;
