import { create } from 'zustand';
import { responseService } from '../services/responseService';

export const useResponseStore = create((set, get) => ({
  responses: [],
  loading: false,
  error: null,
  
  fetchResponses: async (pollId) => {
    set({ loading: true, error: null });
    try {
      const responses = await responseService.getResponsesByPollId(pollId);
      set({ responses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  submitResponse: async (pollId, answers) => {
    set({ loading: true, error: null });
    try {
      const response = await responseService.submitResponse(pollId, answers);
      set({ loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  clearError: () => set({ error: null }),
}));
