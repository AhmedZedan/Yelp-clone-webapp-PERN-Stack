import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailsPage from "./routes/RestaurantDetails";
import { RestaurantsContextProvider } from "./context/RestaurantContext";

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route exact path="/" Component={Home} />
                        <Route exact path="/restaurants/:id/update" Component={UpdatePage} />
                        <Route exact path="/restaurants/:id" Component={RestaurantDetailsPage} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>

    )
}

export default App;