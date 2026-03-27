// API Configuration and Service
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Generic fetch wrapper with auth
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeAuthToken();
    window.location.href = '/login';
  }

  return response;
}

// Auth API
export const authAPI = {
  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    return response.json();
  },

  async login(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    setAuthToken(data.access_token);
    return data;
  },

  async getCurrentUser() {
    const response = await fetchWithAuth('/auth/me');
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  },

  logout() {
    removeAuthToken();
  },
};

// Data API
export const dataAPI = {
  async addData(data: {
    category: string;
    activity: string;
    quantity: number;
    unit: string;
    date?: string;
  }) {
    const response = await fetchWithAuth('/data/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add data');
    }

    return response.json();
  },

  async getData(days: number = 30) {
    const response = await fetchWithAuth(`/data/get?days=${days}`);

    if (!response.ok) {
      throw new Error('Failed to get data');
    }

    return response.json();
  },
};

// Dashboard API
export const dashboardAPI = {
  async getDashboard() {
    const response = await fetchWithAuth('/dashboard');

    if (!response.ok) {
      throw new Error('Failed to get dashboard data');
    }

    return response.json();
  },
};

// Simulation API
export const simulationAPI = {
  async simulate(dataIds: number[]) {
    const response = await fetchWithAuth('/simulate', {
      method: 'POST',
      body: JSON.stringify({ data_ids: dataIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to simulate');
    }

    return response.json();
  },
};

// Recommendations API
export const recommendationsAPI = {
  async getRecommendations() {
    const response = await fetchWithAuth('/recommendations');

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    return response.json();
  },
};

// Habits API
export const habitsAPI = {
  async getHabits() {
    const response = await fetchWithAuth('/habits');

    if (!response.ok) {
      throw new Error('Failed to get habits');
    }

    return response.json();
  },
};

// Payback API
export const paybackAPI = {
  async createPayback(totalDebt: number, duration: number) {
    const response = await fetchWithAuth('/payback', {
      method: 'POST',
      body: JSON.stringify({ total_debt: totalDebt, duration }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payback plan');
    }

    return response.json();
  },

  async getPayback() {
    const response = await fetchWithAuth('/payback');

    if (!response.ok) {
      throw new Error('Failed to get payback plans');
    }

    return response.json();
  },
};

// Digital Twin API
export const digitalTwinAPI = {
  async createSimulation(baselineEnergy: number, optimizedEnergy: number) {
    const response = await fetchWithAuth('/digital-twin', {
      method: 'POST',
      body: JSON.stringify({
        baseline_energy: baselineEnergy,
        optimized_energy: optimizedEnergy,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create simulation');
    }

    return response.json();
  },

  async getSimulations() {
    const response = await fetchWithAuth('/digital-twin');

    if (!response.ok) {
      throw new Error('Failed to get simulations');
    }

    return response.json();
  },
};

// Reports API
export const reportsAPI = {
  async getReports(days: number = 30) {
    const response = await fetchWithAuth(`/reports?days=${days}`);

    if (!response.ok) {
      throw new Error('Failed to get reports');
    }

    return response.json();
  },
};

// Goals API
export const goalsAPI = {
  async createGoal(goal: {
    title: string;
    target: number;
    unit: string;
    deadline: string;
  }) {
    const response = await fetchWithAuth('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    });

    if (!response.ok) {
      throw new Error('Failed to create goal');
    }

    return response.json();
  },

  async getGoals() {
    const response = await fetchWithAuth('/goals');

    if (!response.ok) {
      throw new Error('Failed to get goals');
    }

    return response.json();
  },

  async updateGoal(goalId: number, current: number) {
    const response = await fetchWithAuth(`/goals/${goalId}`, {
      method: 'PATCH',
      body: JSON.stringify({ current }),
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    return response.json();
  },

  async deleteGoal(goalId: number) {
    const response = await fetchWithAuth(`/goals/${goalId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }

    return response.json();
  },
};
