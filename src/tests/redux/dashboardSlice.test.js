let fetchUserData, fetchPortfolioData, fetchTradesData, ApiManager;

// Mocking ApiManager module
beforeAll(() => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  jest.mock('../../apimanager/ApiManager', () => ({
    getUserData: jest.fn(), 
    getPortfolioData: jest.fn(), 
    getTradesData: jest.fn(), 
  }));

  ApiManager = require('../../apimanager/ApiManager');
  const dashboardSlice = require('../../redux/dashboardSlice');
  fetchUserData = dashboardSlice.fetchUserData;
  fetchPortfolioData = dashboardSlice.fetchPortfolioData;
  fetchTradesData = dashboardSlice.fetchTradesData;
});

describe('dashboardSlice async thunks', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = jest.fn(); 
    getState = jest.fn(); 
    jest.clearAllMocks(); 
  });

  it('fetchUserData should dispatch correct actions on success', async () => {
    const mockData = { id: 1, name: 'John Doe' }; 
    ApiManager.getUserData.mockResolvedValueOnce(mockData); 

    await fetchUserData()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUserData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserData.fulfilled.type,
      payload: mockData,
    }));
  });

  it('fetchPortfolioData should dispatch correct actions on success', async () => {
    const mockData = { assets: [], trades: [] }; 
    ApiManager.getPortfolioData.mockResolvedValueOnce(mockData); 

    await fetchPortfolioData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchPortfolioData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchPortfolioData.fulfilled.type,
      payload: mockData,
    }));
  });

  it('fetchTradesData should dispatch correct actions on success', async () => {
    const mockData = [{ id: 1, trade: 'trade1' }]; 
    ApiManager.getTradesData.mockResolvedValueOnce(mockData);

    await fetchTradesData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchTradesData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchTradesData.fulfilled.type,
      payload: mockData,
    }));
  });

  it('fetchUserData should dispatch rejected action on error', async () => {
    const mockError = 'Network Error';
    ApiManager.getUserData.mockRejectedValueOnce(new Error(mockError));

    await fetchUserData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUserData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserData.rejected.type,
      error: expect.objectContaining({
        message: mockError,
      }),
    }));
  });
});
