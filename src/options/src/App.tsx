import { useTranslation } from 'react-i18next';
import SideBar from "./options/SideBar";
import Main from "./options/Main/Main";

function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  return (
    <div className="App">
      <SideBar />

      <Main />
    </div>
  );
}

export default App;