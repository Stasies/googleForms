import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./pages/createForm/CreateForm";
import ViewForm from "./pages/viewForm/ViewForm";
import Responses from "./components/responses/Responses";
import "./global.css";
import Homepage from "./pages/homepage/Homepage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:id/edit" element={<CreateForm />} />
          <Route path="/:id/view" element={<ViewForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
