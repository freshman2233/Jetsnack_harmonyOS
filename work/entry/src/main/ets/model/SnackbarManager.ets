export class Message {
  id: number;
  text: string;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
  }
}

export class SnackbarManager {
  private static _instance: SnackbarManager;
  private _messages: Message[] = [];
  private _listeners: ((messages: Message[]) => void)[] = [];
  private _nextId: number = 1;

  private constructor() {}

  static get instance(): SnackbarManager {
    if (!SnackbarManager._instance) {
      SnackbarManager._instance = new SnackbarManager();
    }
    return SnackbarManager._instance;
  }

  get messages(): Message[] {
    return this._messages;
  }

  addListener(listener: (messages: Message[]) => void): void {
    this._listeners.push(listener);
  }

  removeListener(listener: (messages: Message[]) => void): void {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  showMessage(text: string): void {
    this._messages.push(new Message(this._nextId++, text));
    this._notifyListeners();
  }

  setMessageShown(messageId: number): void {
    this._messages = this._messages.filter((m) => m.id !== messageId);
    this._notifyListeners();
  }

  private _notifyListeners(): void {
    for (const listener of this._listeners) {
      listener(this._messages);
    }
  }
}
