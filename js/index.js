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
    const htmlStr = factory.createRecordHtmlTemplate(record, seqNum);
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
  const core = new Core();
  const result = [];

  records.forEach(record => {
    result.push(core.divideRecordByMonth(record));
  })
  console.log(result);
}

function editBatch(editor, key) {
  document.querySelector('#form').querySelectorAll('input[name="' + key + '"]').forEach(input => {
    input.value = editor.value;
  });
}

function download() {
  var file = new File(["Hello, world!"], "hello world.txt", {
    type: "text/plain;charset=utf-8"
  });
  saveAs(file);
}