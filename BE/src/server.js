import express from 'express';
import initApiroute from './route/api';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
//dùng để lấy dữ liệu từ form 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init api route
initApiroute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

