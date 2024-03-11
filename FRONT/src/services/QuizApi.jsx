const API_BASE_URL = 'http://localhost:3001/v1';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
      throw { status: response.status, message: errorData.message  || 'Erreur lors de la communication avec la base de données' };
  }
  const result = await response.json()
  return result;
}

export async function getAllQuiz(token) {
  const response = await fetch(`${API_BASE_URL}/quiz/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getQuizById(token, id) {
  const response = await fetch(`${API_BASE_URL}/quiz/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getAllGuestQuiz() {
  const response = await fetch(`${API_BASE_URL}/quiz/top`);
  return handleResponse(response);
}

export async function getGuestQuizById(id) {
  const response = await fetch(`${API_BASE_URL}/quiz/top/${id}`);
  return handleResponse(response);
}

export async function getAllStatisticAdmin(token) {
  const response = await fetch(`${API_BASE_URL}/admin/statistic`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getAllQuizAdmin(token) {
  const response = await fetch(`${API_BASE_URL}/admin/quiz/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getQuizByIdAdmin(token, id) {
  const response = await fetch(`${API_BASE_URL}/admin/quiz/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getAllUserAdmin(token){
  const response = await fetch(`${API_BASE_URL}/admin/user/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getUserByIdAdmin(token, id){
  const response = await fetch(`${API_BASE_URL}/admin/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getAllBanwordAdmin(token){
  const response = await fetch(`${API_BASE_URL}/admin/banword/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function getBanwordByIdAdmin(token, id) {
  const response = await fetch(`${API_BASE_URL}/admin/banword/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function deleteBanwordAdmin(token, id){
  const response = await fetch(`${API_BASE_URL}/admin/banword/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

export async function updateBanwordAdmin(token, id, updatedData){
  const response = await fetch(`${API_BASE_URL}/admin/banword/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });
  return handleResponse(response);
}

export async function addBanwordAdmin(token, data){
  const response = await fetch(`${API_BASE_URL}/admin/banword`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function updateQuizAdmin(token, id, updatedData){
  const response = await fetch(`${API_BASE_URL}/admin/quiz/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });
  return handleResponse(response);
}

export async function deleteQuizAdmin(token, id){
  const response = await fetch(`${API_BASE_URL}/admin/quiz/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

export async function deleteUserAdmin(token, id){
  const response = await fetch(`${API_BASE_URL}/admin/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

export async function updateUserAdmin(token, id, updatedData) {
  const response = await fetch(`${API_BASE_URL}/admin/user/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });
  return handleResponse(response);
}

export async function createUser(data){
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function signinUser(data){
  const response = await fetch(`${API_BASE_URL}/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function getProfile(token){
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
}

export async function updateProfile(token, updatedData){
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });
  return handleResponse(response);
}

export async function saveScore(token, data){
  const response = await fetch(`${API_BASE_URL}/quiz/score`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function updateScore(token, updatedData){
  const response = await fetch(`${API_BASE_URL}/quiz/score/edit`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData) 
  });
  return handleResponse(response);
}

export async function generateQuiz(token, data){
  const response = await fetch(`${API_BASE_URL}/quiz/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return handleResponse(response);
}

export async function saveIaQuiz(token, data){
  const response = await fetch(`${API_BASE_URL}/quiz/save`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return handleResponse(response);
}

export async function quizRate(token, data){
  const response = await fetch(`${API_BASE_URL}/quiz/rate`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  });
  return handleResponse(response);
}

export async function getAllNicknames() {
  const response = await fetch(`${API_BASE_URL}/user/nickname`);
  return handleResponse(response);
}