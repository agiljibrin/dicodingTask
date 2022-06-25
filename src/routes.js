const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNotesByIdHandler} = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        //  cors:{
        //  option: {
        //      cors: {
        //          origin: ['*'],
        //      },
        //  },
    },

    // routes menampilkan catatan

     {
         method: 'GET',
         path: '/notes',
         handler: getAllNotesHandler,
     },

     // method untuk mendapatkan isi dari id
     {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
     },

     // Route unutk mengubah notes

     {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
     },

     // Route untuk menghapus note
     {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesByIdHandler,
     }




];

module.exports =  routes;