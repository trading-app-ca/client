let fetchUserData, loginUser, registerUser, ApiManager;

beforeAll(() => {
  jest.mock('../../apimanager/ApiManager', () => ({
    getUserData: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  }));

  ApiManager = require('../../apimanager/ApiManager');
  const authSlice = require('../../redux/authSlice');
  fetchUserData = authSlice.fetchUserData;
  loginUser = authSlice.loginUser;
  registerUser = authSlice.registerUser;
});

let dispatch;
let getState;

beforeEach(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  dispatch = jest.fn();
  getState = jest.fn(() => ({
    auth: {
      token: 'mockedToken',
      user: null,
      isAuthenticated: false,
      status: 'idle',
      error: null,
    },
  }));
  jest.clearAllMocks();
});

describe('authSlice async thunks', () => {
  it('fetchUserData should dispatch correct actions on success', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    ApiManager.getUserData.mockResolvedValueOnce(mockUserData);

    global.localStorage.getItem.mockReturnValueOnce('mockedToken');

    await fetchUserData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUserData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserData.fulfilled.type,
      payload: mockUserData,
    }));
  });

  it('fetchUserData should dispatch rejected action when no token is found', async () => {
    getState = jest.fn(() => ({
      auth: {
        token: null,
      },
    }));

    global.localStorage.getItem.mockReturnValueOnce(null);

    await fetchUserData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUserData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserData.rejected.type,
      payload: 'No token found',
    }));
  });

  it('loginUser should dispatch correct actions on success', async () => {
    const loginData = { username: 'johndoe', password: 'password' };
    const mockLoginResponse = { token: 'mockedToken', user: { id: 1, name: 'John Doe' } };

    ApiManager.login.mockResolvedValueOnce(mockLoginResponse);

    await loginUser(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: loginUser.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: loginUser.fulfilled.type,
      payload: mockLoginResponse,
    }));
    expect(global.localStorage.setItem).toHaveBeenCalledWith('authToken', mockLoginResponse.token);
  });

  it('loginUser should dispatch rejected action on error', async () => {
    const loginData = { username: 'johndoe', password: 'wrongpassword' };
    const mockError = 'Invalid credentials';

    ApiManager.login.mockRejectedValueOnce(new Error(mockError));

    await loginUser(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: loginUser.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: loginUser.rejected.type,
      payload: mockError,
    }));
  });

  it('registerUser should dispatch correct actions on success', async () => {
    const registerData = { username: 'johndoe', password: 'password', email: 'john@example.com' };
    const mockRegisterResponse = { id: 1, name: 'John Doe', email: 'john@example.com' };

    ApiManager.register.mockResolvedValueOnce(mockRegisterResponse);

    await registerUser(registerData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: registerUser.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: registerUser.fulfilled.type,
      payload: mockRegisterResponse,
    }));
  });

  it('registerUser should dispatch rejected action on error', async () => {
    const registerData = { username: 'johndoe', password: 'password', email: 'john@example.com' };
    const mockError = 'Registration failed';

    ApiManager.register.mockRejectedValueOnce(new Error(mockError));

    await registerUser(registerData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: registerUser.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: registerUser.rejected.type,
      payload: mockError,
    }));
  });
});
