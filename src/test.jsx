import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList/CategoryList";
import Header from "./components/Header/Header";
import axios from "./axios";
import Loading from "./components/Loading/Loading";
import FastFoodList from "./components/FastFoodList/FastFoodList";
import SerachBar from "./components/SearchBar/SerachBar";
import "./App.css";
import notFound from "./assets/images/404.png";

axios.defaults.baseURL =
  "https://react-mini-projects-api.classbon.com/FastFood";
function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [fastFoodItems, setFastFoodItems] = useState([]);

  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`
    );

    setLoading(false);
    setFastFoodItems(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterItems = (categoryId) => {
    fetchData(categoryId);
  };

  const searchItems = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `FastFood/search/${term ? "?term=" + term : ""}`
    );
    setLoading(false);
    setFastFoodItems(response.data);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }

    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            نتیجه ای یافت نشد
          </div>
          <img
            src={notFound}
            className="mx-auto mt-5 d-block fade-in-horiz"
            alt="404"
          />
        </>
      );
    }

    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header />
      <CategoryList filterItems={filterItems}>
        <SerachBar searchItems={searchItems} />
      </CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
