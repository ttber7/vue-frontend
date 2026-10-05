import { ref } from "vue";

const email = ref<string | null>(localStorage.getItem('email') || '');
const isAuthenticated = ref<boolean>(!!email.value);
const userRole = ref<string>(localStorage.getItem('role') || 'user');
const fullName = ref<string>(localStorage.getItem('fullName') || '');

const userLogin = (userData: { email: string; role: string; fullName: string }) => {
    email.value = userData.email;
    isAuthenticated.value = true;
    userRole.value = userData.role;
    fullName.value = userData.fullName;
    
    localStorage.setItem('email', userData.email);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('fullName', userData.fullName);
}

const userLogout = () => {
    email.value = null;
    isAuthenticated.value = false;
    userRole.value = 'user';
    fullName.value = '';
    
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
}

const checkLogin = () => {
    return isAuthenticated.value;
}

const checkRole = () => {
    return userRole.value;
}

export { 
    email, 
    isAuthenticated, 
    userRole, 
    fullName,
    userLogin, 
    userLogout, 
    checkLogin, 
    checkRole 
};