require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();
const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     database: process.env.DB_NAME
});

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Displaying all blogs
app.get("/api/blogs",(req,res)=>{
    pool.query("SELECT id,title,blog,authorname FROM blog",(error,rows)=>{
        if (error) {
            return res.status(500).json({error});
        }
        res.json(rows);
    });
});

//Get specific blog
app.get("/api/blogs/:id",(req,res)=>{
    pool.query(
        "SELECT id,title,blog,authorname FROM blog WHERE id = ?",
        [req.params.id],
        (error,rows)=>{
            if (error) {
                return res.status(500).json({error});
            }
            res.json(rows);
        }
    );
});

//Adding new blog post
app.post("/api/blogs-create",(req,res)=>{
    const {title,blog,authorname} = req.body;

    if (!title || !blog || !authorname) {
        return res.status(400).json({error:"invalid data addition"});
    }

    pool.query(
        "INSERT INTO blog (title,blog,authorname) VALUES (?,?,?)",
        [title,blog,authorname],
        (error,results)=>{
            if (error) {
                return res.status(500).json({error});
            }
            res.json(results.insertId);
        }
        );
});

//Update blog post
app.put("/api/blogs/:id",(req,res)=>{
    const {title,blog,authorname} = req.body;

    if (!title || !blog || !authorname) {
        return res.status(400).json({ error: "Invalid data" });
    }

    pool.query(
        "UPDATE blog SET title = ?,blog = ?,authorname = ? WHERE id = ?",
        [title,blog,authorname,req.params.id],
        (error, results) => {
            if (error) {
                 return res.status(500).json({ error });
             }

             res.json(results.changedRows);
        }
    );
});

//Delete post
app.delete("/api/blogs/:id",(req,res)=>{
    pool.query(
        "DELETE FROM blog WHERE id = ?",
        [req.params.id],
        (error,results)=>{
            if (error) {
                return res.status(500).json({error});
            }
          res.json(results.affectedRows);
        }
    )
})




app.listen(9000, () => console.log("App listening on port 9000.."));