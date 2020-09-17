'use strict';
const uuid = require('uuid');
const dynamodb = require('./dynamodb');
const XLSX = require('xlsx');

module.exports.readExcel = (event, context, callback) => {

    var failedRows = [];
    var wb = XLSX.readFile("C:\\Users\\ramireddy\\Documents\\users.xlsx", {
      type: 'binary',
    });
    var sheetNames = wb.SheetNames;
    console.log(sheetNames);
    var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[wb.SheetNames[0]]);

  //  console.log(XL_row_object);
    XL_row_object.forEach(element => {
      var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var phonenoReg = /^\d{4}$/;
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
   //   console.log(element.data)
    
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
  console.log("failed rows-"+ JSON.stringify(failedRows));
  };

