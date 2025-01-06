import baseAPI from './baseAPI';

export const feedbackService = {
  sendFeedback: async ({ feedback, userName, screenshots }) => {
    const formData = new FormData();
    formData.append('feedback', feedback);
    formData.append('userName', userName);

    screenshots.forEach((screenshot, index) => {
      formData.append('screenshots', {
        uri: screenshot,
        name: `screenshot_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    try {
      const response = await baseAPI.post('/feedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error submitting feedback:', err);
      throw err;
    }
  },
  getFeedbacks: async () => {
    console.log('getFeedbacks');
    const response = await baseAPI.get('/feedbacks');
    console.log('response.data', response.data);
    return response.data;
  },
  deleteFeedback: async (id) => {
    await baseAPI.delete(`/feedbacks/${id}`);
  },


};
