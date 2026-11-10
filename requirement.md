Role: Senior Frontend Developer / Zalo Mini App Specialist.
Task: Cập nhật codebase hiện tại để triển khai giao diện (UI) Giai đoạn 1 cho Zalo Mini App Phòng Khám.

### 🎯 Yêu Cầu Chung:
- **Phạm vi:** Chỉ tập trung xây dựng giao diện (UI) và điều hướng (Navigation) qua lại giữa các màn hình sử dụng **mock data (dữ liệu giả lập)**. Chưa cần tích hợp API backend hoặc xử lý logic nghiệp vụ phức tạp ở giai đoạn này.
- **Framework/UI Library:** Sử dụng Zalo Mini App Framework (ZMP) hoặc React/Tailwind CSS sẵn có trong codebase.

---

### 📱 Chi Tiết Các Màn Hình & Thành Phần UI:

#### 1. Trang chủ (Home Screen)
- Nút **“Tìm phòng khám”** (dẫn tới màn hình kết quả/tìm kiếm).
- Nút **“Khẩn cấp? Gọi 115”** (nút nổi bật/sticky, luôn hiện trên màn hình, bấm vào chuyển thẳng sang màn Cấp cứu).
- Lối vào nhanh (Shortcut): **Lịch uống thuốc** và **Quét toa**.
- Thẻ nhắc nhở sức khỏe (Health Reminder Card): Hiển thị nội dung y tế mẫu kèm theo **dòng nguồn (source)** và **ngày duyệt (approval date)**.

#### 2. Mô tả triệu chứng (Symptom Description Screen)
- Ô nhập liệu triệu chứng (Text input/Textarea).
- Bộ lọc/Chọn khu vực (Region selector dropdown).
- Khung cảnh báo (Emergency Warning Banner): Nổi bật, khi bấm vào sẽ điều hướng thẳng sang **Màn hình Cấp cứu**.

#### 3. Kết quả (Result Screen)
- Hiển thị chuyên khoa gợi ý (Suggested medical specialty).
- Hai thẻ thông tin: Thẻ **“Đã kiểm tra”** (Verified) và Thẻ **“Chưa kiểm chứng”** (Unverified).
- Nút **Google Maps** và nút **Chỉ đường** (Directions).
- Trường hợp không có kết quả: Hiển thị nút **“Tìm thêm trên Google Maps”**.

#### 4. Cấp cứu (Emergency Screen)
- Nút **“Gọi 115”** kích thước lớn, dễ nhận diện.
- Nút tìm cơ sở cấp cứu gần nhất.
- Đoạn văn bản giải thích rõ ràng lý do màn hình này xuất hiện (Disclaimer/Context description).

#### 5. Lịch uống thuốc (Medication Schedule Screen)
- Chia bố cục rõ 3 buổi: **Sáng / Chiều / Tối**.
- Checkbox/Toggle tích chọn trạng thái đã uống.
- Ghi chú lịch trình được lưu trữ cục bộ trên thiết bị (Local storage / Mock state).

#### 6. Xác nhận toa thuốc (Prescription Confirmation Screen)
- Khung cảnh báo: Kết quả phân tích từ ảnh có thể có sai sót.
- Hiển thị hình ảnh toa thuốc (Placeholder image) để người dùng đối chiếu.
- Nút **“Lưu lịch uống”**: Bị khóa (Disabled) mặc định và chỉ được mở khóa (Enabled) khi người dùng tích chọn ô xác nhận.

---

### 🚀 Yêu Cầu Kỹ Thuật Cho Codebase:
1. Đảm bảo luồng định tuyến (Routing/Navigation) hoạt động mượt mà giữa tất cả 6 màn hình trên.
2. Sử dụng mock data thực tế, trực quan cho các trạng thái (triệu chứng, kết quả chuyên khoa, toa thuốc, lịch uống thuốc).
3. Đảm bảo giao diện tối ưu trên mobile (Responsive, chuẩn UI/UX Zalo Mini App).