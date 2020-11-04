window.onload = (e) => {
  document.querySelector('#upload').addEventListener('change', (e) => {
    new ExcelToJson().parseExcel(e.target.files[0])
      .then(appendForm);
  }, false);
}

function appendForm(records) {
  const factory = new TemplateFactory();

  records.forEach((record, index) => {
    const seqNum = index + 1;
    const htmlStr = factory.createFormTemplate(record, seqNum);
    const div = document.createElement('div');
    div.innerHTML = htmlStr.trim();
    append(div.firstChild);
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
      hour: row.querySelector('input[name="hour"]').value,
    };
    if (record.hour > 0) {
      result.push(record);
    }
  });
  return result;
}

function append(str) {
  document.querySelector("#form").append(str);
}

function generate() {
  const records = convertRowToRecord();
  const core = new Core();
  const result = [];

  records.forEach(record => {
    result.push(core.divideRecordToPerMonth(record));
  })
  console.log(result);
}

function clear() {
  document.querySelector("#result").innerHTML = '';
}