<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';


const { value: role } = useField('role');
const schema = yup.object({  
    email: yup.string()  
        .email('Email không hợp lệ')  
        .required('Email không được để trống'),  
    password: yup.string()  
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')  
        .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một chữ hoa')  
        .matches(/[a-z]/, 'Mật khẩu phải có ít nhất một chữ thường')  
        .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một chữ số')  
        .matches(/[^A-Za-z0-9]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt')  
        .required('Mật khẩu là bắt buộc'),  
    confirmpassword: yup.string()  
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')  
        .required('Xác nhận mật khẩu là bắt buộc'),
    fullname: yup.string()
        .required('không được để trống'), 
    phone: yup.string()
        .required('Số điện thoại không được để trống'), 
    address: yup.string()
        .required(' Địa chỉ không được để trống'),
    role: yup.string()
        .oneOf(['user', 'admin'], 'Vai trò không hợp lệ')
        .default('user')
});  

const router = useRouter();

const { handleSubmit, errors } = useForm({  
    validationSchema: schema  
});  

const { value: email } = useField('email');  
const { value: password } = useField('password');  
const { value: confirmpassword } = useField('confirmpassword');  
const { value: fullname } = useField('fullname');
const { value: address } = useField('address');
const { value: phone } = useField('phone');

const register = handleSubmit(async (values) => {   
    const existingUsers = await fetch(`http://localhost:3000/user?email=${values.email}`)  
        .then(response => response.json());  
     
    if (existingUsers.length > 0) {  
        alert("Email đã tồn tại");  
        return;  
    }  
 
    const hashedPassword = await bcrypt.hash(values.password, 10);  

   
    const response = await fetch('http://localhost:3000/user', {  
        method: "POST",  
        headers: {  
            "Content-Type": "application/json"  
        },  
        body: JSON.stringify({  
            email: values.email,  
            password: hashedPassword,
            fullname: values.fullname,
            phone: values.phone,
            address: values.address,
            role: values.role || 'user' 
        }),  
    });  
    
    if (response.ok) {  
        alert('Đăng ký thành công'); 
        router.push('/'); 
    } else {  
        alert('Có lỗi xảy ra trong quá trình đăng ký');  
    } 
});
</script>

<template>
    
    <div class="container-sm w-50 bg-light pt-5 pb-5 rounded-5 mt-5 mb-5 align-items-center">
            <h1>Đăng kí </h1>
            <form @submit="register" class="needs-validation container w-75" novalidate>
                
                <p>Tạo tài khoản mới hoặc <a href="dangnhap.html">đăng nhập</a></p>
                <div class="mb-3 mt-4">  
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Tài khoản mail</label>
                        <input type="email" v-model="email" class="form-control rounded-4" style="height: 50px;"
                            placeholder="Nhập mail chưa sử dụng" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" required>
                        <div class="text-danger"> {{ errors.email}}</div>
                    </div>
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Họ VÀ Tên</label>
                        <input type="text" v-model="fullname" class="form-control rounded-4" style="height: 50px;"
                            placeholder="Nhập họ tên đầy đủ" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" required>
                        <div class="text-danger"> {{ errors.fullname}}</div>
                    </div>
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Số Điên thoại</label>
                        <input type="number" v-model="phone" class="form-control rounded-4" style="height: 50px;"
                            placeholder="Nhập Số điện thoại" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" required>
                        <div class="text-danger"> {{ errors.phone}}</div>
                    </div>
                    <div class=" mb-3">
                        <label for="exampleInputEmail1" class="form-label">Địa chỉ</label>
                        <input type="text" v-model="address" class="form-control rounded-4" style="height: 50px;"
                            placeholder="Nhập địa chỉ hiện tại" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" required>
                        <div class="text-danger"> {{ errors.address}}</div>
                    </div>
                </div>
                <div class=" mb-3">
                    <label for="exampleInputPass" class="form-label">Mật khẩu</label>
                    <input type="text" v-model="password" class="form-control rounded-4" style="height: 50px;" id="exampleInputPass"
                        aria-describedby="Password" required>
                    <div class="text-danger">{{errors.password}}</div>
                </div>
                <div class=" mb-3">
                    <label for="exampleInputPass" class="form-label">Xác nhận mật khẩu</label>
                    <input type="text" v-model="confirmpassword" class="form-control rounded-4" style="height: 50px;" id="exampleInputPass"
                        aria-describedby="Password" required>
                    <div class="text-danger">{{errors.confirmpassword}}</div>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Vai trò</label>
                    <select v-model="role" class="form-select rounded-4" style="height: 50px;" id="role">
                        <option value="user">Người dùng thường</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                    <div class="text-danger">{{errors.role}}</div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label for="exampleCheck1">Bằng cách tạo tài khoản, bạn đồng ý với <u>Điều khoản</u> của chúng tôi cũng
                        như đã đọc và thừa nhận <u>Tuyên bố về quyền riêng tư toàn cầu</u>.</label>
                </div>
                <button type="submit" class="btn btn-danger ps-4 pe-4 rounded-5" style="height: 50px;"><i
                        class="fa-solid fa-spin "><i class="fa-solid fa-bounce "><i
                                class="fa-solid fa-circle-plus fa-shake"></i> </i></i> Đăng kí</button><br>
                <br>
                
            </form>
        </div>

</template>