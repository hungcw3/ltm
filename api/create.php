<?php
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Dữ liệu không hợp lệ']);
    exit();
}

$maSP = trim($input['maSP']);
$tenSP = trim($input['tenSP']);
$gia = $input['gia'];
$soLuong = $input['soLuong'];
$loaiSP = $input['loaiSP'];

try {
    $sql = "INSERT INTO sanpham (maSP, tenSP, gia, soLuong, loaiSP) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$maSP, $tenSP, $gia, $soLuong, $loaiSP]);
    echo json_encode(['success' => true, 'message' => 'Thêm thành công']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['error' => 'Mã sản phẩm đã tồn tại!']);
    } else {
        echo json_encode(['error' => 'Lỗi: ' . $e->getMessage()]);
    }
