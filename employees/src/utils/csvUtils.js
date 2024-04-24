const CSV_HEADER = ['employeeId', 'projectId', 'dateFrom', 'dateTo'];

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('File need to be selected before proceeding!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const inputStr = reader.result;
      const inputArr = inputStr.split('\n');

      const result = inputArr.map((line) => {
        const row = line.split(',');
        const rowData = {};

        for (let i = 0; i < row.length; i++) {
          rowData[CSV_HEADER[i]] = row[i].trim();
        }

        return rowData;
      });

      resolve(result);
    };

    reader.onerror = () => {
      reject('An issue occurred while attempting to read the file!');
    };

    reader.readAsText(file);
  });
};
