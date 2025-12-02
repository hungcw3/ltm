<?php
require 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM sanpham ORDER BY ngayTao DESC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi đọc dữ liệu']);
}
?>