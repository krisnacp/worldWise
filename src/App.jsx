import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Suspense, lazy } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Navigate,
} from "react-router-dom";
import FakeAuthContext from "./context/FakeAuthContext";
import CityContext from "./context/CityContext";

import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";
import RootLayout from "./layouts/RootLayout";
import SpinnerFullPage from "./components/SpinnerFullPage";

import Homepage from "./pages/Homepage";
// penggunaan lazy function dapat mengoptimalkan load dari website, karena lazy akan membuat file bundle dari server ke client bisa didistribusikan secara bertahap, sehingga efeknya membuat load awal aplikasi menjadi lebih ringan. teknik import seperti dibawah disebut dengan dynamic import
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<RootLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
                path="app"
                element={
                    <ProtectedRoutes>
                        <AppLayout />
                    </ProtectedRoutes>
                }
            >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Route>,
    ),
);

function App() {
    return (
        <FakeAuthContext>
            <CityContext>
                {/* dynamic import bisa dibarengi denga penggunaan fitur Suspense yang disediaka oleh react */}
                <Suspense fallback={<SpinnerFullPage />}>
                    <RouterProvider router={router} />
                </Suspense>
            </CityContext>
        </FakeAuthContext>
    );
}

export default App;
