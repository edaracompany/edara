 // إظهار وإخفاء كلمة المرور
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const inputId = this.id.replace('-toggle', '');
                const passwordInput = document.getElementById(inputId);
                const icon = this.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
        
        // التحقق من صحة النماذج قبل الإرسال
        document.querySelectorAll('.auth-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (this.querySelector('#register-password')) {
                    // نموذج التسجيل
                    const password = document.getElementById('register-password').value;
                    const confirmPassword = document.getElementById('register-confirm-password').value;
                    
                    if (password !== confirmPassword) {
                        alert('كلمة المرور غير متطابقة');
                        return;
                    }
                    
                    if (password.length < 8) {
                        alert('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
                        return;
                    }
                    
                    alert('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
                } else {
                    // نموذج تسجيل الدخول
                    alert('تم تسجيل الدخول بنجاح!');
                }
                
                this.reset();
            });
        });