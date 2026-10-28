// Client API service with Anonymous Session Isolation

const getSessionId = () => {
  let sessionId = localStorage.getItem('tp_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('tp_session_id', sessionId);
  }
  return sessionId;
};

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API ||
  import.meta.env.Vite_api ||
  '';

const API_BASE = rawApiUrl
  ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, '')}/api`)
  : '/api';

export const api = {
  getSessionId,

  async analyzeCommand(command) {
    const sessionId = getSessionId();
    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ command, sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Analysis failed with status ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn('Backend API request failed, checking client fallback:', err.message);
      throw err;
    }
  },

  async getHistory() {
    const sessionId = getSessionId();
    try {
      const response = await fetch(`${API_BASE}/history?sessionId=${encodeURIComponent(sessionId)}`, {
        headers: {
          'x-session-id': sessionId,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch history (${response.status})`);
      }

      return await response.json();
    } catch (err) {
      console.warn('Failed to load remote history:', err.message);
      // Fallback to local storage cache if server is unavailable
      const localHistory = JSON.parse(localStorage.getItem('tp_local_history') || '[]');
      return { history: localHistory, total: localHistory.length, isOffline: true };
    }
  },

  async deleteHistoryItem(id) {
    const sessionId = getSessionId();
    const response = await fetch(`${API_BASE}/history/${id}?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
      headers: {
        'x-session-id': sessionId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete history record');
    }
    return await response.json();
  },

  async clearHistory() {
    const sessionId = getSessionId();
    const response = await fetch(`${API_BASE}/history?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
      headers: {
        'x-session-id': sessionId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to clear history');
    }
    return await response.json();
  },

  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE}/health`, { method: 'GET' });
      return response.ok;
    } catch {
      return false;
    }
  }
};
