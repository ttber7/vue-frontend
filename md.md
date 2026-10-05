1. Phần stores này có phải Interface của Java OOP không?
📌 Câu trả lời chuẩn cho thầy/cô: "Thưa thầy/cô, interface trong thư mục stores là của TypeScript (thuộc hệ sinh thái JavaScript), không phải của Java, nhưng nó thừa hưởng tư duy hướng đối tượng (OOP) rất giống Java."

Điểm giống Java OOP:
Đều dùng để định nghĩa khung cấu trúc dữ liệu (hợp đồng dữ liệu - Contract), quy định một đối tượng bài viết hay danh mục phải gồm những thuộc tính nào, kiểu dữ liệu gì (string, number, boolean).
Khác biệt quan trọng so với Java:
Interface trong TypeScript chỉ tồn tại lúc viết code (compile-time) để IDE báo lỗi nếu gõ sai thuộc tính. Khi build ra file .js chạy trên trình duyệt thì TypeScript tự loại bỏ interface, giúp code nhẹ và nhanh hơn.
Ví dụ trong code (stores/Product.ts):
typescript
export interface Product {
  id: number | string;
  name: string;
  description: string;
  details: string;
  image: string;
  category: number | string;
  categoryName?: string;
  author?: string;
  authorEmail?: string;
  createdAt?: string;
  views?: number;
  hot?: number;
}
2. Sự khác nhau giữa Lab 1-8, SOF3081 Assignment PDF và Dự án ASM thực tế của bạn
Tiêu chí	Các bài Lab (Lab 1 -> Lab 8)	Yêu cầu trong PDF (SOF3081)	Dự án ASM thực tế hiện tại
Kiến trúc & Công cụ	Chia nhỏ từng bài thực hành riêng lẻ: cú pháp Vue, Directives, Router, Form Validation	Xây dựng Blog hoàn chỉnh, có banner, bài viết, bình luận, profile	Full-Stack Frontend hoàn chỉnh: Dùng Vite + Vue 3 (Composition API) + TypeScript + Bootstrap 5
Backend & Dữ liệu	Dùng mảng JavaScript tĩnh (hardcode mảng ref([]) trực tiếp trong component)	Đề bài yêu cầu giao diện & tương tác dữ liệu	Dùng json-server (REST API giả lập chạy port 3000) kết hợp cơ sở dữ liệu backend/db.json
Cách giao tiếp API	Dữ liệu nội bộ	Tùy chọn	Dùng Axios và fetch() bất đồng bộ (async/await) để gọi API chuẩn RESTful (GET, POST, PUT, DELETE)
Xác thực & Bảo mật	Chỉ kiểm tra đăng nhập đơn giản bằng v-model	Quản lý tài khoản, đăng nhập/đăng ký	Bảo mật chuyên nghiệp: Sử dụng thư viện bcryptjs để mã hóa băm mật khẩu 1 chiều, kết hợp localStorage lưu phiên đăng nhập
Xác thực Form	Dùng regex cơ bản hoặc required HTML5	Form đăng ký, đăng nhập	Dùng combo chuẩn công nghiệp: Vee-Validate + Yup Schema (kiểm tra email, độ dài, chữ hoa, thường, số, ký tự đặc biệt)
Phân quyền người dùng	Chưa có hoặc chỉ chuyển trang bằng nút bấm	Người dùng đăng bài, admin duyệt	Phân quyền 2 cấp độ:
• Admin: Toàn quyền bài viết & danh mục.
• User: Tự quản lý bài viết của mình.
• Navigation Guard (router.beforeEach): Chặn trang trái phép chuyển về /403.
3. Những phần QUAN TRỌNG NHẤT thầy cô hay hỏi & Cách trả lời "ăn điểm"
❓ Câu hỏi 1: Dự án của em lưu trữ dữ liệu ở đâu? Làm sao để thêm/sửa/xóa bài viết?
Cách trả lời:
Em dùng json-server chạy trên cổng 3000 để đóng vai trò là REST API backend, dữ liệu được lưu bền vững vào file backend/db.json.
Khi người dùng Thêm/Sửa/Xóa, frontend gửi các HTTP Request tương ứng:
GET /products: Lấy danh sách bài viết.
POST /products: Tạo bài viết mới.
PUT /products/:id: Cập nhật bài viết.
DELETE /products/:id: Xóa bài viết.
❓ Câu hỏi 2: Hệ thống đăng nhập và phân quyền của em hoạt động thế nào?
Cách trả lời:
Mã hóa: Khi đăng ký (Signup.vue), mật khẩu được băm bằng await bcrypt.hash(password, 10) trước khi gửi lên API lưu trữ, không lưu mật khẩu dạng chữ rõ (plain text).
Xác thực: Khi đăng nhập (Login.vue), hệ thống dùng await bcrypt.compare(password, user.password) để so sánh.
Lưu trạng thái: Dùng file stores/user.ts (Reactive State kết hợp localStorage) để lưu email, role, fullName.
Bảo vệ Route: Trong router/index.ts, em dùng Navigation Guard (router.beforeEach):
Nếu route có meta: { requiresAuth: true } mà chưa đăng nhập $\rightarrow$ chuyển về /login.
Nếu route có meta: { role: 'admin' } mà người dùng chỉ có quyền user $\rightarrow$ chặn lại và chuyển tới trang 403.vue (Forbidden).
❓ Câu hỏi 3: Sự khác biệt giữa quyền Admin và User thường trong trang Quản lý bài viết?
Cách trả lời:
Admin (admin@gmail.com): Xem được tất cả bài viết của tất cả mọi người trong hệ thống và có thêm trang Quản lý danh mục (/categoriesManagement).
User (teo@gmail.com): Chỉ xem, sửa và xóa các bài viết do chính email của mình tạo ra (authorEmail). Nếu User cố tình nhập link /categoriesManagement trên thanh URL thì sẽ bị chặn bởi trang 403.
❓ Câu hỏi 4: Trang Chi tiết bài viết (Detail.vue) có chức năng gì nổi bật?
Cách trả lời:
Trang này nhận id từ URL (route.params.id) để gọi API lấy đúng bài viết đó.
Tích hợp Hệ thống bình luận tương tác thực: Gửi request POST http://localhost:3000/comments để lưu bình luận của người dùng và hiển thị ngay lập tức lên bài viết.
❓ Câu hỏi 5: Giao diện Đăng nhập Blob UI ở đâu ra?
Cách trả lời:
Em xây dựng theo phong cách Neumorphism / Claymorphism (Blob UI): Tạo hình giọt nước bằng CSS border-radius: 52% 48% 33% 67% / ... kết hợp bóng đổ trong inset và bóng đổ ngoài để tạo chiều sâu 3D.
Hai quả cầu vệ tinh bên phải dùng để điều hướng nhanh sang trang Đăng ký (/signup) và Quên mật khẩu (/forgot-password).