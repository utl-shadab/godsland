import { Routes,Route } from "react-router-dom";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
    );
}

export default UserRoutes;