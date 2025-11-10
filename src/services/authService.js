import { mockDB, delay } from './mockData';

export const authService = {
  async login(email, password) {
    await delay(800);
    
    const admin = mockDB.admins.find(
      (a) => a.email === email && a.password_hash === password
    );
    
    if (!admin) {
      throw new Error('Invalid credentials');
    }
    
    const { password_hash, ...adminData } = admin;
    const token = `mock_token_${admin.id}_${Date.now()}`;
    
    return {
      admin: adminData,
      token,
    };
  },
  
  async logout() {
    await delay(300);
    return { success: true };
  },
  
  async validateToken(token) {
    await delay(200);
    return token && token.startsWith('mock_token_');
  },
};
