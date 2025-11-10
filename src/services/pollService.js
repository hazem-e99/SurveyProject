import { mockDB, delay, generateId, saveMockDB } from './mockData';

export const pollService = {
  async getAllPolls() {
    await delay();
    return [...mockDB.polls].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
  },
  
  async getPollById(id) {
    await delay();
    const poll = mockDB.polls.find(p => p.id === parseInt(id));
    if (!poll) throw new Error('Poll not found');
    return poll;
  },
  
  async createPoll(pollData) {
    await delay(800);
    const newPoll = {
      id: generateId('polls'),
      ...pollData,
      admin_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockDB.polls.push(newPoll);
    saveMockDB();
    return newPoll;
  },
  
  async updatePoll(id, pollData) {
    await delay(800);
    const index = mockDB.polls.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Poll not found');
    
    mockDB.polls[index] = {
      ...mockDB.polls[index],
      ...pollData,
      updated_at: new Date().toISOString(),
    };
    saveMockDB();
    return mockDB.polls[index];
  },
  
  async deletePoll(id) {
    await delay(600);
    const index = mockDB.polls.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Poll not found');
    
    // Delete associated questions and options
    const questionIds = mockDB.questions
      .filter(q => q.poll_id === parseInt(id))
      .map(q => q.id);
    
    mockDB.questions = mockDB.questions.filter(q => q.poll_id !== parseInt(id));
    mockDB.mcq_options = mockDB.mcq_options.filter(o => !questionIds.includes(o.question_id));
    mockDB.responses = mockDB.responses.filter(r => r.poll_id !== parseInt(id));
    
    mockDB.polls.splice(index, 1);
    saveMockDB();
    return { success: true };
  },
  
  async getPollWithQuestions(id) {
    await delay();
    const poll = await this.getPollById(id);
    const questions = mockDB.questions
      .filter(q => q.poll_id === parseInt(id))
      .sort((a, b) => a.order_number - b.order_number)
      .map(q => ({
        ...q,
        options: q.question_type === 'mcq'
          ? mockDB.mcq_options
              .filter(o => o.question_id === q.id)
              .sort((a, b) => a.order_number - b.order_number)
          : [],
      }));
    
    return { ...poll, questions };
  },
};
