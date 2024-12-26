import baseAPI from './baseAPI';

export const feedbackService = {
  sendFeedback: async (feedback) => {
    try {
      const response = await baseAPI.post('/feedback', { feedback });
      return response.data;
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error;
    }
  },
};
