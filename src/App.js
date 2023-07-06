import "./styles.css";
import { useContext } from "react";
import TicketObsList from "./pages/TicketObsList";
import TicketsPrintList from "./pages/TicketsPrintList";
import TicketDetails from "./pages/TicketDetails";
import Observations from "./pages/Observations";
import { GlobalContext } from "./context/GlobalContext";
import Nav from "./components/Nav";
export default function App() {
  const { context } = useContext(GlobalContext);
  return (
    <div className="App">
      <Nav />
      {context.page === undefined && <h1>{context}</h1>}
      {context.page === "listObs" && <TicketObsList />}
      {context.page === "listPrint" && <TicketsPrintList />}
      {context.page === "details" && <TicketDetails />}
      {context.page === "observations" && <Observations />}
    </div>
  );
}
