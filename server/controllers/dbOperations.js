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
// client login
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

// register
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
    console.log("get max price called");
    let max_price = 0;
    let sql_1 = `SELECT mrp FROM Max_retail_price m
            JOIN Products as p
            ON  m.product_id = p.product_id
            WHERE p.name = '${product}'`;

    db.query(sql_1, (error, results) => {
      if (error) return alert(error.message);
      max_price = results[0].mrp;
      resolve(max_price);
      reject(new Error("from getMaxPrice"));
    });
  });
}
// addComplaints
function addComplaints(details) {
  return new Promise(async (resolve, reject) => {
    let { subject, description, product, seller_r_p, seller_id, client_id } =
      details;

    let max_price = await getMaxPrice(product);
    console.log(max_price);
    let sql = `INSERT INTO complaint(subject, description, product, max_price, sellers_retail_price, seller_id, consumer_id, is_deleted, complaint_date)
              VALUES ('${subject}','${description}', '${product}', '${max_price}', '${seller_r_p}', '${seller_id}', ${client_id}, 0, NOW())`;
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
      reject(new Error("from view Complaints"));
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

//-------------------------------------------------Admin-------------------------------------------------
// admin login
function getAdmin(admin) {
  return new Promise((resolve, reject) => {
    console.log("getAdmin called");
    let sql = `SELECT * FROM Admin
                        WHERE admin_name = '${admin}'
                        LIMIT 1`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get admin"));
    });
  });
}

// getAllComplaints
function getAllComplaints() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT subject, con.uFname, con.uLname, s.sFname, s.sLname, complaint_date, complaint_id, product FROM complaint as com
                JOIN seller as s
                ON com.seller_id = s.seller_id
                JOIN consumers as con
                ON com.consumer_id = con.consumer_id
                ORDER BY complaint_id DESC`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from getAllComplaints"));
    });
  });
}

// get a clients complaints
function getClientComplaints(seller_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT subject, con.uFname, con.uLname, s.sFname, s.sLname, complaint_date, complaint_id, s.seller_id FROM complaint as com
                            JOIN seller as s
                            ON com.seller_id = s.seller_id
                            JOIN consumers as con
                            ON com.consumer_id = con.consumer_id
                            WHERE com.seller_id = '${seller_id}'
                            ORDER BY complaint_id DESC`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from getAllComplaints"));
    });
  });
}

// view a complaint
function AdViewComplaint(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `SELECT * FROM complaint as com
                JOIN seller as s
                ON com.seller_id = s.seller_id
                JOIN consumers as con
                ON com.consumer_id = con.consumer_id
                JOIN market as m
                ON s.market_id = m.market_id    
                WHERE complaint_id = ${complaint_id}`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from admin view Complaints"));
    });
  });
}

// delete a complaint
function AdDeleteComplaint(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `DELETE FROM complaint 
                WHERE complaint_id = ${complaint_id} LIMIT 1`;
    db.query(sql, (error, result) => {
      if (error) console.log(error.message);
      resolve(result);
      reject(new Error("from admin deleteComplaints"));
    });
  });
}

// get Sellers
function getSellers(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `SELECT  COUNT(*) TotalCount, complaint_id, s.sFname, s.sLname, s.seller_id
            FROM complaint c
            JOIN seller s
            ON c.seller_id = s.seller_id 
            GROUP BY s.seller_id
            ORDER BY TotalCount DESC`;
    db.query(sql, (error, result) => {
      if (error) console.log(error.message);
      resolve(result);
      reject(new Error("from admin getSellers"));
    });
  });
}

// get a seller
function getSeller(seller_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM seller as s
                JOIN complaint as com
                ON com.seller_id = s.seller_id
                JOIN market as m
                ON s.market_id = m.market_id    
                WHERE s.seller_id = '${seller_id}' LIMIT 1`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get seller"));
    });
  });
}

// get a seller's complaints
function getSellerComplaints(seller_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT subject, con.uFname, con.uLname, s.sFname, s.sLname, complaint_date, complaint_id, s.seller_id FROM complaint as com
                            JOIN seller as s
                            ON com.seller_id = s.seller_id
                            JOIN consumers as con
                            ON com.consumer_id = con.consumer_id
                            WHERE com.seller_id = '${seller_id}'
                            ORDER BY complaint_id DESC`;
    db.query(sql, (error, results) => {
      if (error) console.log(error.message);
      resolve(results);
      reject(new Error("from get seller"));
    });
  });
}

// get top areas that have complaints
function getTopAreas() {
  return new Promise((resolve, reject) => {
    sql = `SELECT complaint_date, location
            FROM complaint c
            JOIN seller s
            ON c.seller_id = s.seller_id
            JOIN market m
            ON s.market_id = m.market_id`;

    db.query(sql, (error, result) => {
      if (error) console.log(error.message);
      resolve(result);
      reject(new Error("from getTopAreas"));
    });
  });
}

//-------------------------------------------------Seller-------------------------------------------------
// get Sellers info
function getSellersInfo(complaint_id) {
  return new Promise((resolve, reject) => {
    sql = `SELECT sFname, sLname, s_address, seller_id
            FROM seller
            ORDER BY seller_id DESC`;
    db.query(sql, (error, result) => {
      if (error) console.log(error.message);
      resolve(result);
      reject(new Error("from complant getSellersInfo"));
    });
  });
}

module.exports = {
  //methods of products
  getAll: getAll,
  filterByType: filterByType,
  //methods of complaint
  addComplaints: addComplaints,
  getMyComplaints: getMyComplaints,
  viewComplaint: viewComplaint,
  deleteComplaint: deleteComplaint,
  //seller_info_for_complaint
  getSellersInfo: getSellersInfo,
  //auth
  getClient: getClient,
  regClient: regClient,
  //admin
  getAdmin: getAdmin,
  getAllComplaints: getAllComplaints,
  AdViewComplaint: AdViewComplaint,
  AdDeleteComplaint: AdDeleteComplaint,
  getClientComplaints: getClientComplaints,
  getSellers: getSellers,
  getSeller: getSeller,
  getSellerComplaints: getSellerComplaints,
  getTopAreas: getTopAreas,
};
