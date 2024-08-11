
const ApiManager = {
    getTradesData: jest.fn(),
    createTrade: jest.fn(),
  };
  
  const fetchTradeHistory = () => async (dispatch, getState) => {
    dispatch({ type: 'trade/fetchTradeHistory/pending' });
  
    try {
      const response = await ApiManager.getTradesData();
      if (!Array.isArray(response)) {
        throw new Error('Invalid data format received');
      }
      dispatch({
        type: 'trade/fetchTradeHistory/fulfilled',
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: 'trade/fetchTradeHistory/rejected',
        payload: error.message || 'Failed to fetch trade history',
      });
    }
  };
  
  // Defining createTrade thunk
  const createTrade = (tradeData) => async (dispatch, getState) => {
    dispatch({ type: 'trade/createTrade/pending' });
  
    try {
      const response = await ApiManager.createTrade(tradeData);
      if (!response || typeof response !== 'object') {
        throw new Error('Trade creation failed');
      }
  
      dispatch({
        type: 'trade/createTrade/fulfilled',
        payload: response,
      });
  
      await fetchTradeHistory()(dispatch, getState);
    } catch (error) {
      dispatch({
        type: 'trade/createTrade/rejected',
        payload: error.message || 'Failed to create trade',
      });
    }
  };
  
  describe('tradeSlice async thunks', () => {
    let dispatch;
    let getState;
  
    beforeEach(() => {
      dispatch = jest.fn(async (action) => {
        if (typeof action === 'function') {
          return await action(dispatch, getState);
        }
        return action;
      });
  
      getState = jest.fn(() => ({
        trade: {
          trades: [],
          isLoading: false,
          error: null,
        },
      }));
  
      jest.clearAllMocks();
    });
  
    it('fetchTradeHistory should dispatch correct actions on success', async () => {
      const mockTrades = [{ id: 1, symbol: 'BTC', quantity: 2 }];
      ApiManager.getTradesData.mockResolvedValueOnce(mockTrades);
  
      await fetchTradeHistory()(dispatch, getState);
  
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'trade/fetchTradeHistory/pending' })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'trade/fetchTradeHistory/fulfilled',
          payload: mockTrades,
        })
      );
    });
  
    it('fetchTradeHistory should dispatch rejected action on error', async () => {
      const mockError = 'Network Error';
      ApiManager.getTradesData.mockRejectedValueOnce(new Error(mockError));
  
      await fetchTradeHistory()(dispatch, getState);
  
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'trade/fetchTradeHistory/pending' })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'trade/fetchTradeHistory/rejected',
          payload: mockError,
        })
      );
    });
  
    it('createTrade should dispatch correct actions on success', async () => {
      const tradeData = { symbol: 'BTC', quantity: 1 };
      const mockTradeResponse = { id: 2, symbol: 'BTC', quantity: 1 };
      const mockTrades = [{ id: 1, symbol: 'BTC', quantity: 2 }];
  
      ApiManager.createTrade.mockResolvedValueOnce(mockTradeResponse);
      ApiManager.getTradesData.mockResolvedValueOnce(mockTrades);
  
      await createTrade(tradeData)(dispatch, getState);
  
      const actions = dispatch.mock.calls.map((call) => call[0]);
  
      expect(actions[0]).toMatchObject({ type: 'trade/createTrade/pending' });
      expect(actions[1]).toMatchObject({
        type: 'trade/createTrade/fulfilled',
        payload: mockTradeResponse,
      });
      expect(actions[2]).toMatchObject({
        type: 'trade/fetchTradeHistory/pending',
      });
      expect(actions[3]).toMatchObject({
        type: 'trade/fetchTradeHistory/fulfilled',
        payload: mockTrades,
      });
    });
  
    it('createTrade should dispatch rejected action on error', async () => {
      const tradeData = { symbol: 'BTC', quantity: 1 };
      const mockError = 'Trade creation failed';
      ApiManager.createTrade.mockRejectedValueOnce(new Error(mockError));
  
      await createTrade(tradeData)(dispatch, getState);
  
      const actions = dispatch.mock.calls.map((call) => call[0]);
  
      expect(actions[0]).toMatchObject({ type: 'trade/createTrade/pending' });
      expect(actions[1]).toMatchObject({
        type: 'trade/createTrade/rejected',
        payload: mockError,
      });
    });
  });
  