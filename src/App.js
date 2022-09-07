import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./Components/Navbar";
import Auth from "./Components/Pages/Auth";
import React from "react";
import _404 from "./Components/Pages/_404";
import Main from "./Components/Pages/Main";
import Exit from "./Components/Pages/Exit";
import Users from "./Components/Pages/Admin/Users";
import CreateUser from "./Components/Pages/Admin/CreateUser";
import CreateWorkShift from "./Components/Pages/Admin/CreateWorkShift";
import WorkShift from "./Components/Pages/WorkShift";
import WorkShiftInfo from "./Components/Pages/WorkShiftInfo";
import CreateOrder from "./Components/Pages/Officiant/CreateOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Navbar />
        <div className="container">
            <Routes>
                {/* все доступные для пользователей */}
                <Route
                    element={<Main />}
                    path={"/"}
                />
                <Route
                    element={<Auth />}
                    path={"/auth"}
                />
                {/* доступные авторизованым */}
                <Route
                    element={<Exit />}
                    path={"/exit"}
                />
                <Route
                    element={<WorkShift />}
                    path={"/work-shift"}
                />
                <Route
                    element={<WorkShiftInfo />}
                    path={"/work-shift/:id"}
                />
                {/* доступные админу */}
                <Route
                    element={<Users />}
                    path={"/users"}
                />
                <Route
                    element={<CreateUser />}
                    path={"/users/create"}
                />
                <Route
                    element={<CreateWorkShift />}
                    path={"/add-work-shift"}
                />
                <Route
                    element={<CreateOrder />}
                    path={"/order-create"}
                />
                {/* валидация 404 */}
                <Route
                    element={<_404 />}
                    path={"*"}
                />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
