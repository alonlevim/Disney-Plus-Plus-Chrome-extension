import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import NoMatch from "./NoMatch";
import Options from "./options/Options";
import Report from "./report/Report";
import { useMemo } from "react";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

interface RouteByQueryInteface {
  query: URLSearchParams;
}

const RouteByQuery = ({query }: RouteByQueryInteface) => {
  const navigation = useNavigate();
  
  switch(query.get("page")) {
    case "options": 
      return <Options />;
    case "report": 
      return <Report />;
    case null: 
      navigation("/options/index.html?page=options");
      return null;
    default: {
      return <NoMatch />;
    }
  }
};

function App() {
  const query = useQuery();
  
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <div className="App">
      <RouteByQuery query={query} />
    </div>
  );
}

export default App;
