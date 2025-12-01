class ApiService {
  constructor() {
    this.baseURL = CONFIG.API_URL;
    this.token = localStorage.getItem('token') || '';
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = '';
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.data.token);
    return data;
  }

  async getProducts() {
    return await this.request('/products');
  }

  async createProduct(formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    const response = await fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers,
      body: formData
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  }

  async updateProduct(id, formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    const response = await fetch(`${this.baseURL}/products/${id}`, {
      method: 'PUT',
      headers,
      body: formData
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  }

  async deleteProduct(id) {
    return await this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  }

  async getCategories() {
    return await this.request('/categories');
  }

  async createCategory(category) {
    return await this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(category)
    });
  }

  async createInvoice(invoice) {
    return await this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice)
    });
  }

  async getInvoices() {
    return await this.request('/invoices');
  }

  async getCompanySettings() {
    return await this.request('/company');
  }

  async updateCompanySettings(settings) {
    return await this.request('/company', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  async uploadLogo(formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    const response = await fetch(`${this.baseURL}/company/logo`, {
      method: 'POST',
      headers,
      body: formData
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  }

  async changePassword(oldPassword, newPassword) {
    return await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword })
    });
  }

  async getUsers() {
    return await this.request('/admins');
  }

  async createUser(user) {
    return await this.request('/admins', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  }

  async deleteUser(id) {
    return await this.request(`/admins/${id}`, {
      method: 'DELETE'
    });
  }
}

const api = new ApiService();
