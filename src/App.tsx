import { Routes, Route, Navigate } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryDetails from "./pages/CountryDetails";
import Header from './components/Header';
import { COUNTRY_LIST, COUNTRY_DETAILS } from './routes';
import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path={COUNTRY_LIST} element={<CountryList />} />
          <Route path={COUNTRY_DETAILS} element={<CountryDetails />} />
          <Route
            path="*"
            element={<Navigate to={COUNTRY_LIST} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}
