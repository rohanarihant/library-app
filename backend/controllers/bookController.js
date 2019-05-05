const  booksServices  = require('../services/booksServices');
const filePath = './public/library.json';

module.exports = {
    getAllBooks(req,res){  
            booksServices.jsonReader(filePath, (err, books) => {
              if (err) {
                  res.json({status:200,message:'Some error occured while fetching books'})
                }else{
                  res.json({status:200,message:'successfully fetched all the books', allBooks:books})
              }
            });
    },
    addBook(req,res){
        booksServices.jsonWrite(filePath, req.body, (err,book) => {
            if (err) {
                res.json({status:200,message:'Some error occured while adding the book'})
            } else {
                res.json({status:200,message:'Book has been successfully added'})
            }
        });
    },
    updateBook(req,res){
        booksServices.updateBook(filePath,req.body, (err, tempAllBooks) => {
            if (err) {
                res.json({status:200,message:err})
            }else{
                    res.json({status:200,message:'Book has been successfully updated',allBooks:tempAllBooks})
                }
            })
    },
    getBookDetail(req,res){  
        booksServices.getBook(filePath,req.params.id, (err, book) => {
          if (err) {
              res.json({status:200,message:'Some error occured while fetching books'})
            }else{
              res.json({status:200,message:'successfully fetched all the books', fetchedBook:book})
          }
        });
    }
    
}