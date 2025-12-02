-- Tạo CSDL
CREATE DATABASE IF NOT EXISTS qlsp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE qlsp_db;

-- Tạo bảng sanpham
CREATE TABLE sanpham (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maSP VARCHAR(20) UNIQUE NOT NULL,
    tenSP VARCHAR(100) NOT NULL,
    gia DECIMAL(15,2) NOT NULL,
    soLuong INT NOT NULL,
    loaiSP VARCHAR(50) NOT NULL,
    ngayTao DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Dữ liệu mẫu
INSERT INTO sanpham (maSP, tenSP, gia, soLuong, loaiSP) VALUES
('SP001', 'iPhone 15', 25000000, 10, 'Điện tử'),
('SP002', 'Bánh mì', 25000, 50, 'Thực phẩm'),
('SP003', 'Áo thun', 150000, 100, 'Thời trang');