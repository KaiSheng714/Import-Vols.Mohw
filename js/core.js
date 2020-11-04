class Core {
  constructor() {
    this.divideRecordToPerMonth = (record) => {
      const monthCount = this.countMonth(record.startDate, record.endDate);
      const hours = this.divideHour(monthCount, record.hour);
      const dateAndHour = this.calculateHourPerMonth(record.startDate, hours);
      const result = [];

      dateAndHour.forEach(data => {
        result.push({
          username: record.username,
          ssid: record.ssid,
          startDate: data.startDate.replaceAll('/', ''),
          endDate: data.endDate.replaceAll('/', ''),
          hour: data.hour + '',
        });
      });
      return result;
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

    this.divideHour = (monthCount, totalHour) => {
      const result = [];
      const hourPerMonth = Math.ceil(totalHour / monthCount);
      for (let i = 0; i < monthCount; ++i) {
        let hour = hourPerMonth;
        if (totalHour < hourPerMonth) {
          hour = totalHour;
        }
        if (totalHour <= 0) {
          break;
        }
        result.push(hour);
        totalHour -= hourPerMonth;
      }
      return result;
    }

    this.calculateHourPerMonth = (startDateStr, hours) => {
      const result = [];

      hours.forEach((hour, index) => {
        const date = new Date(startDateStr);
        const startDate = new Date(date.getFullYear(), date.getMonth() + index, 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        const monthAndHour = {
          startDate: this.formatDate(startDate),
          endDate: this.formatDate(endDate),
          hour,
        };
        result.push(monthAndHour);
      });
      return result;
    }

    this.formatDate = (date) => {
      const monthStr = ('0' + (date.getMonth() + 1)).slice(-2);
      const dateStr = ('0' + date.getDate()).slice(-2);
      return date.getFullYear() + '/' + monthStr + '/' + dateStr;
    }
  }
}