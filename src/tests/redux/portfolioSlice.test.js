let fetchPortfolioData, ApiManager;

beforeAll(() => {
  // Mocking global localStorage
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Mocking ApiManager using jest.mock
  jest.mock('../../apimanager/ApiManager', () => ({
    getPortfolioData: jest.fn(),
    getTradesData: jest.fn(),
  }));

  // Requiring the necessary modules after mocking
  ApiManager = require('../../apimanager/ApiManager');
  const portfolioSlice = require('../../redux/portfolioSlice');
  fetchPortfolioData = portfolioSlice.fetchPortfolioData;
});

let dispatch;
let getState;

beforeEach(() => {
  dispatch = jest.fn();
  getState = jest.fn(() => ({
    portfolio: {
      assets: [],
      trades: [],
      portfolioValue: 0,
    },
  }));
  jest.clearAllMocks();
});

describe('portfolioSlice async thunks', () => {
  it('fetchPortfolioData should dispatch correct actions on success', async () => {
    const mockPortfolioData = { assets: [{ asset: 'BTC', quantity: 2, averagePurchasePrice: 10000 }] };
    const mockTradesData = [{ asset: 'BTC', quantity: 1, price: 15000, type: 'sell' }];

    ApiManager.getPortfolioData.mockResolvedValueOnce(mockPortfolioData);
    ApiManager.getTradesData.mockResolvedValueOnce(mockTradesData);

    await fetchPortfolioData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchPortfolioData.pending.type }));
    
    const expectedPortfolioValue = (2 * 10000) - (1 * 15000); 
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchPortfolioData.fulfilled.type,
      payload: {
        assets: mockPortfolioData.assets,
        trades: mockTradesData,
        portfolioValue: expectedPortfolioValue,
      },
    }));
  });

  it('fetchPortfolioData should dispatch rejected action on error', async () => {
    const mockError = 'Network Error';
    ApiManager.getPortfolioData.mockRejectedValueOnce(new Error(mockError));

    await fetchPortfolioData()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchPortfolioData.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchPortfolioData.rejected.type,
      payload: mockError,
    }));
  });
});
