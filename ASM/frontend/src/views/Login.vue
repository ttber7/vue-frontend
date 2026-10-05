<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import bcrypt from 'bcryptjs';
import { userLogin } from '../stores/user';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
    errorMessage.value = '';
    const trimmedEmail = email.value.trim();
    const trimmedPassword = password.value.trim();

    if (!trimmedEmail || !trimmedPassword) {
        errorMessage.value = 'Vui lòng nhập Username/Email và Password!';
        return;
    }

    try {
        isLoading.value = true;
        const response = await fetch(`http://localhost:3000/user?email=${encodeURIComponent(trimmedEmail)}`);
        if (!response.ok) {
            throw new Error('Lỗi kết nối máy chủ');
        }
        const users = await response.json();

        if (users.length === 0) {
            errorMessage.value = 'Tài khoản không tồn tại trong hệ thống!';
            return;
        }

        const user = users[0];
        let isPasswordValid = false;

        // 1. Kiểm tra bằng mã băm bcrypt
        if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$'))) {
            try {
                isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
            } catch (err) {
                console.warn('Lỗi so sánh bcrypt:', err);
            }
        }

        // 2. Hỗ trợ mật khẩu thuần (plain text)
        if (!isPasswordValid && String(user.password) === trimmedPassword) {
            isPasswordValid = true;
        }

        if (isPasswordValid) {
            userLogin({
                email: user.email,
                role: user.role || 'user',
                fullName: user.fullname || user.fullName || user.email.split('@')[0]
            });
            
            if (user.role === 'admin') {
                router.push('/productManagement');
            } else {
                router.push('/');
            }
        } else {
            errorMessage.value = 'Mật khẩu không chính xác! Vui lòng thử lại.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'Không thể kết nối đến máy chủ Backend (Port 3000).';
    } finally {
        isLoading.value = false;
    }
};

const goToSignup = () => {
  router.push('/signup');
};

const goToForgot = () => {
  router.push('/forgot-password');
};
</script>

<template>
  <div class="blob-wrapper">
    <!-- Thông báo lỗi nếu có -->
    <div v-if="errorMessage" class="error-toast alert alert-danger shadow-sm text-center">
      <i class="bi bi-exclamation-triangle-fill me-1"></i> {{ errorMessage }}
    </div>

    <div class="blob-container">
      <div class="form">
        <div class="login-box">
          <h1>Sign in</h1>
          <form @submit.prevent="login">
            <div class="input-box">
              <input 
                type="text" 
                v-model="email" 
                placeholder="Username" 
                required 
              />
            </div>
            <div class="input-box">
              <input 
                type="password" 
                v-model="password" 
                placeholder="Password" 
                required 
              />
            </div>
            <div class="input-box btn">
              <input 
                type="submit" 
                :value="isLoading ? '...' : 'LOGIN'" 
                :disabled="isLoading" 
              />
            </div>
          </form>
        </div>
      </div>

      <div class="right">
        <div class="satelite signup" @click="goToSignup" title="Đăng ký tài khoản">
          <span>Sign up</span>
        </div>
        <div class="satelite forget" @click="goToForgot" title="Quên mật khẩu">
          <span>Forget</span>
          <span>Password</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blob-wrapper {
  min-height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 15px;
}

.error-toast {
  max-width: 420px;
  margin-bottom: 25px;
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 14px;
}

.blob-container {
  font-family: sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
}

.form {
  border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
  box-shadow:
    inset 20px 20px 20px #0000000d,
    25px 35px 20px #0000000d,
    25px 30px 30px #0000000d,
    inset -20px -20px 25px #ffffffed;
  transition: all ease 0.5s;
  position: relative;
  background: #fbfbfb;
}

.form::before {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 5%;
  height: 0;
  padding-bottom: 5%;
  left: 25%;
  top: 25%;
  transform: skew(10deg, 0deg);
  border-radius: 50%;
  opacity: 0.5;
  transition: all ease 0.5s;
  pointer-events: none;
}

.form::after {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 10%;
  height: 0;
  padding-bottom: 10%;
  left: 15%;
  top: 15%;
  transform: skew(10deg, 0deg);
  border-radius: 50%;
  opacity: 0.9;
  transition: all ease 0.5s;
  pointer-events: none;
}

.form:hover {
  border-radius: 50%;
}

.form:hover::before {
  transform: skew(0deg, 0deg) translate(50%, 10%);
}

.form:hover::after {
  transform: skew(0deg, 0deg) translate(50%, 10%);
}

/* ===== Main Blob ===== */
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 80px 60px;
}

.login-box h1 {
  color: #333;
  margin: 0;
  font-weight: 700;
  font-size: 32px;
}

.login-box form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

input {
  border: none;
}

input[type="text"],
input[type="password"] {
  background-color: transparent;
  outline: none;
  color: #333;
  font-weight: 550;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  font-size: 14px;
  color: #0000004d;
}

.input-box {
  width: 240px;
  border-radius: 25px;
  box-shadow: 
    15px 15px 10px #0000000d,
    15px 15px 10px #00000006;
  overflow: hidden;
  background: #fff;
}

.input-box input {
  font-size: 15px;
  padding: 12px 18px;
  width: 100%;
  box-sizing: border-box;
}

.input-box input[type="text"],
.input-box input[type="password"] {
  box-shadow: 
    inset 2px 5px 10px #0000001a,
    inset -2px -5px 10px #fff;
}

.input-box input[type="submit"] {
  background-color: #ff0f5d;
  color: #fff;
  box-shadow: 
    inset 2px 5px 10px #0000001a,
    15px 15px 10px #0000000d,
    15px 10px 15px #00000006;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  border-radius: 25px;
  text-align: center;
}

/* Nút LOGIN dài bằng đúng chiều rộng của ô input như hình mẫu */
.input-box.btn {
  width: 240px;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 25px;
  box-shadow: none;
  background: transparent;
}

.input-box.btn:hover {
  transform: translateY(-2px);
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}

.satelite {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  font-weight: 550;
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: all 0.35s ease;
  position: relative;
  user-select: none;
}

.satelite::before {
  content: '';
  width: 14%;
  height: 0;
  padding-bottom: 12%;
  background-color: #fff;
  opacity: 0.5;
  position: absolute;
  top: 20%;
  left: 24%;
  border-radius: 50%;
  transform: skew(-10deg, 0deg);
  transition: all 0.35s ease;
  pointer-events: none;
}

.satelite:hover {
  border-radius: 50%;
  transform: scale(1.08);
}

.satelite:hover::before {
  padding-bottom: 14%;
  left: 20%;
}

.signup {
  background-color: #01b4ff;
  border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
  box-shadow: 
    inset 10px 10px 10px #01b4ff0d,
    25px 35px 0px #01b4ff1a,
    25px 30px 30px #01b4ff1a,
    inset -10px -10px 15px #ffffff80;
  height: 80px;
  width: 80px;
  align-self: flex-end;   
}

.forget {
  width: 120px;
  height: 120px;
  background-color: #c61dff;
  border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
  box-shadow: 
    inset 10px 10px 10px #be01fe0d,
    25px 35px 20px #be01fe1a,
    25px 30px 30px #be01fe0d,
    inset -10px -10px 15px #ffffff80;
}
</style>
