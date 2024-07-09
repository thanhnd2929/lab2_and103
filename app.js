const express = require('express');
const mongoose = require('mongoose');
const sinhvien = require('./sinhVienModel');

const app = express();

app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/AND103')
.then(() => {
    console.log('da ket noi thanh cong voi mongoDb');
})
.catch( err => {
    console.log('loi: ',err);
});

app.use(express.json());


app.get('/sinhvien', async (req, res) => {
    try {
        const sinhviens = await sinhvien.find() // doc du lieu tu mongoDB
        res.render('sinhvien', { sinhviens }); // new 
        res.json(sinhviens)
        console.log(sinhviens);
    } catch (error) {
        console.log('loi 2: ',error);
        res.status(500).json({error: 'khong ket noi dc server'})
    }
})


// tao cong dich vu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server dang chay cong 3000');
})