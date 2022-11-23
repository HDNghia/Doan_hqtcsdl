import './App.scss';
import Home from './user/Home';
import User1 from './user1/user1';
import User2 from './user2/user2';
import User3 from './User3/user3';
import Admin from './Admin/Admin';
import Login from './Login/Login';
import Page_member from './page_member/page_member';
import Final from './Book-chair/Final';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRouteHome />} />
        <Route path="/Final/:selected/:totalprice" element={<Final />} />
        <Route path="/user1" element={<User1 />} />
        <Route path="/user2" element={<User2 />} />
        <Route path="/user3" element={<User3 />} />
        <Route path="/admin" element={<PrivateRouterAdmin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/page_member" element={<PrivateRouteMember />} />
      </Routes>
    </Router>
  );
}
function PrivateRouteMember() {
  return localStorage.getItem("accessToken") == "user" ? <Page_member /> : <Navigate to="/Login" />;
}
function PrivateRouteHome() {
  return localStorage.getItem("accessToken") == "user" ? <Home /> : <Navigate to="/Login" />;
}
function PrivateRouterAdmin() {
  return localStorage.getItem("accessToken") == "admin" ? <Admin /> : <Navigate to="/Login" />;
}
export default App;
