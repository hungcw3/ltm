<?php
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dữ liệu không hợp lệ']);
    exit();
}

$id = $input['id'];
$maSP = trim($input['maSP']);
$tenSP = trim($input['tenSP']);
$gia = $input['gia'];
$soLuong = $input['soLuong'];
$loaiSP = $input['loaiSP'];

try {
    $sql = "UPDATE sanpham SET maSP = ?, tenSP = ?, gia = ?, soLuong = ?, loaiSP = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$maSP, $tenSP, $gia, $soLuong, $loaiSP, $id]);
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Lỗi: ' . $e->getMessage()]);
}
?>