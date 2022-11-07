import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.componenet";
import Authentication from "./routes/authentication/authentication.componenet";
import Shops from "./routes/shop/shop.component"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shops />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );

}

export default App;
