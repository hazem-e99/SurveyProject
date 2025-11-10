import { mockDB, delay, generateId, saveMockDB } from './mockData';

export const questionService = {
  async getQuestionsByPollId(pollId) {
    await delay();
    return mockDB.questions
      .filter(q => q.poll_id === parseInt(pollId))
      .sort((a, b) => a.order_number - b.order_number)
      .map(q => ({
        ...q,
        options: q.question_type === 'mcq'
          ? mockDB.mcq_options
              .filter(o => o.question_id === q.id)
              .sort((a, b) => a.order_number - b.order_number)
          : [],
      }));
  },
  
  async createQuestion(questionData) {
    await delay(600);
    const { options, ...questionInfo } = questionData;
    
    const newQuestion = {
      id: generateId('questions'),
      ...questionInfo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockDB.questions.push(newQuestion);
    
    // Add options if MCQ
    if (questionInfo.question_type === 'mcq' && options && options.length > 0) {
      options.forEach((optionText, index) => {
        const newOption = {
          id: generateId('mcq_options'),
          question_id: newQuestion.id,
          option_text: optionText,
          order_number: index + 1,
          created_at: new Date().toISOString(),
        };
        mockDB.mcq_options.push(newOption);
      });
    }
    
    saveMockDB();
    return newQuestion;
  },
  
  async updateQuestion(id, questionData) {
    await delay(600);
    const { options, ...questionInfo } = questionData;
    const index = mockDB.questions.findIndex(q => q.id === parseInt(id));
    if (index === -1) throw new Error('Question not found');
    
    mockDB.questions[index] = {
      ...mockDB.questions[index],
      ...questionInfo,
      updated_at: new Date().toISOString(),
    };
    
    // Update options if MCQ
    if (questionInfo.question_type === 'mcq' && options) {
      // Remove old options
      mockDB.mcq_options = mockDB.mcq_options.filter(o => o.question_id !== parseInt(id));
      
      // Add new options
      options.forEach((optionText, index) => {
        const newOption = {
          id: generateId('mcq_options'),
          question_id: parseInt(id),
          option_text: optionText,
          order_number: index + 1,
          created_at: new Date().toISOString(),
        };
        mockDB.mcq_options.push(newOption);
      });
    }
    
    saveMockDB();
    return mockDB.questions[index];
  },
  
  async deleteQuestion(id) {
    await delay(400);
    const index = mockDB.questions.findIndex(q => q.id === parseInt(id));
    if (index === -1) throw new Error('Question not found');
    
    // Delete associated options
    mockDB.mcq_options = mockDB.mcq_options.filter(o => o.question_id !== parseInt(id));
    
    mockDB.questions.splice(index, 1);
    saveMockDB();
    return { success: true };
  },
};
