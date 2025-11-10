import { mockDB, delay, generateId, saveMockDB } from './mockData';

export const responseService = {
  async submitResponse(pollId, answers) {
    await delay(1000);
    
    // Create response entry
    const newResponse = {
      id: generateId('responses'),
      poll_id: parseInt(pollId),
      session_id: `session_${Date.now()}`,
      ip_address: '0.0.0.0', // Mock IP
      user_agent: navigator.userAgent,
      submitted_at: new Date().toISOString(),
    };
    
    mockDB.responses.push(newResponse);
    
    // Save answers
    answers.forEach(answer => {
      if (answer.type === 'mcq') {
        // MCQ answer(s)
        if (Array.isArray(answer.value)) {
          // Multiple selections
          answer.value.forEach(optionId => {
            mockDB.mcq_answers.push({
              id: generateId('mcq_answers'),
              response_id: newResponse.id,
              question_id: answer.question_id,
              option_id: optionId,
              answered_at: new Date().toISOString(),
            });
          });
        } else {
          // Single selection
          mockDB.mcq_answers.push({
            id: generateId('mcq_answers'),
            response_id: newResponse.id,
            question_id: answer.question_id,
            option_id: answer.value,
            answered_at: new Date().toISOString(),
          });
        }
      } else if (answer.type === 'text') {
        // Text answer
        mockDB.text_answers.push({
          id: generateId('text_answers'),
          response_id: newResponse.id,
          question_id: answer.question_id,
          answer_text: answer.value,
          answered_at: new Date().toISOString(),
        });
      }
    });
    
    saveMockDB();
    return newResponse;
  },
  
  async getResponsesByPollId(pollId) {
    await delay();
    const responses = mockDB.responses.filter(r => r.poll_id === parseInt(pollId));
    
    // Get questions for this poll
    const questions = mockDB.questions
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
    
    // Populate answers for each response
    const detailedResponses = responses.map(response => {
      const answers = questions.map(question => {
        if (question.question_type === 'mcq') {
          const mcqAnswers = mockDB.mcq_answers.filter(
            a => a.response_id === response.id && a.question_id === question.id
          );
          
          const selectedOptions = mcqAnswers.map(a => {
            const option = mockDB.mcq_options.find(o => o.id === a.option_id);
            return option ? option.option_text : '';
          });
          
          return {
            question_id: question.id,
            question_text: question.question_text,
            question_type: 'mcq',
            answer: selectedOptions.join(', '),
          };
        } else {
          const textAnswer = mockDB.text_answers.find(
            a => a.response_id === response.id && a.question_id === question.id
          );
          
          return {
            question_id: question.id,
            question_text: question.question_text,
            question_type: 'text',
            answer: textAnswer ? textAnswer.answer_text : '',
          };
        }
      });
      
      return {
        ...response,
        answers,
      };
    });
    
    return detailedResponses;
  },
  
  async getResponseCount(pollId) {
    await delay(200);
    return mockDB.responses.filter(r => r.poll_id === parseInt(pollId)).length;
  },
};
