import pool from '../configs/connectDB';
var _ = require('lodash');

let getAllStaff = async (req, res) => {
    let userId = req.query.id;
    if (userId == null) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }
    }
    else {
        try {
            const [detail, fields] = await pool.execute('SELECT * FROM nhanvien where MANV = ?', [userId]);
            return res.status(200).json({
                message: 'ok',
                data: detail
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }
    }

}

let createNewStaff = async (req, res) => {
    let { HOTEN, NGAYSINH, GIOITINH, NGAYVL, DIACHI, CMND, LUONG, SDT } = req.body;
    if (!HOTEN || !NGAYSINH || !GIOITINH || !NGAYVL || !DIACHI || !CMND || !LUONG || !SDT) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Insert_Nhanvien(?,?,?,?,?,?,?,?,?)',
            ['', HOTEN, NGAYSINH, GIOITINH, SDT, LUONG, CMND, DIACHI, NGAYVL]);
        let temp = rows[0];
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
        })
    }
}

let updateStaff = async (req, res) => {
    console.log('check req update staff: ', req.body);
    let { HOTEN, NGAYSINH, GIOITINH, NGAYVL, DIACHI, CMND, LUONG, SDT, MANV } = req.body;
    if (!HOTEN || !NGAYSINH || !GIOITINH || !NGAYVL || !DIACHI || !CMND || !LUONG || !SDT || !MANV) {
        return res.status(404).json({
            message: 'missing requied params'
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Update_NhanVien(?,?,?,?,?,?,?,?,?)',
            [MANV, HOTEN, NGAYSINH, GIOITINH, SDT, LUONG, CMND, DIACHI, NGAYVL]);
        let temp = rows[0];
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }

}

let deleteStaff = async (req, res) => {
    console.log('check id: ', req.query.id);
    let deleteId = req.query.id;
    if (!deleteId) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('DELETE FROM nhanvien WHERE MANV = ?', [deleteId])
        const [rows, fields] = await pool.execute('SELECT * FROM nhanvien');
        return res.status(200).json({
            message: 'oke',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}
let getAllCustomer = async (req, res) => {
    let userId = req.query.id;
    if (userId == null) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM khachhang');
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }

    }
    else {
        try {
            const [detail, fields] = await pool.execute('select * from khachhang where MAKH = ?', [userId])
            return res.status(200).json({
                message: 'ok',
                data: detail
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }

    }
}


let createNewCustomer = async (req, res) => {
    console.log(req.body)
    let { HOTEN, NGAYSINH, GIOITINH } = req.body;
    if (!HOTEN || !NGAYSINH || !GIOITINH) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Insert_KhacHang(?, ?, ?, ?, ?, ?)',
            ['', HOTEN, NGAYSINH, GIOITINH, 'normal', '60']);
        let temp = rows[0];
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
        })
    }

}

let deleteCustomer = async (req, res) => {
    console.log('check id: ', req.query.id);
    let deleteId = req.query.id;
    if (!deleteId) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('DELETE FROM khachhang WHERE MAKH = ?', [deleteId])
        const [rows, fields] = await pool.execute('SELECT * FROM khachhang');
        return res.status(200).json({
            message: 'oke',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}
let updateCustomer = async (req, res) => {
    console.log('check: ', req.body)
    let { HOTEN, NGAYSINH, GIOITINH, LOAIKH, DIEMTICHLUY, MAKH } = req.body;
    if (!HOTEN || !NGAYSINH || !GIOITINH || !LOAIKH, !DIEMTICHLUY, !MAKH) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        //Update_KhacHang 
        const [rows, fields] = await pool.execute('CALL Update_KhacHang(?,?,?,?,?,?)',
            [MAKH, HOTEN, NGAYSINH, GIOITINH, LOAIKH, DIEMTICHLUY]);
        // await pool.execute('SELECT * FROM khachhang');
        let temp = rows[0];
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}

let getAllMatch = async (req, res) => {
    let userid = req.query.id;
    if (userid == null) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM tranbong');
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }
    }
    else {
        try {
            const [detail, fields] = await pool.execute('SELECT * FROM tranbong where MATB = ?', [userid]);
            return res.status(200).json({
                message: 'ok',
                data: detail
            })
        } catch (error) {
            return res.status(200).json({
                message: error,
            })
        }
    }


}

let createNewMactch = async (req, res) => {
    let { TENTB, NGAYBD, TRONGTAI, BLV, DOANHTHU } = req.body;
    if (!TENTB || !NGAYBD || !TRONGTAI || !BLV || !DOANHTHU) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Insert_Tranbong(?,?,?,?,?,?)',
            ['', TENTB, NGAYBD, TRONGTAI, BLV, DOANHTHU]);
        let temp = rows[0];
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
        })
    }
}

let deleteMatch = async (req, res) => {
    console.log('check id: ', req.query.id);
    let deleteId = req.query.id;
    if (!deleteId) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('DELETE FROM tranbong WHERE MATB = ?', [deleteId])
        const [rows, fields] = await pool.execute('SELECT * FROM tranbong');
        return res.status(200).json({
            message: 'oke',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}
let updateMatch = async (req, res) => {
    console.log(req.body);
    let { MATB, TENTB, NGAYBD, TRONGTAI, BLV, DOANHTHU } = req.body;
    if (!TENTB || !NGAYBD || !TRONGTAI || !BLV || !DOANHTHU || !MATB) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Update_TranBong(?,?,?,?,?,?)',
            [MATB, TENTB, NGAYBD, TRONGTAI, BLV, DOANHTHU]);
        let temp = rows[0]
        return res.status(200).json({
            message: temp[0]
        })
    } catch (error) {
        return res.status(404).json({
            message: "Dinh khoa ngoai",
        })
    }

}
let getAllSeat = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM ghe');
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }
}

let createNewSeat = async (req, res) => {
    console.log("check req: ", req.body);
    let { LOAIGHE } = req.body;
    if (!LOAIGHE) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    try {
        await pool.execute('insert into ghe (LOAIGHE) values (?)',
            [LOAIGHE]);
        const [rows, fields] = await pool.execute('SELECT * FROM ghe');
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }
}

let deleteSeat = async (req, res) => {
    console.log('check id: ', req.params.id);
    let deleteId = req.params.id;
    if (!deleteId) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('DELETE FROM ghe WHERE MAGHE = ?', [deleteId])
        const [rows, fields] = await pool.execute('SELECT * FROM ghe');
        return res.status(200).json({
            message: 'oke',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}
let updateSeat = async (req, res) => {
    let { LOAIGHE, MAGHE } = req.body;
    if (!LOAIGHE || !MAGHE) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('update ghe set LOAIGHE = ? where MAGHE = ?',
            [LOAIGHE, MAGHE]);
        const [rows, fields] = await pool.execute('SELECT * FROM ghe');
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }

}
let getAllTicket = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM datve');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}
let bookTicket = async (req, res) => {
    console.log("check req: ", req.body);
    let { MAKH, MATB, MANV, NGAYDAT, VITRI, GIAVE } = req.body;
    if (!MAKH, !MATB, !MANV, !NGAYDAT, !VITRI, !GIAVE) {
        return res.status(200).json({
            message: 'missing requied params',
        })
    }
    try {
        const [rows, fields] = await pool.execute('CALL Insert_Datve(?,?,?,?,?,?,?)',
            ['', MAKH, MATB, MANV, NGAYDAT, VITRI, GIAVE]);
        let temp = rows[0]
        return res.status(200).json({
            message: temp[0]
        })
    }
    catch (error) {
        return res.status(404).json({
            message: error,
            error: "error constraint"
        })
    }
}
let deleteTicket = async (req, res) => {
    console.log('check id: ', req.params.id);
    let deleteId = req.params.id;
    if (!deleteId) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('DELETE FROM datve WHERE MADV = ?', [deleteId])
        const [rows, fields] = await pool.execute('SELECT * FROM datve');
        return res.status(200).json({
            message: 'oke',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }
}
let updateTicket = async (req, res) => {
    let { MAKH, MATB, MANV, NGAYDAT, GIAVE, MADV } = req.body;
    if (!MAKH || !MATB || !MANV || !NGAYDAT || !GIAVE || !MADV) {
        return res.status(417).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('update datve set MAKH = ?, MATB = ?, MANV = ?, NGAYDAT = ?, GIAVE = ? where MADV = ?',
            [MAKH, MATB, MANV, NGAYDAT, GIAVE, MADV]);
        const [rows, fields] = await pool.execute('SELECT * FROM datve');
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    } catch (error) {
        return res.status(409).json({
            message: error,
        })
    }
}

module.exports = {
    updateTicket, deleteTicket, bookTicket, getAllTicket, updateSeat, deleteSeat, createNewSeat, getAllSeat, updateMatch, getAllStaff, createNewStaff, updateStaff, deleteStaff, getAllCustomer, createNewCustomer, deleteCustomer, updateCustomer, getAllMatch, createNewMactch, deleteMatch
}