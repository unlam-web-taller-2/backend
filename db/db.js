const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const resetDB = true;

// Connect to database
const db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
    console.log(`Connected database: ${err ? err.message : 'Successfully'}`);
})

// Tables
const users_table = 'users';
const products_table = 'products';
const cart_table = 'cart';

// Users queries
const drop_users_table = `DROP TABLE ${users_table}`;
const create_users_table = `CREATE TABLE ${users_table}(id INTEGER PRIMARY KEY, name, lastname, address, email)`;
const insert_user = `INSERT INTO ${users_table} (name, lastname, address, email) VALUES (?, ?, ?, ?)`;
const select_all_users = `SELECT * FROM ${users_table}`;
const select_user_from_email_password = `SELECT * FROM ${users_table} WHERE email = $email`;

// Products queries
const drop_products_table = `DROP TABLE ${products_table}`;
const create_products_table = `CREATE TABLE ${products_table}(id INTEGER PRIMARY KEY, title, price NUM, description, category, image, rate NUM, stock NUM)`;
const select_all_products = `SELECT * FROM ${products_table}`;

// Cart queries
const drop_cart_table = `DROP TABLE ${cart_table}`;
const create_cart_table = `CREATE TABLE ${cart_table}(
    user_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES ${users_table}(id),
    FOREIGN KEY (product_id) REFERENCES ${products_table}(id)
)`;
const select_cart_from_user_id = `SELECT p.id, p.title, p.price, p.description, p.category, p.image, p.rate, p. stock FROM ${cart_table} AS c JOIN ${products_table} AS p ON c.product_id = p.id WHERE user_id = ?`;
const insert_cart = `INSERT INTO ${cart_table} (user_id, product_id) VALUES (?, ?)`;
const delete_cart = `DELETE FROM ${cart_table} WHERE user_id = ? AND product_id = ?`;

// Init data
if (resetDB) {
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
            ['admin', 'admin', 'address 123', 'admin@gmail.com'],
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

        // ---------------------------------------------- CART ----------------------------------------------

        // Drop cart table
        db.run(drop_cart_table, (err) => {
            console.log(`DROP TABLE ${cart_table}: ${err ? err.message : 'Successfully'}`);
        });

        // Create cart table
        db.run(create_cart_table, (err) => {
            console.log(`CREATE TABLE ${cart_table}: ${err ? err.message : 'Successfully'}`);
        });
    });
}

exports.get_all_products = (success, error) => {
    db.all(select_all_products, [], (err, rows) => {
        if (err) {
            error(err);
        } else {
            success(rows);
        }
    });
}

exports.login = (email, success, error) => {
    db.all(select_user_from_email_password, [ email ], (err, rows) => {
        if (err) {
            error(err);
        } else {
            success(rows);
        }
    });
};

exports.register = (email, name, lastname, address, success, error) => {
    db.run(insert_user, [ name, lastname, address, email ], (err) => {
        if (err) {
            error(err);
        } else {
            success({});
        }
    });
};

exports.add_cart = (user_id, product_id, success, error) => {
    db.run(insert_cart, [user_id, product_id], (err) => {
        if (err) {
            error(err);
        } else {
            success({});
        }
    })
};

exports.get_user_cart = (user_id, success, error) => {
    db.all(select_cart_from_user_id, [user_id], (err, rows) => {
        if (err) {
            error(err);
        } else {
            success(rows);
        }
    });
};

exports.delete_product_from_user_cart = (user_id, product_id, success, error) => {
    db.run(delete_cart, [user_id, product_id], (err) => {
        if (err) {
            error(err);
        } else {
            success({})
        }
    });
};