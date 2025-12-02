// bt3.js - Phiên bản dùng MySQL + PHP
let products = [];
let editingId = null;
let deleteId = null;

const API_URL = 'api/';

async function loadProducts() {
    try {
        const res = await fetch(API_URL + 'read.php');
        products = await res.json();
        renderTable();
    } catch (err) {
        showToast('Lỗi', 'Không tải được dữ liệu!', 'danger');
    }
}

function renderTable() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';

    if (products.length === 0) {
        document.getElementById('emptyState').classList.remove('d-none');
        updateTotalCount();
        return;
    }
    document.getElementById('emptyState').classList.add('d-none');

    products.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${p.maSP}</strong></td>
            <td>${p.tenSP}</td>
            <td>${formatCurrency(p.gia)}</td>
            <td><span class="badge bg-${p.soLuong > 0 ? 'success' : 'danger'}">${p.soLuong}</span></td>
            <td><span class="badge bg-secondary">${p.loaiSP}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-warning" onclick="editProduct(${p.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="prepareDelete(${p.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    updateTotalCount();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function updateTotalCount() {
    document.getElementById('totalCount').textContent = `${products.length} sản phẩm`;
}

// Submit form
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        maSP: document.getElementById('maSP').value.trim(),
        tenSP: document.getElementById('tenSP').value.trim(),
        gia: parseFloat(document.getElementById('gia').value),
        soLuong: parseInt(document.getElementById('soLuong').value),
        loaiSP: document.getElementById('loaiSP').value
    };

    const url = editingId ? `${API_URL}update.php` : `${API_URL}create.php`;
    const method = editingId ? 'PUT' : 'POST';
    if (editingId) formData.id = editingId;

    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await res.json();

        if (result.success || !result.error) {
            showToast('Thành công', result.message || 'Thao tác thành công!', 'success');
            this.reset();
            document.getElementById('formModal').textContent = 'Thêm mới';
            document.getElementById('btnText').textContent = 'Lưu';
            editingId = null;
            loadProducts();
        } else {
            showToast('Lỗi', result.error, 'danger');
        }
    } catch (err) {
        showToast('Lỗi', 'Kết nối server thất bại!', 'danger');
    }
});

function editProduct(id) {
    const p = products.find(x => x.id == id);
    if (!p) return;

    document.getElementById('maSP').value = p.maSP;
    document.getElementById('tenSP').value = p.tenSP;
    document.getElementById('gia').value = p.gia;
    document.getElementById('soLuong').value = p.soLuong;
    document.getElementById('loaiSP').value = p.loaiSP;

    editingId = id;
    document.getElementById('formMode').textContent = 'Chỉnh sửa';
    document.getElementById('btnText').textContent = 'Cập nhật';
}

function prepareDelete(id) {
    const p = products.find(x => x.id == id);
    deleteId = id;
    document.getElementById('deleteProductName').textContent = `${p.maSP} - ${p.tenSP}`;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

document.getElementById('confirmDelete').addEventListener('click', async () => {
    try {
        const res = await fetch(`${API_URL}delete.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: deleteId })
        });
        const result = await res.json();
        if (result.success) {
            showToast('Thành công', 'Xóa thành công!', 'success');
            loadProducts();
        }
    } catch {
        showToast('Lỗi', 'Xóa thất bại!', 'danger');
    } finally {
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    }
});

function showToast(title, msg, type) {
    const toast = document.getElementById('liveToast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastBody').textContent = msg;
    toast.className = `toast align-items-center text-bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    new bootstrap.Toast(toast).show();
}

// Tìm kiếm
document.getElementById('searchInput').addEventListener('keyup', function() {
    const term = this.value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
    });
});

// Khởi động
document.addEventListener('DOMContentLoaded', loadProducts);