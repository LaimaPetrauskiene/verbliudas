const SessionStorage = new (class SessionStorage {
  constructor() {
    this.storage = window.sessionStorage;
  }

  set(name, value) {
    this.storage.setItem(name, JSON.stringify(value));
  }

  get(name) {
    const value = this.storage.getItem(name);
    return value ? JSON.parse(value) : null;
  }

  clear(name) {
    this.storage.removeItem(name);
  }
})();

export default SessionStorage;
