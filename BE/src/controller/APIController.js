import pool from '../configs/connectDB';
let getAllStaff = async (req, res) => {
    //http 
    // 401 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewStaff = async (req, res) => {
    console.log('check nhanvien: ', req.body);
    let { HOTEN, NGSINH, GIOITINH, SODT, LUONG } = req.body;
    if (!HOTEN || !NGSINH || !GIOITINH || !SODT || !LUONG) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    await pool.execute('insert into nhanvien (HOTEN, NGSINH, GIOITINH, SODT, LUONG) values (?, ?, ?, ?, ?)',
        [HOTEN, NGSINH, GIOITINH, SODT, LUONG]);
    const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}
let updateUser = async (req, res) => {
    let { MANV, HOTEN, NGSINH, GIOITINH, SODT, LUONG } = req.body;
    if (!MANV || !HOTEN || !NGSINH || !GIOITINH || !SODT) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    await pool.execute('update nhanvien set HOTEN = ?, NGSINH = ?, GIOITINH = ?, SODT = ?, LUONG = ? where MANV = ?',
        [HOTEN, NGSINH, GIOITINH, SODT, LUONG, MANV]);
    const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}
let deleteStaff = async (req, res) => {
    console.log('check id: ', req.params.id);
    let deleteId = req.params.id;
    if (!deleteId) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    await pool.execute('DELETE FROM nhanvien WHERE MANV = ?', [deleteId])
    const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
    return res.status(200).json({
        message: 'oke',
        data: rows
    })
}
module.exports = {
    getAllStaff, createNewStaff, updateUser, deleteStaff
}