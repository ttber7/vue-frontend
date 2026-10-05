<script setup lang="ts">
import { ref } from 'vue';

</script>
<template>
    <div>
        <div class="container-sm w-50 bg-light pt-5 pb-5 rounded-5 mt-5 mb-5 align-items-center">
            <form class="needs-validation container w-75" novalidate>
                <h1>Thay đổi mật khẩu </h1>
                <p>Chúng tôi sẽ gửi email hướng dẫn bạn đặt lại mật khẩu. Nếu bạn không có quyền truy cập vào email của mình
                    nữa, bạn có thể thử <a href="DangNhap.html">khôi phục tài khoản.</a></p>
                <div class="mb-3 mt-4">
                    <label for="exampleInputEmail1" class="form-label">Tài khoản mail</label>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control rounded-4" style="height: 50px;"
                            placeholder="Nhập mail cần thay đổi mật khẩu" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" required>
                        <div class="valid-feedback">
                            Tên hợp lệ
                        </div>
                        <div class="invalid-feedback">
                            Tên không hợp lệ
                        </div>
                    </div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label for="exampleCheck1">Bằng cách tạo tài khoản, bạn đồng ý với <u>Điều khoản</u> của chúng tôi cũng
                        như đã đọc và thừa nhận <u>Tuyên bố về quyền riêng tư toàn cầu</u>.</label>
                </div>
                <button type="submit" class="btn btn-danger ps-4 pe-4 rounded-5 me-5" style="height: 50px;"><i
                        class="fa-solid fa-spin "><i class="fa-solid fa-bounce"><i
                                class="fa-solid fa-circle-plus fa-shake"></i> </i></i> Đặt lại mật khẩu</button> <a
                    href="DangNhap.html"><u>Trở lại trang đăng nhập</u></a>
            </form>
        </div>
    </div>
</template>