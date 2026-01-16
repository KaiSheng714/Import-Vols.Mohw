window.onload = (e) => {
  document.querySelector('#upload').addEventListener('change', (e) => {
    new ExcelUtil().parseExcel(e.target.files[0])
      .then(appendForm);
  }, false);
}

window.addEventListener('beforeunload', function (e) {
    // 自定义的提示信息
    var confirmationMessage = '您确定要离开此页面吗？未保存的数据可能会丢失。';

    // 现代浏览器要求设置returnValue属性
    (e || window.event).returnValue = confirmationMessage;

    // 对于大多数浏览器
    return confirmationMessage;
});

function appendForm(records) {
  records.sort((a, b) => {
    return a.username.localeCompare(b.username)
  }).forEach((record, index) => {
    const seqNum = index + 1;
    const htmlStr = createRecordHtmlTemplate(record, seqNum);
    const div = document.createElement('div');
    div.innerHTML = htmlStr.trim();
    document.querySelector("#form").append(div.firstChild);
  })
}

function convertRowToRecord() {
  const result = [];
  document.querySelectorAll('.rowDiv').forEach(row => {
    const record = {
      username: row.querySelector('[name="username"]').innerText,
      ssid: row.querySelector('[name="ssid"]').innerText,
      startDate: row.querySelector('input[name="startDate"]').value,
      endDate: row.querySelector('input[name="endDate"]').value,
      totalHour: row.querySelector('input[name="totalHour"]').value,
    };
    if (record.totalHour > 0) {
      result.push(record);
    }
  });
  return result;
}

function generate() {
  const records = convertRowToRecord();
  const divider = new Divider();
  const result = [];

  records.forEach((record) => {
    const common = getRecordCommon(record.username, record.ssid);
    divider.divideRecordByMonth(record).forEach((monthData) => {
      result.push(Object.assign(monthData, common));
    });
  });
  new ExcelUtil().jsonToExcel(result);
}

function editBatch(editor, key) {
  document.querySelector('#form').querySelectorAll('input[name="' + key + '"]').forEach(input => {
    input.value = editor.value;
  });
}

function getRecordCommon(username, ssid) {
  return {
    username,
    ssid,
    minute: 0,
    peopleNum: 100,
    action: 'A',
    serviceName: '0340',
    serviceContent: '0017',
    fare: 0,
    mealFee: 0,
    area: 'B',
    oversea: 0,
    domestic: 0,
  }
}

function createRecordHtmlTemplate(record, seqNum) {
  let str =
    '<div class="rowDiv">\
      <div name="seqNum">{0}</div>\
      <div name="username">{1}</div>\
      <div name="ssid">{2}</div>\
      <div><input name="startDate" type="date" value="0115-01-01"/></div>\
      <div><input name="endDate" type="date" value="0115-06-30" /></div>\
      <div><input name="totalHour" type="text" pattern="\d*" maxlength="2" onblur="hideIfFilled(this)"/></div>\
    </div>';

  return str.replace('{0}', seqNum)
    .replace('{1}', record.username)
    .replace('{2}', record.ssid);
}

function hideIfFilled(inputElement) {
  let row = inputElement.parentElement.parentElement;
  let table = row.parentElement;
  if (inputElement.value && !isNaN(inputElement.value)) {
    row.style.opacity = "0.3"
    table.appendChild(row);
  } else {
    row.style.opacity = "1"
  }
}
