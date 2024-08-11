let fetchTransactions, ApiManager, transactionReducer, configureStore;

beforeAll(() => {
  jest.mock('../../apimanager/ApiManager', () => ({
    getTransactionsData: jest.fn(),
  }));

  ApiManager = require('../../apimanager/ApiManager');
  transactionReducer = require('../../redux/transactionSlice').default;
  fetchTransactions = require('../../redux/transactionSlice').fetchTransactions;
  configureStore = require('@reduxjs/toolkit').configureStore;
});

let store;
let consoleLogMock, consoleErrorMock;

beforeEach(() => {
  store = configureStore({
    reducer: {
      transaction: transactionReducer,
    },
  });
  
  consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
  consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

  jest.clearAllMocks();
});

afterEach(() => {
  consoleLogMock.mockRestore();
  consoleErrorMock.mockRestore();
});

describe('transactionSlice async thunks', () => {
  it('should dispatch correct actions on successful fetch', async () => {
    const mockTransactions = [{ id: 1, amount: 100, type: 'credit' }];
    ApiManager.getTransactionsData.mockResolvedValueOnce(mockTransactions);

    await store.dispatch(fetchTransactions());

    const state = store.getState().transaction;
    expect(state.isLoading).toBe(false);
    expect(state.transactions).toEqual(mockTransactions);
    expect(state.error).toBeNull();
    expect(state.noDataFound).toBe(false);
  });

  it('should handle invalid data format', async () => {
    const invalidResponse = { status: 'ok', data: [] };
    ApiManager.getTransactionsData.mockResolvedValueOnce(invalidResponse);

    await store.dispatch(fetchTransactions());

    const state = store.getState().transaction;
    expect(state.isLoading).toBe(false);
    expect(state.transactions).toEqual([]);
    expect(state.error).toBe('Invalid data format received');
    expect(state.noDataFound).toBe(false);
  });

  it('should handle no transactions found', async () => {
    ApiManager.getTransactionsData.mockResolvedValueOnce([]);

    await store.dispatch(fetchTransactions());

    const state = store.getState().transaction;
    expect(state.isLoading).toBe(false);
    expect(state.transactions).toEqual([]);
    expect(state.error).toBe('No transactions found.');
    expect(state.noDataFound).toBe(true);
  });

  it('should handle fetch error', async () => {
    const mockError = 'Network Error';
    ApiManager.getTransactionsData.mockRejectedValueOnce(new Error(mockError));

    await store.dispatch(fetchTransactions());

    const state = store.getState().transaction;
    expect(state.isLoading).toBe(false);
    expect(state.transactions).toEqual([]);
    expect(state.error).toBe(mockError);
    expect(state.noDataFound).toBe(false);
  });
});
