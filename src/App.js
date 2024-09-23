import { Routes, Route } from "react-router-dom";
import {
  DetailPost,
  Home,
  HomePage,
  Login,
  SearchDetail,
} from "./containers/public";
import { path } from "./utils/constant";
import Rental from "./containers/public/RentalApartment/Rental";
import { Contact, CreatePost, ManagePost, System } from "./containers/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getCategories, getPrices, getProvinces, getUserDetail } from "./store/actions";


function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getUserDetail());
    }, 100);
  }, [isLoggedIn]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories());
      dispatch(getPrices());
      dispatch(getAreas());
      dispatch(getProvinces());
    }, 100);
  }, []);
  const EmptyComponent = () => null;
  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route
            path={path.DETAIL_POST__TITLE__POSTiD}
            element={<DetailPost />}
          />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.CONTACT} element={<Contact />} />
        </Route>
        <Route path="social" element={<EmptyComponent />}/>
      </Routes>
    </div>
  );
}

export default App;
