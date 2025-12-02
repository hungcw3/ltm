<?php
require 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID không hợp lệ']);
    exit();
}

try {
    $sql = "DELETE FROM sanpham WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$input['id']]);
    echo json_encode(['success' => true, 'message' => 'Xóa thành công']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Lỗi xóa']);
}
?>