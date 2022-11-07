import { AppContext } from "./context/appContext";
import { FormEdit, Homepage, NotFoundPage, OtherUser, Profile, Registro, UserPanel } from "./pages/index";
import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

function App() {

  return (
    <div className="colorFondo">

      <AppContext>

        <Routes>

          <Route path="/" element={<Homepage/>} />
          <Route path="*" element={<NotFoundPage/>} />
          <Route path="/userpanel" element={<UserPanel/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user/:id" element={<OtherUser/>} />
          <Route path="/editarperfil/:id" element={<FormEdit/>} />

        </Routes>
        <Toaster/>

      </AppContext>

    </div>
  );
}

export default App;
