const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const {tittle, tags, body} = request.payload;

    const id = nanoid(16);

    const createdAt = new Date().toDateString();
    const updateAt = createdAt;

    const newNote = {
        tittle, tags, body, id, createdAt, updateAt
    };

    // notes.push mengarah ke notes.js sebagai variabel yang di import
    notes.push(newNote);

    // Lantas bagaimana cara ketika kita ingin mengetahui bagaimana cara nya ketika ingin melihat apakah array sudah masuk atau belum

    const isSuccess = notes.filter((e) => e.id === id).length > 0;

    // kemudian kita gunakan isSuccess untuk menentukan response jika berhasil atau tidak

    if(isSuccess){
        const response = h.response({
            message: 'Catatan Berhasil di Tambahkan',
            data: () => {
                noteID = id;
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal Di Tambahkan'
    });
    response.code(500);
    return response;
};



// fungsi menampilakn note di notesHandler

 const getAllNotesHandler = () => ({
     status : 'success',
     data: {
         notes,
     },
 });

 // get note by id handler 

 const getNoteByIdHandler = (request, h) => {

    // kita dapatkan dulu id dari request
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id )[0];

    // memastikan bahwa note tidak bernilai undefined

    if(note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak di temukan',
    });


    response.code(400);
    return response;

 };


 // fungsi mengubah note di handler 

 const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const { title, tags, body } = request.params;
    const updated = new Date().toDateString();
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index], title, tags, body, updated
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal Memperbarui catatan'
    });

    response.code(404);
    return response;
 };

 // fungsi delete note

 const deleteNotesByIdHandler = (request, h) => {

    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil di hapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal di hapus'
    });

    response.code(404);
    return response;

 }

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNotesByIdHandler};