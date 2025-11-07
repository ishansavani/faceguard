const safeLocalStorage = {
  getItem: (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage.getItem is not available:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage.setItem is not available:', error);
    }
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn('localStorage.removeItem is not available:', error);
    }
  },
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn('localStorage.clear is not available:', error);
    }
  },
  key: (index) => {
    try {
      return window.localStorage.key(index);
    } catch (error) {
      console.warn('localStorage.key is not available:', error);
      return null;
    }
  },
  get length() {
    try {
      return window.localStorage.length;
    } catch (error) {
      console.warn('localStorage.length is not available:', error);
      return 0;
    }
  },
};

export default safeLocalStorage;
