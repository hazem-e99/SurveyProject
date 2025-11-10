import { create } from 'zustand';
import { pollService } from '../services/pollService';
import { questionService } from '../services/questionService';

export const useSurveyStore = create((set, get) => ({
  polls: [],
  currentPoll: null,
  questions: [],
  loading: false,
  error: null,
  
  // Poll actions
  fetchPolls: async () => {
    set({ loading: true, error: null });
    try {
      const polls = await pollService.getAllPolls();
      set({ polls, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchPollById: async (id) => {
    set({ loading: true, error: null });
    try {
      const poll = await pollService.getPollWithQuestions(id);
      set({ currentPoll: poll, questions: poll.questions, loading: false });
      return poll;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  createPoll: async (pollData) => {
    set({ loading: true, error: null });
    try {
      const newPoll = await pollService.createPoll(pollData);
      set(state => ({ 
        polls: [newPoll, ...state.polls], 
        loading: false 
      }));
      return newPoll;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updatePoll: async (id, pollData) => {
    set({ loading: true, error: null });
    try {
      const updatedPoll = await pollService.updatePoll(id, pollData);
      set(state => ({
        polls: state.polls.map(p => p.id === id ? updatedPoll : p),
        currentPoll: state.currentPoll?.id === id ? updatedPoll : state.currentPoll,
        loading: false,
      }));
      return updatedPoll;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deletePoll: async (id) => {
    set({ loading: true, error: null });
    try {
      await pollService.deletePoll(id);
      set(state => ({
        polls: state.polls.filter(p => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // Question actions
  fetchQuestions: async (pollId) => {
    set({ loading: true, error: null });
    try {
      const questions = await questionService.getQuestionsByPollId(pollId);
      set({ questions, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  createQuestion: async (questionData) => {
    set({ loading: true, error: null });
    try {
      const newQuestion = await questionService.createQuestion(questionData);
      set(state => ({ 
        questions: [...state.questions, newQuestion], 
        loading: false 
      }));
      return newQuestion;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateQuestion: async (id, questionData) => {
    set({ loading: true, error: null });
    try {
      const updatedQuestion = await questionService.updateQuestion(id, questionData);
      set(state => ({
        questions: state.questions.map(q => q.id === id ? updatedQuestion : q),
        loading: false,
      }));
      return updatedQuestion;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  deleteQuestion: async (id) => {
    set({ loading: true, error: null });
    try {
      await questionService.deleteQuestion(id);
      set(state => ({
        questions: state.questions.filter(q => q.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  clearError: () => set({ error: null }),
  clearCurrentPoll: () => set({ currentPoll: null, questions: [] }),
}));
