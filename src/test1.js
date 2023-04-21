import useAxios from "./useAxios";

function App() {
  const {
    response: fastFoodRes,
    loading,
    error,
  } = useAxios({
    method: "get",
    url: "/list",
  });
  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        fastFoodRes?.map((fastFood) => {
          return <li>{fastFood.name}</li>;
        })
      )}
    </div>
  );
}

export default App;
