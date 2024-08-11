let fetchUserBalance, depositFunds, withdrawFunds, ApiManager;

beforeAll(() => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  jest.mock('../../apimanager/ApiManager', () => ({
    getUserData: jest.fn(),
    depositFunds: jest.fn(),
    withdrawFunds: jest.fn(),
  }));

  ApiManager = require('../../apimanager/ApiManager');
  const depositWithdrawSlice = require('../../redux/depositWithdrawSlice');
  fetchUserBalance = depositWithdrawSlice.fetchUserBalance;
  depositFunds = depositWithdrawSlice.depositFunds;
  withdrawFunds = depositWithdrawSlice.withdrawFunds;
});

describe('depositWithdrawSlice async thunks', () => {
  let dispatch;
  let getState;
  let consoleErrorMock;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
    jest.clearAllMocks();

    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it('fetchUserBalance should dispatch correct actions on success', async () => {
    const mockBalance = 5000;
    ApiManager.getUserData.mockResolvedValueOnce({ balance: mockBalance });

    await fetchUserBalance()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchUserBalance.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserBalance.fulfilled.type,
      payload: mockBalance,
    }));
  });

  it('depositFunds should dispatch correct actions on success', async () => {
    const depositAmount = 1000;
    const updatedBalance = 6000;

    ApiManager.depositFunds.mockResolvedValueOnce();
    ApiManager.getUserData.mockResolvedValueOnce({ balance: updatedBalance });

    await depositFunds(depositAmount)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: depositFunds.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: depositFunds.fulfilled.type,
      payload: depositAmount,
    }));

    await fetchUserBalance()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserBalance.fulfilled.type,
      payload: updatedBalance,
    }));
  });

  it('withdrawFunds should dispatch correct actions on success', async () => {
    const withdrawAmount = 1000;
    const updatedBalance = 4000;

    ApiManager.withdrawFunds.mockResolvedValueOnce();
    ApiManager.getUserData.mockResolvedValueOnce({ balance: updatedBalance });

    await withdrawFunds(withdrawAmount)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: withdrawFunds.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: withdrawFunds.fulfilled.type,
      payload: withdrawAmount,
    }));

    await fetchUserBalance()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: fetchUserBalance.fulfilled.type,
      payload: updatedBalance,
    }));
  });

  it('depositFunds should dispatch rejected action on error', async () => {
    const depositAmount = 1000;
    const mockError = 'Network Error';
    ApiManager.depositFunds.mockRejectedValueOnce(new Error(mockError));

    await depositFunds(depositAmount)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: depositFunds.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: depositFunds.rejected.type,
      payload: mockError,
    }));
  });

  it('withdrawFunds should dispatch rejected action on error', async () => {
    const withdrawAmount = 1000;
    const mockError = 'Network Error';
    ApiManager.withdrawFunds.mockRejectedValueOnce(new Error(mockError));

    await withdrawFunds(withdrawAmount)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: withdrawFunds.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: withdrawFunds.rejected.type,
      payload: mockError,
    }));
  });
});
