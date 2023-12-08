import {
  HashRouter as BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"; // Auth con createContext
import Home from "./Home/Pages/Home";
import Landing from "./Home/Landing";
import Contacto from "./Home/Pages/Contacto";
import Nosotros from "./Home/Pages/Nosotros";
import Admin from "./Admin/Admin";
import LoginAdmin from "./Admin/pages/Login";
import Dashboard from "./Admin/pages/Dashboard";
import Usuarios from "./Admin/pages/Usuarios";
import Posts from "./Admin/pages/Posts";
import ListarPost from "./Admin/pages/ListarPost";
import FormTag from "./Admin/pages/Tags";
import Platform from "./mobile/Platform";
import LoginUsuario from "./Mobile/pages/Login";
import RegisterUser from "./Mobile/pages/RegisterUser";
import FeedUsuario from "./Mobile/pages/Feed";
import ViewPost from "./Mobile/pages/ViewPost";
import Participants from "./Mobile/components/Participants";
import FormPost from "./Mobile/pages/FormPost";
import Profile from "./Mobile/pages/Profile";
import EditProfile from "./Mobile/pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Landing />}>
            <Route path='/home' element={<Home />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </Route>
          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/login' element={<LoginAdmin />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/usuarios' element={<Usuarios />} />
            <Route path='/admin/posts' element={<Posts />} />
            <Route path='/admin/posts/listar' element={<ListarPost />} />
            <Route path='/admin/tags' element={<FormTag />} />
            <Route path='*' element={<Navigate to='/admin' replace />} />
          </Route>
          <Route path='/app' element={<Platform />}>
            <Route path='/app/login' element={<LoginUsuario />} />
            <Route path='/app/register' element={<RegisterUser />} />
            <Route path='/app/feed' element={<FeedUsuario />} />
            <Route path='/app/profile' element={<Profile />} />
            <Route path='/app/form/profile' element={<EditProfile />} />
            <Route path='/app/form/post/:id' element={<FormPost />} />
            <Route path='/app/view/post/:id' element={<ViewPost />} />
            <Route
              path='/app/view/post/participants'
              element={<Participants />}
            />
            <Route path='*' element={<Navigate to='/app' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
