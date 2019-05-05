const fs = require('fs')

module.exports  = {
     jsonReader: (filePath, cb) => {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData)
                return cb && cb(null, object)
            } catch(err) {
                return cb && cb(err)
            }
        })
      },
     getBook: (filePath,id, cb) => {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
            try {
                const allBooks = JSON.parse(fileData);
                let filteredBook = allBooks.filter(book => book.id == id);
                return cb && cb(null, filteredBook[0])
            } catch(err) {
                return cb && cb(err)
            }
        })
      },
     updateBook: (filePath,data, cb) => {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
                const allBooks = JSON.parse(fileData);
                let tempAllBooks = allBooks.map(book => {
                    if(book.id == data.id){
                        book = data;
                    }
                    return book;
                    });
                    fs.writeFile(filePath, JSON.stringify(tempAllBooks), err => {
                        if (err) {
                            return cb && cb(err)
                        }
                        try {
                            return cb && cb(null, tempAllBooks)
                        } catch(err) {
                            return cb && cb(err)
                        }
                    });
        })
      },
      jsonWrite: (filePath,book, cb) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return cb && cb(err)
            }
            var json = JSON.parse(data);
            json.push(book)
        
            fs.writeFile(filePath, JSON.stringify(json), err => {
                if (err) {
                    return cb && cb(err)
                }
                try {
                    return cb && cb(null, book)
                } catch(err) {
                    return cb && cb(err)
                }
            });
        })
        
      }

}