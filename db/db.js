const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Connect to database
const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
    console.log(`Connected database: ${err ? err.message : 'Successfully'}`);
})

// Tables
const users_table = 'users';
const products_table = 'products';

// Users queries
const drop_users_table = `DROP TABLE ${users_table}`;
const create_users_table = `CREATE TABLE ${users_table}(id INTEGER PRIMARY KEY, name, lastname, address, email, password)`;
const insert_user = `INSERT INTO ${users_table} (name, lastname, address, email, password) VALUES (?, ?, ?, ?, ?)`;
const select_all_users = `SELECT * FROM ${users_table}`;
const select_user_from_email_password = `SELECT * FROM ${users_table} WHERE email = $email AND password = $password`;

// Products queries
const drop_products_table = `DROP TABLE ${products_table}`;
const create_products_table = `CREATE TABLE ${products_table}(id INTEGER PRIMARY KEY,title,price NUM,description,category,image,rate NUM)`;
const select_all_products = `SELECT *FROM ${products_table}`;


// Init data
db.serialize(() => {
    // ---------------------------------------------- USERS ----------------------------------------------

    // Drop users table
    db.run(drop_users_table, (err) => {
        console.log(`DROP ${users_table} TABLE: ${err ? err.message : 'Successfully'}`);
    });

    // Create users table
    db.run(create_users_table, (err) => {
        console.log(`CREATE ${users_table} TABLE: ${err ? err.message : 'Successfully'}`);
    });

    // Insert users
    db.run(
        insert_user,
        ['admin', 'admin', 'address 123', 'admin@gmail.com', '123456'],
        (err) => {
            console.log(`INSERT INTO ${users_table}: ${err ? err.message : 'Successfully'}`);
        }
    )

    // Select users
    db.all(select_all_users, [], (err, rows) => {
        if (err) {
            console.error(`${select_all_users} Error: ${err.message}`);
        }

        console.log(`**************** USERS ****************`);
        rows.forEach((user) => {
            console.log(user);
        });
        console.log(`**************** USERS ****************`);
    });

    // ---------------------------------------------- PRODUCTS ----------------------------------------------

    // Drop products table
    db.run(drop_products_table, (err) => {
        console.log(`DROP TABLE ${products_table}: ${err ? err.message : 'successfully'}`)
    })

    // Create products table
    db.run(create_products_table, (err) => {
        console.log(`CREATE TABLE ${products_table}: ${err ? err.message : 'Successfully'}`)
    })

    // Insert products
    const insert_products = `INSERT INTO ${products_table}(id, title, price, description, category, image, rate)
        VALUES(?, ?, ?, ?, ?, ?, ?)`;

    const products_json = fs.readFileSync('./db/products.json', 'utf-8');
    const products_data = JSON.parse(products_json);

    products_data.forEach(data => {
        const { id, title, price, description, category, image, rate } = data;

        db.run(
                insert_products,
                [id, title, price, description, category, image, rate],
                (err) => {
                    console.log(`INSERT INTO ${products_table}: ${err ? err.message : 'Successfully'}`);
                }
        )
    })

    // Select products
    db.all(select_all_products, [], (err, rows) => {
        if (err) {
            console.error(`${select_all_users} Error: ${err.message}`);
        }

        console.log(`**************** PRODUCTS ****************`);
        rows.forEach((products) => {
            console.log(products);
        });
        console.log(`**************** PRODUCTS ****************`);
    });
});

exports.get_all_products = (success, error) => {
    db.all(select_all_products, [], (err, rows) => {
        if (err) {
            error(err);
        } else {
            success(rows);
        }
    });
}

exports.sign_in = (email, password, success, error) => {
    db.all(select_user_from_email_password, [ email, password ], (err, rows) => {
        if (err) {
            error(err);
        } else {
            if (rows.length === 0) {
                error({ message: 'Wrong credentials' });
            } else {
                console.log(rows)
                success(rows[0]);
            }
        }
    });
};

exports.sign_up = (email, password, name, lastname, address, success, error) => {
    db.run(insert_user, [ name, lastname, address, email, password ], (err) => {
        if (err) {
            error(err);
        } else {
            success({ message: 'User registered successfully' });
        }
    });
};