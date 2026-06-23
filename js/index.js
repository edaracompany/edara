// ================================================================
// EDARA - جافاسكريبت متكامل
// ================================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. شاشة التحميل
    // ============================================================
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    if (loadingScreen) {
        body.classList.add('loading');
        
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            body.classList.remove('loading');
            body.classList.add('loaded');
            
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // ============================================================
    // 2. قائمة الجوال
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    function toggleMobileMenu() {
        if (!mobileMenu || !overlay) return;
        
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        const spans = hamburger ? hamburger.querySelectorAll('span') : [];
        if (mobileMenu.classList.contains('active')) {
            if (spans.length === 3) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            }
            document.body.style.overflow = 'hidden';
        } else {
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ============================================================
    // 3. تأثير النافبار عند التمرير
    // ============================================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.7rem 5%';
                navbar.style.boxShadow = '0 4px 20px rgba(138, 43, 226, 0.2)';
            } else {
                navbar.style.padding = '1rem 5%';
                navbar.style.boxShadow = '0 2px 20px rgba(138, 43, 226, 0.15)';
            }
        }
    });

    // ============================================================
    // 4. محول العملات
    // ============================================================
    const currencyToggle = document.getElementById('currencyToggle');
    const currencyDropdown = document.getElementById('currencyDropdown');
    const currentSymbol = document.getElementById('currentCurrencySymbol');

    if (currencyToggle && currencyDropdown && currentSymbol) {
        currencyToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            currencyDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            currencyDropdown.classList.remove('active');
        });

        document.querySelectorAll('.currency-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.currency-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                const symbol = this.dataset.symbol;
                currentSymbol.textContent = symbol;
                currencyDropdown.classList.remove('active');
                
                showNotification('تم تغيير العملة إلى ' + this.querySelector('span:nth-child(2)').textContent, 'success');
            });
        });
    }

    // ============================================================
    // 5. نظام تسجيل الدخول وإنشاء الحساب
    // ============================================================
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authSection = document.getElementById('contact');

    let currentUser = null;

    function switchAuthTab(tabName) {
        if (authTabs.length) {
            authTabs.forEach(t => t.classList.remove('active'));
            const targetTab = document.querySelector(`.auth-tab[data-tab="${tabName}"]`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        }
        
        if (loginForm && signupForm) {
            loginForm.classList.toggle('active', tabName === 'login');
            signupForm.classList.toggle('active', tabName === 'signup');
        }
    }

    if (authTabs.length) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                switchAuthTab(tabName);
            });
        });
    }

    document.querySelectorAll('.switch-tab').forEach(link => {
        link.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchAuthTab(tabName);
            scrollToAuthSection();
        });
    });

    // ============================================================
    // 6. أزرار تسجيل الدخول وإنشاء حساب في النافبار
    // ============================================================
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    function scrollToAuthSection() {
        if (authSection) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = authSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (window.location.hash === '#login' || window.location.hash === '#signup') {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (currentPage === 'index.html' || currentPage === '') {
                switchAuthTab('login');
                scrollToAuthSection();
            } else {
                window.location.href = 'index.html#login';
            }
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (currentPage === 'index.html' || currentPage === '') {
                switchAuthTab('signup');
                scrollToAuthSection();
            } else {
                window.location.href = 'index.html#signup';
            }
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    // ============================================================
    // 7. أزرار تسجيل الدخول في القائمة الجانبية
    // ============================================================
    document.querySelectorAll('.mobile-auth .btn-login').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (currentPage === 'index.html' || currentPage === '') {
                switchAuthTab('login');
                scrollToAuthSection();
            } else {
                window.location.href = 'index.html#login';
            }
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    document.querySelectorAll('.mobile-auth .btn-register').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            if (currentPage === 'index.html' || currentPage === '') {
                switchAuthTab('signup');
                scrollToAuthSection();
            } else {
                window.location.href = 'index.html#signup';
            }
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ============================================================
    // 8. معالجة النماذج
    // ============================================================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            const password = this.querySelector('input[type="password"]')?.value;
            
            if (!email || !password) {
                showNotification('يرجى ملء جميع الحقول', 'error');
                return;
            }
            
            // حفظ بيانات المستخدم
            currentUser = {
                name: email.split('@')[0] || 'مستخدم',
                email: email,
                phone: '05xxxxxxxx'
            };
            localStorage.setItem('edara_user', JSON.stringify(currentUser));
            
            showNotification('تم تسجيل الدخول بنجاح! 🎉', 'success');
            updateAuthButtons();
            this.reset();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input, select');
            let isValid = true;
            let userData = {};
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    setTimeout(() => input.style.borderColor = '', 2000);
                } else {
                    const label = input.closest('.form-group')?.querySelector('label')?.textContent?.trim() || '';
                    if (label.includes('الاسم')) userData.name = input.value;
                    if (label.includes('البريد')) userData.email = input.value;
                    if (label.includes('الهاتف')) userData.phone = input.value;
                }
            });
            
            if (!isValid) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            currentUser = userData;
            localStorage.setItem('edara_user', JSON.stringify(currentUser));
            
            showNotification('تم إنشاء الحساب بنجاح! 🎉', 'success');
            updateAuthButtons();
            this.reset();
        });
    }

    // تحديث أزرار المصادقة بعد تسجيل الدخول
    function updateAuthButtons() {
        const user = JSON.parse(localStorage.getItem('edara_user'));
        if (user) {
            currentUser = user;
            document.querySelectorAll('.auth-buttons .btn-login, .mobile-auth .btn-login').forEach(btn => {
                btn.textContent = '👤 ' + user.name;
                btn.href = '#';
                btn.style.background = 'rgba(145, 2, 146, 0.1)';
                btn.style.borderColor = '#910292';
            });
            document.querySelectorAll('.auth-buttons .btn-register, .mobile-auth .btn-register').forEach(btn => {
                btn.textContent = 'تسجيل خروج';
                btn.href = '#';
                btn.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('edara_user');
                    currentUser = null;
                    location.reload();
                };
            });
        }
    }

    // تحميل المستخدم المخزن
    function loadUser() {
        const user = JSON.parse(localStorage.getItem('edara_user'));
        if (user) {
            currentUser = user;
            updateAuthButtons();
        }
    }
    loadUser();

    // ============================================================
    // 9. نظام الإشعارات
    // ============================================================
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
        
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => notification.remove(), 400);
        });
    }

   // ============================================================
// 10. نظام النسخة المجانية
// ============================================================
document.querySelectorAll('.free-demo-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('edara_user'));
        const systemName = this.dataset.system || 'النظام';
        const fileUrl = this.dataset.file || 'files/demo.zip';
        
        if (!user) {
            showNotification('يرجى تسجيل الدخول أولاً للحصول على النسخة المجانية', 'error');
            setTimeout(() => {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                if (currentPage === 'index.html' || currentPage === '') {
                    switchAuthTab('login');
                    scrollToAuthSection();
                } else {
                    window.location.href = 'index.html#login';
                }
            }, 1500);
            return;
        }
        
        // عرض نافذة تأكيد مع بيانات المستخدم الحقيقية
        showDemoModal(user, systemName, fileUrl);
    });
});

function showDemoModal(user, systemName, fileUrl) {
    // استخدام البيانات الحقيقية من localStorage
    const userName = user.name || 'مستخدم';
    const userPhone = user.phone || 'رقم الهاتف غير مسجل';
    const userEmail = user.email || 'البريد الإلكتروني غير مسجل';
    
    const modalHTML = `
        <div class="demo-modal-overlay active" id="demoModal">
            <div class="demo-modal">
                <button class="close-modal" id="closeModal">&times;</button>
                <div class="demo-modal-icon">
                    <i class="fas fa-download"></i>
                </div>
                <h3>طلب نسخة مجانية</h3>
                <div class="demo-user-info">
                    <p><i class="fas fa-user"></i> <strong>${userName}</strong></p>
                    <p><i class="fas fa-phone"></i> ${userPhone}</p>
                    <p><i class="fas fa-envelope"></i> ${userEmail}</p>
                </div>
                <p>سيتم إرسال النسخة المجانية من <strong>${systemName}</strong> إلى بريدك الإلكتروني</p>
                <div class="btn-group">
                    <button class="btn-download" id="confirmDownload">
                        <i class="fas fa-download"></i> تأكيد الطلب
                    </button>
                    <button class="btn-cancel" id="cancelDownload">إلغاء</button>
                </div>
            </div>
        </div>
    `;
    
    const existing = document.querySelector('.demo-modal-overlay');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    const modal = document.getElementById('demoModal');
    const closeModal = document.getElementById('closeModal');
    const cancelDownload = document.getElementById('cancelDownload');
    const confirmDownload = document.getElementById('confirmDownload');
    
    function closeModalWindow() {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            const el = document.querySelector('.demo-modal-overlay');
            if (el) el.remove();
        }, 300);
    }
    
    if (closeModal) closeModal.addEventListener('click', closeModalWindow);
    if (cancelDownload) cancelDownload.addEventListener('click', closeModalWindow);
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModalWindow();
            }
        });
    }
    
    if (confirmDownload) {
        confirmDownload.addEventListener('click', function() {
            if (fileUrl) {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileUrl.split('/').pop() || 'demo.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                closeModalWindow();
                
                showNotification('جاري تحميل النسخة المجانية من ' + systemName + '... 🚀', 'success');
            }
        });
    }
}
    // ============================================================
    // 11. عد الأرقام
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length) {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-count'));
            if (!target) return;
            
            const duration = 2000;
            const steps = 60;
            const stepValue = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += stepValue;
                if (current >= target) {
                    statNumber.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(current) + '+';
                }
            }, duration / steps);
        });
    }

    // ============================================================
    // 12. ظهور البطاقات عند التمرير
    // ============================================================
    const appCards = document.querySelectorAll('.app-card');
    
    if (appCards.length) {
        appCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        function checkCardScroll() {
            appCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', checkCardScroll);
        window.addEventListener('load', checkCardScroll);
        setTimeout(checkCardScroll, 300);
    }

    // ============================================================
    // 13. ظهور العناصر الكرتونية
    // ============================================================
    const cartoonElements = document.querySelectorAll('.cartoon-element');
    
    if (cartoonElements.length) {
        cartoonElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease';
        });
        
        function checkCartoonScroll() {
            cartoonElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.1;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', checkCartoonScroll);
        window.addEventListener('load', checkCartoonScroll);
        setTimeout(checkCartoonScroll, 300);
    }

    // ============================================================
    // 14. بطاقات الخدمات
    // ============================================================
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });

    // ============================================================
    // 15. زر الانتقال للأعلى
    // ============================================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // 16. زر واتساب
    // ============================================================
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                whatsappBtn.classList.add('show');
            } else {
                whatsappBtn.classList.remove('show');
            }
        });
        
        window.addEventListener('load', function() {
            if (window.pageYOffset > 300) {
                whatsappBtn.classList.add('show');
            }
        });
    }

    // ============================================================
    // 17. تأثير 3D
    // ============================================================
    document.querySelectorAll('.app-card, .value-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = ((y / rect.height) - 0.5) * 10;
            const rotateY = ((x / rect.width) - 0.5) * -10;
            
            this.style.transform = `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================================
    // 18. تأثير Parallax
    // ============================================================
    document.addEventListener('mousemove', function(e) {
        const x = (window.innerWidth / 2 - e.clientX) / 60;
        const y = (window.innerHeight / 2 - e.clientY) / 60;
        
        document.querySelectorAll('.cartoon-element, .shape').forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 30;
            const moveX = x / speed;
            const moveY = y / speed;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // ============================================================
    // 19. التوجيه من الصفحات الداخلية
    // ============================================================
    function handleHashFromOtherPages() {
        const hash = window.location.hash;
        if (hash === '#login' || hash === '#signup') {
            setTimeout(() => {
                const authSection = document.getElementById('contact');
                if (authSection) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = authSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    const tabName = hash === '#login' ? 'login' : 'signup';
                    switchAuthTab(tabName);
                    
                    setTimeout(() => {
                        history.replaceState(null, '', window.location.pathname + window.location.search);
                    }, 100);
                }
            }, 600);
        }
    }

    handleHashFromOtherPages();

    // ============================================================
    // 20. تحديد الرابط النشط
    // ============================================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else if (href && href.includes('.html') && currentPage.includes('.html')) {
                const hrefName = href.split('/').pop();
                if (hrefName === currentPage) {
                    link.classList.add('active');
                }
            }
        });
    }

    setActiveNavLink();

    // ============================================================
    // 21. معالجة أزرار "اطلب الآن"
    // ============================================================
    document.querySelectorAll('.pricing-card-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            showNotification('جاري التوجيه إلى واتساب...', 'info');
        });
    });

    // ============================================================
    // 22. معالجة روابط "تواصل معنا"
    // ============================================================
    document.querySelectorAll('.footer-links a[href*="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#contact' || targetId === 'index.html#contact') {
                if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname === '/' || window.location.pathname === '') {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                        const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    window.location.href = 'index.html#contact';
                }
            }
        });
    });

    // ============================================================
    // 23. معالجة الروابط التي تبدأ بـ #
    // ============================================================
    document.querySelectorAll('a[href^="#"]:not(.pricing-card-button)').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname === '/' || window.location.pathname === '') {
                    return;
                } else {
                    e.preventDefault();
                    window.location.href = 'index.html' + href;
                }
            }
        });
    });

    // ============================================================
    // 24. نظام تحويل العملات
    // ============================================================
    const CURRENCY_CONFIG = {
        EGP: {
            symbol: 'ج.م',
            code: 'EGP',
            name: 'الجنيه المصري',
            rate: 1,
            flag: '🇪🇬',
            decimal: 0
        },
        SAR: {
            symbol: 'ر.س',
            code: 'SAR',
            name: 'الريال السعودي',
            rate: 0.125,
            flag: '🇸🇦',
            decimal: 0
        },
        SYP: {
            symbol: 'ل.س',
            code: 'SYP',
            name: 'الليرة السورية',
            rate: 285,
            flag: '🇸🇾',
            decimal: 0,
            showUSD: true
        }
    };

    let USD_TO_SYP = 14250;
    let currentCurrency = localStorage.getItem('edara_currency') || 'EGP';

    function updateCurrencySymbol() {
        const symbolElement = document.getElementById('currentCurrencySymbol');
        if (symbolElement) {
            const config = CURRENCY_CONFIG[currentCurrency];
            if (config) {
                symbolElement.textContent = config.symbol;
            }
        }
        
        document.querySelectorAll('.currency-option').forEach(option => {
            option.classList.toggle('active', option.dataset.currency === currentCurrency);
        });
    }

    function formatPrice(amount, fromCurrency = 'EGP') {
        if (!amount && amount !== 0) return '0';
        
        const fromRate = CURRENCY_CONFIG[fromCurrency]?.rate || 1;
        const toRate = CURRENCY_CONFIG[currentCurrency]?.rate || 1;
        const decimals = CURRENCY_CONFIG[currentCurrency]?.decimal || 0;
        
        const baseAmount = amount / fromRate;
        let converted = baseAmount * toRate;
        const config = CURRENCY_CONFIG[currentCurrency];
        
        let formatted;
        if (decimals === 0) {
            formatted = Math.round(converted).toLocaleString('ar-EG');
        } else {
            formatted = converted.toFixed(decimals).toLocaleString('ar-EG', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        }
        
        let usdValue = '';
        if (currentCurrency === 'SYP' && config.showUSD) {
            const usdAmount = converted / USD_TO_SYP;
            const usdFormatted = Math.round(usdAmount).toLocaleString('ar-EG');
            usdValue = ` <span class="usd-price">$${usdFormatted}</span>`;
        }
        
        let result = `${formatted} ${config.symbol}`;
        if (usdValue) {
            result += usdValue;
        }
        
        return result;
    }

    function updateAllPrices() {
        const priceElements = document.querySelectorAll('.price, .pricing-card-price, .subscription-option-price, [data-price]');
        
        priceElements.forEach(element => {
            let originalPrice = element.dataset.originalPrice;
            
            if (!originalPrice) {
                const text = element.textContent.trim();
                const match = text.match(/([\d,]+\.?[\d]*)/);
                if (match) {
                    originalPrice = parseFloat(match[1].replace(/,/g, ''));
                    element.dataset.originalPrice = originalPrice;
                }
            }
            
            if (originalPrice) {
                const currency = element.dataset.currency || 'EGP';
                element.innerHTML = formatPrice(parseFloat(originalPrice), currency);
            }
        });
    }

    function setCurrency(code) {
        if (!CURRENCY_CONFIG[code]) return;
        
        currentCurrency = code;
        localStorage.setItem('edara_currency', code);
        
        updateCurrencySymbol();
        updateAllPrices();
        
        const config = CURRENCY_CONFIG[code];
        let message = 'تم تغيير العملة إلى ' + config.name;
        if (code === 'SYP') {
            const rate = Math.round(USD_TO_SYP).toLocaleString('ar-EG');
            message += ` (سعر الصرف: 1$ = ${rate} ل.س)`;
        }
        showNotification(message, 'success');
    }

    function loadCurrencyAndPrices() {
        updateCurrencySymbol();
        setTimeout(updateAllPrices, 100);
    }

    document.querySelectorAll('.currency-option').forEach(option => {
        option.addEventListener('click', function() {
            const currency = this.dataset.currency;
            setCurrency(currency);
        });
    });

    loadCurrencyAndPrices();

    window.addEventListener('load', function() {
        setTimeout(updateAllPrices, 200);
    });

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(updateAllPrices, 200);
        }
    });

    console.log(' نظام تحويل العملات جاهز');
    console.log(' العملة الحالية:', currentCurrency, CURRENCY_CONFIG[currentCurrency]?.name);
    console.log(' سعر الصرف: 1$ = ' + Math.round(USD_TO_SYP).toLocaleString('ar-EG') + ' ل.س');
    console.log(' Edara | إدارة - حلول برمجية متكاملة');
    console.log(' تم تحميل الموقع بنجاح');
    console.log(' الصفحة الحالية:', window.location.pathname.split('/').pop() || 'index.html');

});