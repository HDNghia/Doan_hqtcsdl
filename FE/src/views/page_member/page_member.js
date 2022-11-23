import React, { useState } from "react";
import './page_member.scss';
import { useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import Body from "../Book-chair/Body";

function Page_member(props) {
    // const [state, setState] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     address: ''
    // });
    return (
        <>
            <Nav />
            <div class="container">
                <div class="row">
                    <div class="col-3 information">
                        <div>
                            <h3>Thông tin cá nhân</h3>
                            <div class="form-group">
                                <label for="formGroupExampleInput">Họ tên khách hàng</label>
                                <input type="text" class="form-control" id="" placeholder="Example input" />
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Giới tính</label>
                                <input type="text" class="form-control" id="" placeholder="Another input" />
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Loại khách hàng</label>
                                <input type="text" class="form-control" id="" placeholder="Another input" />
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Ngày sinh</label>
                                <input type="text" class="form-control" id="" placeholder="Another input" />
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Tài khoản</label>
                                <input type="text" class="form-control" id="" placeholder="Another input" />
                            </div><div class="form-group">
                                <label for="formGroupExampleInput2">Tích lũy</label>
                                <input type="text" class="form-control" id="" placeholder="Another input" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-primary">Hỗ trợ</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-success">Lịch sử đặt vé</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-8 book-ticket">
                        <div class="row">
                            <div class="col-12 choose-date">
                                <div class="row">
                                    <div class="col">
                                        <label>Chọn ngày chiếu</label> &nbsp;
                                        <input type="date"></input>
                                    </div>
                                    <div class="col">
                                        <label>Giờ chiếu</label> &nbsp;
                                        <input type="time"></input>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 book-ticket-film">
                                <div class="row">
                                    <div class="col-3 choose-film">
                                        <h3>Chọn phim</h3>
                                        <select class="select-film">
                                            <option>Chọn phim</option>
                                            <option>Phim lý tiểu long</option>
                                            <option>Phim thành long</option>
                                            <option>Tiểu sử Huỳnh Đăng Nghĩa</option>
                                        </select>

                                    </div>
                                    <div class="col-8 choose-chair">

                                        <div class="row">
                                            <div class="col-10">
                                                <h3 class="Manchieu">Màn chiếu</h3>
                                                <Body />
                                            </div>
                                            <div class="col-2" >
                                                <section class="vip"></section>
                                                <div>Ghế vip</div>
                                                <section class="normal"></section>
                                                <div>Ghế thường</div>
                                                <section class="vip-choosed"></section>
                                                <div>Ghế vip chọn</div>
                                                <section class="normal-choosed"></section>
                                                <div>Ghế thường chọn</div>
                                                <section class="bought"></section>
                                                <div>Ghế đã mua</div>
                                                <button className="btn btn-primary">OKela</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col fix-margin"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Page_member; 