describe("countMonth", () => {
  const core = new Core();

  it("should return month count by given date range", () => {
    expect(core.countMonth('109/01/01', '109/12/31')).toEqual(12);
  });

  it("should return month count by given date range and cross year", () => {
    expect(core.countMonth('108/07/01', '109/12/31')).toEqual(18);
  });

  it("should return 1 by given date range at same month", () => {
    expect(core.countMonth('109/01/01', '109/01/31')).toEqual(1);
  });

  it("should return error if given date is invalid", () => {
    expect(() => {
      core.countMonth('109/11/01', '109/13/15');
    }).toThrow(new Error("invalid date"));
  });

  it("should return error if given date range is invalid", () => {
    expect(() => {
      core.countMonth('109/11/01', '108/10/02');
    }).toThrow(new Error("invalid date range"));
  });
});

describe("divideRecordToPerMonth", () => {
  const core = new Core();

  const inputRecord = {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '107/07/01',
    endDate: '107/12/31',
    hour: '46',
  }
  const result = [{
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1070701',
    endDate: '1070731',
    hour: '8',
  }, {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1070801',
    endDate: '1070831',
    hour: '8',
  }, {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1070901',
    endDate: '1070930',
    hour: '8',
  }, {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1071001',
    endDate: '1071031',
    hour: '8',
  }, {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1071101',
    endDate: '1071130',
    hour: '8',
  }, {
    username: 'jason',
    ssid: 'A123456789',
    startDate: '1071201',
    endDate: '1071231',
    hour: '6',
  }];

  it("should return 8 hour/month, but 6 hour last month", () => {
    expect(core.divideRecordToPerMonth(inputRecord)).toEqual(result);
  });

});

describe("divideHour", () => {
  const core = new Core();

  it("6, 10", () => {
    expect(core.divideHour(6, 10)).toEqual([2, 2, 2, 2, 2]);
  });

  it("12, 40", () => {
    expect(core.divideHour(12, 40)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  });

  it("12, 39", () => {
    expect(core.divideHour(12, 39)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 3]);
  });

  it("12, 48", () => {
    expect(core.divideHour(12, 48)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  });

  it("12, 52", () => {
    expect(core.divideHour(12, 52)).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2]);
  });
});

describe("calculateHourPerMonth", () => {
  const core = new Core();

  let result = [{
    startDate: '107/11/01',
    endDate: '107/11/30',
    hour: 4,
  }, {
    startDate: '107/12/01',
    endDate: '107/12/31',
    hour: 4,
  }, {
    startDate: '108/01/01',
    endDate: '108/01/31',
    hour: 4,
  }, {
    startDate: '108/02/01',
    endDate: '108/02/29',
    hour: 2,
  }];

  it("107/11/01, [4, 4, 4, 2]", () => {
    expect(core.calculateHourPerMonth('107/11/01', [4, 4, 4, 2])).toEqual(result);
  });

});