const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
let csrfToken = null

async function getCsrfToken() {
  const response = await fetch(`${API_URL}/csrf`, { credentials: 'include', headers: { Accept: 'application/json' } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Unable to initialize security token.')
  csrfToken = data.token
  return csrfToken
}

async function request(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase()
  const headers = { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    headers['X-CSRF-TOKEN'] = csrfToken || await getCsrfToken()
  }
  let response = await fetch(`${API_URL}${path}`, { credentials: 'include', ...options, headers })
  if (response.status === 419) {
    csrfToken = await getCsrfToken()
    response = await fetch(`${API_URL}${path}`, { credentials: 'include', ...options, headers: { ...headers, 'X-CSRF-TOKEN': csrfToken } })
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong.')
    error.errors = data.errors || {}
    error.status = response.status
    throw error
  }
  return data
}

export const api = {
  csrf: getCsrfToken,
  products: (params = {}) => request(`/products?${new URLSearchParams(Object.entries(params).filter(([,v]) => v))}`),
  product: id => request(`/products/${id}`),
  related: id => request(`/products/${id}/related`),
  categories: () => request('/categories'),
  cart: () => request('/cart'),
  addCart: (id, qty = 1) => request(`/cart/${id}`, { method:'POST', body:JSON.stringify({qty}) }),
  updateCart: (id, qty) => request(`/cart/${id}`, { method:'PATCH', body:JSON.stringify({qty}) }),
  removeCart: id => request(`/cart/${id}`, { method:'DELETE' }),
  login: body => request('/auth/login', { method:'POST', body:JSON.stringify(body) }),
  register: body => request('/auth/register', { method:'POST', body:JSON.stringify(body) }),
  logout: () => request('/auth/logout', { method:'POST' }),
  me: () => request('/auth/me'),
  orders: () => request('/orders'),
  placeOrder: body => request('/orders', { method:'POST', body:JSON.stringify(body) }),
  admin: {
    summary: () => request('/admin/summary'),
    users: () => request('/admin/users'),
    orders: () => request('/admin/orders'),
    products: () => request('/admin/products'),
    updateProduct: (id, body) => request(`/admin/products/${id}`, { method:'PATCH', body:JSON.stringify(body) }),
    updateOrder: (id, status) => request(`/admin/orders/${id}`, { method:'PATCH', body:JSON.stringify({status}) }),
    deleteUser: id => request(`/admin/users/${id}`, { method:'DELETE' }),
  }
}
