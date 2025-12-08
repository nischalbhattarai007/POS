// Utility functions
const utils = {
  // Sanitize HTML to prevent XSS
  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Format currency
  formatCurrency(amount) {
    return 'रु ' + parseFloat(amount).toFixed(2);
  },

  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  },

  // Show toast notification
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container') || this.createToastContainer();
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || ''}</span>
      <span class="toast-message">${this.sanitize(message)}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  
  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
  },
  
  // Backward compatibility
  showAlert(message, type = 'success') {
    this.showToast(message, type);
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Validate email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Check role access
  hasRole(requiredRole) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === requiredRole;
  },

  // Check if superadmin
  isSuperAdmin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === CONFIG.ROLES.SUPERADMIN;
  },
  
  // Confirm dialog replacement
  confirm(message, onConfirm, onCancel) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <div class="confirm-icon">⚠️</div>
        <div class="confirm-message">${this.sanitize(message)}</div>
        <div class="confirm-buttons">
          <button class="btn-confirm-cancel">Cancel</button>
          <button class="btn-confirm-ok">Confirm</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);
    
    overlay.querySelector('.btn-confirm-ok').onclick = () => {
      overlay.remove();
      if (onConfirm) onConfirm();
    };
    
    overlay.querySelector('.btn-confirm-cancel').onclick = () => {
      overlay.remove();
      if (onCancel) onCancel();
    };
    
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        overlay.remove();
        if (onCancel) onCancel();
      }
    };
  }
};
