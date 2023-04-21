import { useState } from "react";
import CategoryList from "./components/CategoryList/CategoryList";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import FastFoodList from "./components/FastFoodList/FastFoodList";
import SerachBar from "./components/SearchBar/SerachBar";
import useAxios from "./useAxios";
import "./App.css";
import notFound from "./assets/images/404.png";

function App() {
  const [url, setUrl] = useState("/FastFood/list");
  const [fastFoodItems, , loading] = useAxios({
    url,
  });

  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list/${categoryId ? "?categoryId=" + categoryId : ""}`);
  };

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? "?term=" + term : ""}`);
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
