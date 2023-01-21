import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import FeedPage from "./Pages/feedPage";
import Header from "./Pages/header";
import React, { useState } from 'react';
import DiaryPage from "./Pages/diarypage";
import ProfilePage from "./Pages/profilepage";
import NotificationPage from "./Pages/notification";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const [currentPage, setCurrentPage] = useState("LOGIN");
  const state = useAuthContext();

  return (
    <BrowserRouter>
      <div className="App">
        {state.token && <Header />}
        <Routes>
          <Route path="/" element={state.token ? <FeedPage setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />} />
          <Route path="/feed/:id" element={state.token ? <FeedPage setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />} />
          <Route path="/diary/:id" element={state.token ? <DiaryPage setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />} />
          <Route path="/profile/:id" element={state.token ? <ProfilePage setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />} />
          <Route path="/notifications/:id" element={state.token ? <NotificationPage setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
