const sleep = (delay) => new Promise((resolve) => {
  setTimeout(() => {
    console.log("Ответ " + delay);
    resolve()
  }, delay);
});

class IndexedDBStore {
  static DB_NAME = "tickets";
  static VERSION = 1;

  delay = 800;

  /**
   * @type {IDBDatabase}
   */
  db;

  constructor(db) {
      this.db = db;
  }

  static open() {
      return new Promise((resolve, reject) => {

          const request = window.indexedDB.open(IndexedDBStore.DB_NAME, IndexedDBStore.VERSION);

          request.addEventListener("error", (e) => {
              console.log(request, e);
              reject(e);
          });
      
          request.addEventListener("success", (e) => {
              const db = request.result;
          
              db.addEventListener("error", e => {
              console.log("IndexedDBStore", "Error", e);
              });
      
              resolve(new IndexedDBStore(db));
          });

          request.addEventListener("upgradeneeded", IndexedDBStore.upgrade);
      });
  }
  


  /**
   * @param {IDBVersionChangeEvent} e 
   */
  static upgrade(e) {
      console.log("IndexedDBStore", `Upgrade from ${e.oldVersion} to ${e.newVersion}`);

      //e.target.transaction.abort();
      
      const db = e.target.result;
      // if (!db.objectStoreNames.contains('tickets')) { // если хранилище не существует
      //   db.createObjectStore('tickets', {autoIncrement: true}); // создаем хранилище
      // }
      switch (e.oldVersion) {
        case 0:
          case 1:
            case 2:
          case 3: {
              const store = db.createObjectStore("tickets", {
                  autoIncrement: true
              });
          }
      }
  }

  clear() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction("tickets", "readwrite");

      transaction.addEventListener("complete", e => {
        console.log("DbContext", "Очистили", e);
        resolve();
      });

      transaction.addEventListener("error", e => {
        reject(e);
      });
  
      const store = transaction.objectStore("tickets");

      store.clear();
    });
  }
  
  seed(ticketsList) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction("tickets", "readwrite");

      transaction.addEventListener("complete", e => {
        
        console.log("IndexedDBStore", "Cохранили", e);
        resolve();
      });

      transaction.addEventListener("error", e => {
        reject(e);
      });
      //console.log(ticketsList);
      const store = transaction.objectStore("tickets");
      store.clear();
      store.count().onsuccess = e => {
        if (e.target.result > 0) {
          return;
        }

        ticketsList.forEach(item => {
          store.put(item);
        });
        
      }

    });
  }
  findFlights(flight) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction("tickets", "readonly");

      let result = [];

      transaction.addEventListener("complete", e => {
        console.log("DbContext", "Нашли", e);
        resolve(result);
      });

      transaction.addEventListener("error", e => {
        reject(e);
      });
  
      const store = transaction.objectStore("tickets");
      //let index = store.index("date");
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          // const value = Flight.from(cursor.value);

          // predicate(value) && (result.push(value));

          // cursor.continue();
          //console.log(flight.from+" "+cursor.value.from.city);

          //console.log((cursor.value['date'].getDate()+"."+(Number(cursor.value['date'].getMonth())+1)+"."+cursor.value['date'].getFullYear()),flight.date);
          let date = flight.date.split('.');
          date.map(d=>Number(d));
          //console.log(onlyDate(cursor.value['date']),(new Date(date[2],date[1]-1,date[0])))
          
          //console.log(onlyDate(cursor.value['date']),cursor.value['from'].city,cursor.value['where'].city)
          //console.log((new Date(date[2],date[1]-1,date[0])),flight.from,flight.where)
          
          if (/*(onlyDate(cursor.value['date'])).getTime() == (new Date(date[2],date[1]-1,date[0])).getTime() 
          &&*/ cursor.value['from'].city == flight.from && cursor.value['where'].city == flight.where){
            //console.log("Есть пробитие")
            result.push(cursor.value);
           
          }
          cursor.continue();
        } 
        
      }
      
      //return result;
    });
    
  }
  //махинации над toDoItem
  insert(toDoItem) {
      return new Promise(async (resolve, reject) => {
          await sleep(this.delay);

          const transaction = this.db.transaction("tickets", "readwrite");
          transaction.addEventListener("complete", e => {
              console.log("IndexedDBStore", "Cохранили", e);
              resolve(toDoItem);
          });
          transaction.addEventListener("error", e => {
              reject(e);
          });
          const store = transaction.objectStore("tickets");
          store.add(toDoItem).onsuccess = e => {
              toDoItem.setId(e.target.result);
              console.log([toDoItem]);
          };
      });
  }
  update(toDoItem) {
      return new Promise(async (resolve, reject) => {
          await sleep(this.delay);

          const transaction = this.db.transaction("tickets", "readwrite");
          transaction.addEventListener("complete", e => {
              console.log("IndexedDBStore", "Cохранили", e);
              resolve(toDoItem);
          });
          transaction.addEventListener("error", e => {
              reject(e);
          });
          const store = transaction.objectStore("tickets");
          store.put(toDoItem, toDoItem.id);
      });
  }
  delete(toDoItem) {
    return new Promise(async (resolve, reject) => {
      await sleep(this.delay);

        const transaction = this.db.transaction("tickets", "readwrite");
        transaction.addEventListener("complete", e => {
            console.log("IndexedDBStore", "Cохранили", e);
            resolve();
        });
        transaction.addEventListener("error", e => {
            reject(e);
        });
        const store = transaction.objectStore("tickets");
        store.delete(toDoItem.id);
    });
  }
  getList() {
    return new Promise(async (resolve, reject) => {
      await sleep(this.delay);

      const result = [];

      const transaction = this.db.transaction("tickets", "readwrite");
      transaction.addEventListener("complete", e => {
          console.log("IndexedDBStore", "Cохранили", e);
          resolve(result);
      });
      transaction.addEventListener("error", e => {
          reject(e);
      });
      const store = transaction.objectStore("tickets");
      store.openCursor().onsuccess = e => {
          var cursor = e.target.result;
          if (cursor) {
          //   console.log(cursor);
            cursor.value.id = cursor.key;
            
            result.push(/*ToDoItem.fromDb(*/cursor.value/*)*/);

            cursor.continue();
          }
      }
    });
  }
}

