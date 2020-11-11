class ExcelUtil {
  constructor() {
    this.parseExcel = (file) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onerror = reject;
        reader.onload = (e) => {
          const loadedFile = e.target.result;
          resolve(this._parse(loadedFile));
        }
      })
    };

    this._parse = (loadedFile) => {
      const result = [];
      const DATA_ROW_START_INDEX = 3;
      const workbook = XLSX.read(loadedFile, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]).forEach((data, index) => {
          if (index >= DATA_ROW_START_INDEX) {
            let username = data.__EMPTY_1;
            let ssid = data.__EMPTY_3;
            if (username && ssid) {
              result.push({
                username,
                ssid
              });
            }
          }
        });
      });
      return result;
    }

    this.jsonToExcel = (json) => {
      const sheetHeader = new TemplateFactory().getExcelHeader();
      json.unshift(sheetHeader);

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(json, {
        header: Object.keys(sheetHeader),
        skipHeader: true
      })
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'sheet.xls', {
        bookType: 'biff8'
      });
    }
  };
}