class Core {
  constructor() {

    this.divideRecordByMonth = (record) => {
      const monthCount = this.countMonth(record.startDate, record.endDate);
      const hours = this.divideHour(record.totalHour, monthCount);
      const monthData = this.assignHourToMonth(hours, record.startDate);
      const records = [];

      monthData.forEach(data => {
        records.push(Object.assign({
          username: record.username,
          ssid: record.ssid
        }, data));
      });
      return records;
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

    this.assignHourToMonth = (hours, startDateStr) => {
      const monthDatas = [];

      hours.forEach((hour, index) => {
        const date = new Date(startDateStr);
        const startDate = new Date(date.getFullYear(), date.getMonth() + index, 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        monthDatas.push({
          startDate: this.formatDate(startDate),
          endDate: this.formatDate(endDate),
          hour,
        });
      });
      return monthDatas;
    }

    this.formatDate = (date) => {
      const monthStr = ('0' + (date.getMonth() + 1)).slice(-2);
      const dateStr = ('0' + date.getDate()).slice(-2);
      return date.getFullYear() + monthStr + dateStr;
    }
  }
}