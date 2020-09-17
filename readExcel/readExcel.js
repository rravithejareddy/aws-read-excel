'use strict';
const uuid = require('uuid');
const dynamodb = require('./dynamodb');
const XLSX = require('xlsx');

module.exports.readExcel = (event, context, callback) => {
   var failedRows = [];

    var wb = XLSX.readFile("C:\\Users\\ramireddy\\Documents\\users.xlsx", {
      type: 'binary',
    });

  // console.log(sheetNames);
    var sheetNames = wb.SheetNames;

    var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[wb.SheetNames[0]]);

  //  console.log(XL_row_object);
  XL_row_object.forEach(element => {
      var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var phonenoReg = /^\d{4}$/;

   // console.log(element.data)
      if(emailReg.test(element.email) && phonenoReg.test(element.phoneNo)){
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          userId : element.id,
          name: element.name,
          phoneno: element.phoneNo,
          email: element.email,
          city:element.city
       },
      };

  
    
  // write the todo to the database
     dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the excel item into db.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify("done."),
        };
        callback(null, response);
    });
    }
    else{
      failedRows.push(element);
    }
    });

  if(failedRows.length > 0){
    var data = [];
    failedRows.forEach(tree => {
      data.push({id: tree.id, name: tree.name, phoneNo : tree.phoneNo, email : tree.email, city: tree.city });
    });

      var ws =    XLSX.utils.json_to_sheet(data, {header :['id', 'name', 'phoneNo', 'email', 'city']});
      console.log(ws);
      var wb =  XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'users');
      XLSX.writeFile(wb, "failedUser.xlsx");

       }

  function recurse_bookmarks(data, tree){
    data.push({id: tree.id, name: tree.name, phoneNo : tree.phoneNo, email : tree.email, city: tree.city })
  }

  console.log("failed rows-"+ JSON.stringify(failedRows.length));
};



