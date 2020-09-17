
 /*   const workbook = XLSX.read('./file_example_XLS_10.xls');
    const users_title_names = workbook.SheetNames;
    console.log(users_title_names[0]);
    console.log(XLSX.utils.sheet_to_txt(workbook.Sheets[users_title_names[0].row]));*/








// const dataRows = workSheetsFromFile.flatMap(page => page.data).filter(item => item.length);
   // const validRows = dataRows.filter(row => row.some(text => isUrl(text)));

   // console.log(validRows);


  /* var workbook = new Excel.Workbook(); 
 workbook.xlsx.read('./file_example_XLS_10.xls')
       .then(function() {
        let worksheet = workbook.getWorksheet("sheet1");

        worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
     
         console.log("row " + row.values);
     
        });
           });
  
             let workbook = new Excel.Workbook();
           let stream = new Stream.Readable();
           stream.push('./file_example_XLS_10.xls'); // file is ArrayBuffer variable
           stream.push(null);
           workbook.xlsx.read(stream).then((workbook)=> {
            let worksheet = workbook.getWorksheet("sheet1");

            worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
         
             console.log("row " + row.values);
           });
        });

  
 
/*fs.createReadStream('./todos/users.xlsx')
  .pipe(excel())  // same as excel({sheetIndex: 0})
  .on('data', console.log)*/
