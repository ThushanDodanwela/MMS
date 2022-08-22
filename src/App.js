import Home from "../src/pages/home/home";
import Login from "../src/pages/login/login";
import List from "../src/pages/lists/lists";
import EditModule from "../src/pages/EditModule/editmodule";
import NewModule from "../src/pages/NewModule/newmod";
import EditLecturer from "../src/pages/EditLecturer/editlecturer";
import Newlecturer from "../src/pages/NewLecturer/newLec";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="modules">
              <Route index element={<List />} />
              <Route path=":moduleID" element={<EditModule />} />
              <Route path="new" element={<NewModule />} />
            </Route>
            <Route path="Lecturer">
              <Route index element={<List />} />
              <Route path=":lecturerID" element={<EditLecturer />} />
              <Route path="new" element={<Newlecturer />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
