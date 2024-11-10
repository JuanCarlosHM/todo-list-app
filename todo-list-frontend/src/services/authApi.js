const API = process.env.URL_API

const fetchApi = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error en la solicitud')
    }

    return response.json()
  } catch (error) {
    throw new Error(error.message || 'Error en la conexión con el servidor')
  }
}

// Registro de usuario
export const registerUser = async (email, password) => {
  return fetchApi(`${API}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

// Inicio de sesión
export const loginUser = async (email, password) => {
  return fetchApi(`${API}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  })
}

export const logoutUser = async () => {
  return fetchApi(`${API}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
}
