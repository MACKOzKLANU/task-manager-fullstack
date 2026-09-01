// Plain js object acting as a "mailbox"
// Navbar (a React component, has access to hooks) writes the real
// handleLogout function here. axios.js (plain file, no access to React)
// reads from this same object and calls it when a logout is neededd

const logoutRef = {
    logout: null,
};

export default logoutRef