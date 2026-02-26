let express = require("express")
let app = express()
let port = 3000
let books = require("./book")

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to the library where you can manage the books you have in the library 📗📚<h1/>")
})
app.get("/library",(req,res)=>{
    res.json(books)
})

app.get("/library/:id",(req,res)=>{
    let id = Number(req.params.id)
    let book = books.find(b => b.id === id)
    if(!book){
        res.send("There is no book called this in the library")
    }else{
        res.send(book)
    }
})

app.post("/library",(req,res)=>{
    const {title,author,year} = req.body 

    const newBook = {
        id : books.length + 1,
        title : title,
        author : author,
        year : year
    }
    books.push(newBook)
    res.send(newBook)
})

app.put("/library/:id",(req,res)=>{
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)
    if(!book){
        res.send("Book not Found");
    }else{
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.year = req.body.year || book.year; 
        res.send(books)
    }
})


app.delete("/library/:id",(req,res)=>{
    let id = Number(req.params.id)
    const index = books.findIndex(b=> b.id === id)
    if(index === -1){
        res.send("This book doesn't exist")
    }else{
        books.splice(index,1)
        res.send(books)
    }
})
app.listen(port,()=>{
    console.log(`Server running on port${port}!`)
})