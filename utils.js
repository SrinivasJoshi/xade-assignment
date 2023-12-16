import axios from 'axios';
import { OPEN_AI_API_KEY } from '@env';

export const createThread =  async () => {
  const apiUrl = 'https://api.openai.com/v1/threads';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
    'OpenAI-Beta': 'assistants=v1',
    'OpenAI-Organization':'org-0KV6WwJn6n5YmIOMspeOgz0C'
  };

  return axios.post(apiUrl,null,{ headers })
    .then(response => {
      return response.data.id;
    })
    .catch(error => {
      console.error('Error creating thread:', error.response ? error.response.data : error.message);
      throw error;
    });
}

export const createMessage = async (threadId, content) => {
    const apiUrl = `https://api.openai.com/v1/threads/${threadId}/messages`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
      'OpenAI-Beta': 'assistants=v1',
      'OpenAI-Organization':'org-0KV6WwJn6n5YmIOMspeOgz0C'
    };
  
    const data = {
      role: 'user',
      content: content,
    };
  
    return axios.post(apiUrl, data, { headers })
      .then(response => {
        return response.id;
      })
      .catch(error => {
        console.error('Error creating message:', error.response ? error.response.data : error.message);
        throw error;
      });
  }

export const startRun = async (threadId) => {
    const apiUrl = `https://api.openai.com/v1/threads/${threadId}/runs`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
      'OpenAI-Beta': 'assistants=v1',
      'OpenAI-Organization':'org-0KV6WwJn6n5YmIOMspeOgz0C'
    };
  
    const data = {
      assistant_id: "asst_QF467dfeaKqRmhX1cEBXQuES",
      model: 'gpt-4',
    };
  
    return axios.post(apiUrl, data, { headers })
      .then(response => {
        return response.data.id;
      })
      .catch(error => {
        console.error('Error starting run:', error.response ? error.response.data : error.message);
        throw error;
      });
  }

export const checkRunStatus = async (threadId, runId) => {
    const apiUrl = `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`;
    const headers = {
      'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
      'OpenAI-Beta': 'assistants=v1',
      'OpenAI-Organization':'org-0KV6WwJn6n5YmIOMspeOgz0C'
    };
  
    try {
      const response = await axios.get(apiUrl, { headers });
      return response.data.status === "completed";
    } catch (error) {
      console.error('Error checking run status:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const getThreadMessages = async (threadId) => {
    const apiUrl = `https://api.openai.com/v1/threads/${threadId}/messages`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
      'OpenAI-Beta': 'assistants=v1',
      'OpenAI-Organization':'org-0KV6WwJn6n5YmIOMspeOgz0C'
    };
  
    try {
      const response = await axios.get(apiUrl, { headers });
      return response.data.data[0].content[0].text.value;
    } catch (error) {
      console.error('Error getting thread messages:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

