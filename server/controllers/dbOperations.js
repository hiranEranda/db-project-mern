const mysql = require("mysql");
var config = require("../config/config");

// Connect to Database
let db = mysql.createConnection(config.databaseOptions);
db.connect((error) => {
  if (error) console.log(error.message);
  else {
    console.log("Connected to the Database...");
  }
});

//-------------------------------------------------auth-------------------------------------------------
// login
function getClient(email) {
  return new Promise((resolve, reject) => {
    console.log("getClient called");
    let sql = `SELECT * FROM Consumers
                        WHERE email = '${email}'
                        LIMIT 1`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get client"));
    });
  });
}

// login
function regClient(client) {
  return new Promise((resolve, reject) => {
    console.log("regClient called");
    const { fname, lname, email, password, nic, address, phone } = client;

    let sql = `INSERT INTO Consumers (nic, uFname, uLname, email, password, address, phone_number)
                        VALUES ('${nic}', '${fname}', '${lname}', '${email}', '${password}','${address}','${phone}')`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get client"));
    });
  });
}

//-------------------------------------------------Products-------------------------------------------------
// get all products
function getAll() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT p.product_id, p.name, m.mrp, m.mrp_date FROM Products As p
                JOIN Max_retail_price As m
                ON p.product_id = m.product_id`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get all"));
    });
  });
}

// filter products by type
function filterByType(type) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT p.product_id, p.name, m.mrp, m.mrp_date FROM Products As p
                JOIN Max_retail_price As m
                ON p.product_id = m.product_id 
                WHERE p_type='${type}' ORDER BY p.product_id ASC `;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      console.log("db called for flter");
      resolve(results);
      reject(new Error("from get all"));
    });
  });
}

//-------------------------------------------------Seller-------------------------------------------------
// get a seller
function getSeller(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM seller WHERE seller_id='${id}'`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get seller"));
    });
  });
}

//-------------------------------------------------Complaints-------------------------------------------------
// getMyComplaints
function getMyComplaints(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT subject, sFname, sLname, complaint_date, complaint_id 
              FROM complaint as c
              JOIN seller as s
              ON c.seller_id = s.seller_id
              WHERE c.consumer_id = ${id} AND c.is_deleted = 0 
              ORDER BY complaint_id DESC`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from getMyComplaints"));
    });
  });
}

// adding a complaint
// getting the max price of user defined product
function getMaxPrice(product) {
  return new Promise((resolve, reject) => {
    let max_price = 0;
    let sql_1 = `SELECT mrp FROM Max_retail_price m
            JOIN Products as p
            ON  m.product_id = p.product_id
            WHERE p.name = '${product}'`;

    db.query(sql_1, (error, results) => {
      if (error) return console.log(error.message);
      max_price = results[0].mrp;
      console.log("get max price called");
      resolve(max_price);
      reject(new Error("from getMaxPrice"));
    });
  });
}
// addComplaints
function addComplaints(details) {
  return new Promise(async (resolve, reject) => {
    let { subject, description, product, seller_r_p, seller, client_id } =
      details;

    let max_price = await getMaxPrice(product);

    let sql = `INSERT INTO complaint(subject, description, product, max_price, sellers_retail_price, seller_id, consumer_id, is_deleted)
              VALUES ('${subject}','${description}', '${product}', '${max_price}', '${seller_r_p}', '${seller}', ${client_id}, 0)`;
    db.query(sql, (error, results) => {
      if (error) {
        console.log(error.message);
        resolve(false);
      }
      resolve(true);
      reject(new Error("from addComplaint"));
    });
  });
}

// view a complaint
function viewComplaint(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `SELECT * FROM complaint 
          WHERE complaint_id = ${complaint_id}`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from getMyComplaints"));
    });
  });
}

// delete a complaint
function deleteComplaint(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `UPDATE complaint 
                SET is_deleted = 1 
                WHERE complaint_id = ${complaint_id} LIMIT 1`;
    db.query(sql, (error, result) => {
      if (error) console.log(error.message);
      resolve(result);
      reject(new Error("from deleteComplaints"));
    });
  });
}

module.exports = {
  //methods of products
  getAll: getAll,
  filterByType: filterByType,
  //methods of sellers
  getSeller: getSeller,
  //methods of complaint
  addComplaints: addComplaints,
  getMyComplaints: getMyComplaints,
  viewComplaint: viewComplaint,
  deleteComplaint: deleteComplaint,
  //auth
  getClient: getClient,
  regClient: regClient,
};
