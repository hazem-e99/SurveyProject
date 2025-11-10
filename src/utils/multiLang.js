/**
 * Get text in current language with fallback to English
 * @param {object|string} textObj - Multi-language object {ar, en, ku} or plain string
 * @param {string} currentLang - Current language code (ar, en, ku)
 * @returns {string} - Text in current language or fallback
 */
export const getLocalizedText = (textObj, currentLang = 'en') => {
  // If it's already a string (backward compatibility), return it
  if (typeof textObj === 'string') {
    return textObj;
  }
  
  // If it's an object with language keys
  if (textObj && typeof textObj === 'object') {
    // Try current language
    if (textObj[currentLang]) {
      return textObj[currentLang];
    }
    
    // Fallback to English
    if (textObj.en) {
      return textObj.en;
    }
    
    // Fallback to any available language
    const availableLangs = ['ar', 'ku'];
    for (const lang of availableLangs) {
      if (textObj[lang]) {
        return textObj[lang];
      }
    }
  }
  
  return '';
};

/**
 * Initialize empty multi-language object
 * @returns {object} - Empty multi-language object
 */
export const initMultiLangText = () => ({
  ar: '',
  en: '',
  ku: ''
});

/**
 * Check if text is available in all languages
 * @param {object} textObj - Multi-language object
 * @returns {boolean}
 */
export const isMultiLangComplete = (textObj) => {
  if (!textObj || typeof textObj !== 'object') return false;
  return Boolean(textObj.ar && textObj.en && textObj.ku);
};

/**
 * Check if at least one language is filled
 * @param {object} textObj - Multi-language object
 * @returns {boolean}
 */
export const hasAnyLanguage = (textObj) => {
  if (!textObj || typeof textObj !== 'object') return false;
  return Boolean(textObj.ar || textObj.en || textObj.ku);
};
