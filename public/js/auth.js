function checkAuth(requiredRole = null) {
  const token = localStorage.getItem('token');
  const user = getUser();
  
  if (!token || !user) {
    window.location.href = 'login.html';
    return false;
  }
  
  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    window.location.href = user.role === CONFIG.ROLES.SUPERADMIN ? 'superadmin-dashboard.html' : 'dashboard.html';
    return false;
  }
  
  return true;
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
  }
}

function getUser() {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function redirectToDashboard() {
  const user = getUser();
  if (user) {
    window.location.href = user.role === CONFIG.ROLES.SUPERADMIN ? 'superadmin-dashboard.html' : 'dashboard.html';
  }
}
