-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 19, 2022 lúc 05:08 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlbd`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datve`
--

CREATE TABLE `datve` (
  `MADV` int(11) NOT NULL,
  `MAKH` int(11) DEFAULT NULL,
  `MATB` int(11) DEFAULT NULL,
  `MANV` int(11) DEFAULT NULL,
  `NGAYDAT` date NOT NULL,
  `VITRI` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `GIAVE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `datve`
--

INSERT INTO `datve` (`MADV`, `MAKH`, `MATB`, `MANV`, `NGAYDAT`, `VITRI`, `GIAVE`) VALUES
(66, 5, 5, 5, '2022-12-19', '14', 1600000),
(67, 6, 5, 5, '2022-12-19', '15', 1600000);

--
-- Bẫy `datve`
--
DELIMITER $$
CREATE TRIGGER `Insert_GiaVe` AFTER INSERT ON `datve` FOR EACH ROW BEGIN 
		IF(new.GIAVE < 0) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT ='Nhập giá vé không hợp lệ!!!';
		ELSE
			UPDATE tranbong SET DOANHTHU = DOANHTHU + new.GIAVE WHERE new.MATB = tranbong.MATB;
		END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Trigger_Ngsinh_NV` AFTER UPDATE ON `datve` FOR EACH ROW BEGIN 
	Declare ngSinh varchar(50);
		SET ngSinh  = (select NGAYSINH from khachhang where khachhang.MAKH = new.MAKH);
		IF(new.NGAYDAT < ngSinh) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT ='Ngày mua vé của khách hàng phải lớn hơn ngày sinh của khách hàng đó';
		END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ghe`
--

CREATE TABLE `ghe` (
  `MAGHE` int(11) NOT NULL,
  `LOAIGHE` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ghe`
--

INSERT INTO `ghe` (`MAGHE`, `LOAIGHE`) VALUES
(3, 'VIP'),
(4, 'thuong');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MAKH` int(11) NOT NULL,
  `HOTEN` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `GIOITINH` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `LOAIKH` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `DIEMTICHLUY` float NOT NULL,
  `NGAYSINH` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MAKH`, `HOTEN`, `GIOITINH`, `LOAIKH`, `DIEMTICHLUY`, `NGAYSINH`) VALUES
(5, 'nghiadeptrai KINH', 'Nam', 'vip', 130, '2022-12-03'),
(6, 'Nguyen Quá Giòn ', 'Nữ', 'normal', 106.5, '2014-12-17'),
(7, 'Nguyen Quá Giòn N', 'Nữ', 'vip', 101.5, '2014-12-17'),
(8, 'Nghia sadf', 'Nam', 'vip', 10, '2022-10-22'),
(12, 'Nguyên ', 'Nữ', 'vip', 101.5, '2014-12-17');

--
-- Bẫy `khachhang`
--
DELIMITER $$
CREATE TRIGGER `Trigger_CheckNgSinh_KH` AFTER UPDATE ON `khachhang` FOR EACH ROW BEGIN
        Declare NGDAT varchar(50);
	  	SET NGDAT = (select NGAYDAT FROM datve WHERE new.MAKH = datve.MAKH);  
		IF (new.NGAYSINH > NGDAT) THEN
        		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ngày sinh của khách hàng phải bé hơn ngày mua vé của khách hàng đó';
		END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MANV` int(11) NOT NULL,
  `HOTEN` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NGAYSINH` date NOT NULL,
  `GIOITINH` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` int(11) NOT NULL,
  `LUONG` double NOT NULL,
  `CMND` int(11) NOT NULL,
  `DIACHI` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NGAYVL` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MANV`, `HOTEN`, `NGAYSINH`, `GIOITINH`, `SDT`, `LUONG`, `CMND`, `DIACHI`, `NGAYVL`) VALUES
(5, 'Nghĩa', '2022-12-07', 'nam', 9123455, 5000000, 2147483647, 'Đà Nẵng', '2022-12-14'),
(17, 'nguyen S ', '2022-12-07', 'nam', 9123455, 5000000, 2147483647, 'Đà Nẵng', '2022-12-14'),
(31, 'nghia', '2002-10-02', 'nam', 123, 100, 12345, 'DN', '2022-12-02'),
(32, 'TRÍ', '2022-12-07', 'nam', 9123455, 5000000, 2147483647, 'QUAN NINH', '2022-12-14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tranbong`
--

CREATE TABLE `tranbong` (
  `MATB` int(11) NOT NULL,
  `TENTB` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NGAYBD` date NOT NULL,
  `TRONGTAI` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `BLV` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DOANHTHU` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tranbong`
--

INSERT INTO `tranbong` (`MATB`, `TENTB`, `NGAYBD`, `TRONGTAI`, `BLV`, `DOANHTHU`) VALUES
(5, 'nghia', '2022-10-22', 'nguyen', 'tri', 10400100),
(7, 'Agentina - Paris', '2022-12-18', 'Nghia', 'Tri', 4804000),
(9, 'nghia GIÒN LẮM ', '2022-10-22', 'nguyen', 'tri', 100);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `datve`
--
ALTER TABLE `datve`
  ADD PRIMARY KEY (`MADV`),
  ADD KEY `FK_MAKH` (`MAKH`),
  ADD KEY `FK_MATB` (`MATB`),
  ADD KEY `FK_MANV` (`MANV`);

--
-- Chỉ mục cho bảng `ghe`
--
ALTER TABLE `ghe`
  ADD PRIMARY KEY (`MAGHE`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MAKH`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MANV`);

--
-- Chỉ mục cho bảng `tranbong`
--
ALTER TABLE `tranbong`
  ADD PRIMARY KEY (`MATB`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `datve`
--
ALTER TABLE `datve`
  MODIFY `MADV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `ghe`
--
ALTER TABLE `ghe`
  MODIFY `MAGHE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MAKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `MANV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `tranbong`
--
ALTER TABLE `tranbong`
  MODIFY `MATB` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `datve`
--
ALTER TABLE `datve`
  ADD CONSTRAINT `FK_MAKH` FOREIGN KEY (`MAKH`) REFERENCES `khachhang` (`MAKH`),
  ADD CONSTRAINT `FK_MANV` FOREIGN KEY (`MANV`) REFERENCES `nhanvien` (`MANV`),
  ADD CONSTRAINT `FK_MATB` FOREIGN KEY (`MATB`) REFERENCES `tranbong` (`MATB`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
