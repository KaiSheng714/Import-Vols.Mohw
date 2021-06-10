class Divider {
  constructor() {

    this.divideRecordByMonth = (record) => {
      const monthCount = this.countMonth(record.startDate, record.endDate);
      const hourArray = this.divideHour(record.totalHour, monthCount);
      return this.assignHourToMonth(hourArray, record.startDate);
    };

    this.countMonth = (startDate, endDate) => {
      startDate = new Date(startDate);
      endDate = new Date(endDate);

      if (startDate == 'Invalid Date' || endDate == 'Invalid Date') {
        throw new Error('invalid date');
      }
      if (endDate - startDate < 0) {
        throw new Error('invalid date range');
      }

      return endDate.getMonth() - startDate.getMonth() +
        (12 * (endDate.getFullYear() - startDate.getFullYear())) + 1;
    }

    this.divideHour = (totalHour, monthCount) => {
      const hours = [];
      const hourPerMonth = Math.ceil(totalHour / monthCount);

      for (let remain = totalHour; remain > 0; remain -= hourPerMonth) {
        if (remain < hourPerMonth) {
          hours.push(remain);
        } else {
          hours.push(hourPerMonth);
        }
      }
      return hours;
    }

    this.assignHourToMonth = (hourArray, startDateStr) => {
      const monthDataArray = [];

      hourArray.forEach((hour, index) => {
        const startAndEnd = this.getStartAndEndOfMonth(startDateStr, index)
        monthDataArray.push({
          startDate: startAndEnd.start,
          endDate: startAndEnd.end,
          hour,
        });
      });
      return monthDataArray;
    }

    this.getStartAndEndOfMonth = (startDateStr, index) => {
      const date = new Date(startDateStr);
      const start = new Date(date.getFullYear() + 1911, date.getMonth() + index, 1);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

      return {
        start: this.formatDate(start),
        end: this.formatDate(end),
      }
    }

    this.formatDate = (date) => {
      const monthStr = ('0' + (date.getMonth() + 1)).slice(-2);
      const dateStr = ('0' + date.getDate()).slice(-2);
      return date.getFullYear() - 1911 + monthStr + dateStr;
    }
  }
}