describe('countMonth', () => {
  const divider = new Divider();

  it('should return month count by given date range', () => {
    expect(divider.countMonth('109/01/01', '109/12/31')).toEqual(12);
  });

  it('should return month count by given date range and cross year', () => {
    expect(divider.countMonth('108/07/01', '109/12/31')).toEqual(18);
  });

  it('should return 1 by given date range at same month', () => {
    expect(divider.countMonth('109/01/01', '109/01/31')).toEqual(1);
  });

  it('should return error if given date is invalid', () => {
    expect(() => {
      divider.countMonth('109/11/01', '109/13/15');
    }).toThrow(new Error('invalid date'));
  });

  it('should return error if given date range is invalid', () => {
    expect(() => {
      divider.countMonth('109/11/01', '108/10/02');
    }).toThrow(new Error('invalid date range'));
  });
});

describe('divideRecordByMonth', () => {
  const divider = new Divider();

  const inputRecord = {
    startDate: '107/07/01',
    endDate: '107/12/31',
    totalHour: '46',
  }
  const result = [{
    startDate: '1070701',
    endDate: '1070731',
    hour: 8,
  }, {
    startDate: '1070801',
    endDate: '1070831',
    hour: 8,
  }, {
    startDate: '1070901',
    endDate: '1070930',
    hour: 8,
  }, {
    startDate: '1071001',
    endDate: '1071031',
    hour: 8,
  }, {
    startDate: '1071101',
    endDate: '1071130',
    hour: 8,
  }, {
    startDate: '1071201',
    endDate: '1071231',
    hour: 6,
  }];

  it('should return 8 hour/month, but 6 hour last month', () => {
    expect(divider.divideRecordByMonth(inputRecord)).toEqual(result);
  });

});

describe('divideHour', () => {
  const divider = new Divider();

  it('should return 4 hour/month, with 12 month', () => {
    expect(divider.divideHour(48, 12)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  });

  it('should return 2 hour/month, with 5 month', () => {
    expect(divider.divideHour(10, 6)).toEqual([2, 2, 2, 2, 2]);
  });

  it('should return 4 hour/month, with 11 month', () => {
    expect(divider.divideHour(40, 12)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  });

  it('should return 5 hour/month, with 10 month, and 2 hour last month', () => {
    expect(divider.divideHour(52, 12)).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2]);
  });
});

describe('assignHourToMonth', () => {
  const divider = new Divider();

  let result = [{
    startDate: '1071101',
    endDate: '1071130',
    hour: 4,
  }, {
    startDate: '1071201',
    endDate: '1071231',
    hour: 4,
  }, {
    startDate: '1080101',
    endDate: '1080131',
    hour: 4,
  }, {
    startDate: '1080201',
    endDate: '1080228',
    hour: 2,
  }];

  it('return 4 month, contain hours: 4, 4, 4, 2 hour respectively', () => {
    expect(divider.assignHourToMonth([4, 4, 4, 2], '107/11/01')).toEqual(result);
  });
});