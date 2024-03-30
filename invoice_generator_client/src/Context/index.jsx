import { createContext, useContext ,useState,useEffect} from "react";

const carContext = createContext();

export const CarContextProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:4000/carsList")
      .then((response) => response.json())
      .then((result) => {
        setCars(result.data)
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  return <carContext.Provider value={{ cars ,loading}}>{children}</carContext.Provider>;
};

export const useCarContext = () => {
  const { cars,loading } = useContext(carContext);

  return { cars,loading };
};
