class TemplateFactory {
  constructor() {
    this.toXmlTemplate = (username, ssid, data) => {
      let str =
        '<服務時數記錄>\
      <姓名>{0}</姓名>\
      <身分證字號>{1}</身分證字號>\
      <服務日期起>{2}</服務日期起>\
      <服務日期訖>{3}</服務日期訖>\
      <服務項目>0340</服務項目>\
      <服務內容>0017</服務內容>\
      <服務時數-小時>{4}</服務時數-小時>\
      <服務時數-分鐘>0</服務時數-分鐘>\
      <受服務人次>100</受服務人次>\
      <交通費>0</交通費>\
      <誤餐費>0</誤餐費>\
      <服務區域>B</服務區域>\
      <備註></備註>\
      <匯入動作>A</匯入動作>\
      <序號></序號>\
      <國外參與服務人次>0</國外參與服務人次>\
      <國內參與服務人次>0</國內參與服務人次>\
      </服務時數記錄>';
      return str.replace('{0}', username)
        .replace('{1}', ssid)
        .replace('{2}', data.start)
        .replace('{3}', data.end)
        .replace('{4}', data.hour);
    }


    this.createFormTemplate = (record, seqNum) => {
      let str =
        '<div class="rowDiv">\
          <div name="seqNum">{0}</div>\
          <div name="username">{1}</div>\
          <div name="ssid">{2}</div>\
          <div><input name="startDate" placeholder="範例: 109/01/01" /></div>\
          <div><input name="endDate" placeholder="範例: 109/12/31" /></div>\
          <div><input name="hour" /></div>\
        </div>';

      return str.replace('{0}', seqNum)
        .replace('{1}', record.username)
        .replace('{2}', record.ssid);
    }
  }
}