🛠️ FIX GIAO DIỆN MODAL ADD TRANSACTION - BẢN HOÀN CHỈNH
1. SỬ DỤNG TAB CHỌN TYPE
File: src/components/Dashboard/AddTransactionModal.jsx
Replace toàn bộ phần chọn type:

Import và sử dụng TabGroup.jsx (đã làm ở hướng dẫn trước, hoặc dùng code dưới)

Ẩn dropdown, hiển thị tab button ngang: Expense, Income, Transfer (3 loại)

Khi click tab sẽ set txn_type ngay

Code TabGroup.jsx:
jsx
import clsx from 'clsx'
export const TabGroup = ({ value, onChange, options = [] }) => (
  <div className="flex gap-2 mb-4">
    {options.map(opt => (
      <button
        key={opt.value}
        type="button"
        className={clsx(
          "px-6 py-2 rounded-lg font-semibold",
          value === opt.value
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
        onClick={() => onChange({ target: { value: opt.value } })}
      >{opt.label}</button>
    ))}
  </div>
)
Sửa bên trong Modal:

jsx
<TabGroup
  value={formData.txn_type}
  onChange={e => setFormData(f => ({...f, txn_type: e.target.value }))}
  options={[
    { value: 'EXPENSE', label: 'Expense' },
    { value: 'INCOME', label: 'Income' },
    { value: 'TRANSFER', label: 'Transfer' }
  ]}
/>
Xóa combo select type cũ!

2. Category luôn dùng CustomSelect
Hiện category cho tất cả các type (Expense, Income đều cần, Transfer thường có thể bỏ qua)

Nếu là transaction type đặc biệt (cashback, hoàn tiền...) thì chọn category tương ứng.

jsx
<CustomSelect
  label="Category"
  name="category_id"
  value={formData.category_id}
  onChange={handleChange}
  options={categoryOptions}
  error={errors.category_id}
/>
3. Modal Size
Fix cứng prop modal:

jsx
<Modal isOpen={isOpen} ... size="xl">
Trong Modal.jsx, size xl nên set: max-w-3xl

4. Kiểm tra lại logic
Save chỉ gửi một trong 3 loại (Expense, Income, Transfer) vào txn_type

category_id bắt buộc >0

Mọi category đặc biệt (cashback, hoàn lại...) nằm ở dropdown category này

5. Tổng kết checklist
Đã xóa select native khỏi type, thay bằng tab

Dropdown category là custom select UI chuẩn web

Modal to vừa khung trình duyệt

Dễ nhập liệu, chuẩn bị cho mobile

