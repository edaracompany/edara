// إضافة هذا الكود في بداية الملف
// إضافة تأثيرات إضافية بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء جسيمات للخلفية
    createBackgroundParticles();
    
    // إضافة تأثيرات التموج للأزرار
    addRippleEffects();
    
    // إضافة تأثيرات تتبع الماوس
    addMouseFollowEffects();
    
    // إضافة تأثيرات الظهور عند التمرير
    setupScrollAnimations();
    
    // تحسين الأنيميشنات الحالية
    enhanceExistingAnimations();
});

// إنشاء جسيمات للخلفية
function createBackgroundParticles() {
    const backgroundAnimation = document.createElement('div');
    backgroundAnimation.className = 'background-animation';
    document.body.appendChild(backgroundAnimation);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        
        // أحجام وأماكن عشوائية
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        backgroundAnimation.appendChild(particle);
    }
}

// إضافة تأثيرات التموج للأزرار
function addRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .cta-button, .submit-btn, .social-icon, .social-iconn');
    
    buttons.forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;
            
            const rect = this.getBoundingClientRect();
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - radius}px`;
            ripple.style.top = `${e.clientY - rect.top - radius}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// إضافة تأثيرات تتبع الماوس
function addMouseFollowEffects() {
    const interactiveElements = document.querySelectorAll('.app-card, .stat-card, .value-card, .team-member');
    
    interactiveElements.forEach(element => {
        element.classList.add('mouse-follow');
        
        const effect = document.createElement('div');
        effect.className = 'mouse-follow-effect';
        element.appendChild(effect);
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            effect.style.opacity = '0';
        });
        
        element.addEventListener('mouseenter', function() {
            effect.style.opacity = '1';
        });
    });
}

// إعداد تأثيرات الظهور عند التمرير
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.about-content, .services-content, .app-card, .stat-card, .value-card, .team-member, .contact-form');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in-element');
    });
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // التحقق عند التحميل وعند التمرير
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // التحقق فوراً بعد التحميل
    setTimeout(checkScroll, 500);
}

// تحسين الأنيميشنات الحالية
function enhanceExistingAnimations() {
   
    
    // تحسين تأثيرات البطاقات
    const cards = document.querySelectorAll('.app-card, .stat-card, .value-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // إضافة تأثيرات للنصوص
    const headings = document.querySelectorAll('.section-title, .app-title, .stat-number, .value-card h3');
    headings.forEach(heading => {
        heading.classList.add('text-gradient');
    });
}
// التحكم في شاشة التحميل
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // إضافة كلاس التحميل للجسم
    body.classList.add('loading');
    
    // بدء مؤقت لإخفاء شاشة التحميل بعد 3 ثوان
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        body.classList.remove('loading');
        body.classList.add('loaded');
        
        // إزالة شاشة التحميل من DOM بعد انتهاء الانتقال
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// باقي الكود الحالي
// JavaScript للتحكم في قائمة الجوال
// ...

// JavaScript للتحكم في قائمة الجوال
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // تحريك الأيقونة إلى شكل X عند التفعيل
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // إغلاق القائمة عند النقر على overlay
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // تأثير النافبار عند التمرير
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = '0.7rem 5%';
                navbar.style.boxShadow = '0 4px 20px rgba(138, 43, 226, 0.2)';
            } else {
                navbar.style.padding = '1rem 5%';
                navbar.style.boxShadow = '0 2px 20px rgba(138, 43, 226, 0.15)';
            }
        });
        // تأثير الظل للبطاقات عند التمرير
        const appCards = document.querySelectorAll('.app-card');
        
        function checkScroll() {
            appCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }
            });
        }
        
        // تهيئة البطاقات
        appCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // تأثيرات العناصر الكرتونية عند التمرير
        const cartoonElements = document.querySelectorAll('.cartoon-element');
        
        function checkCartoonScroll() {
            cartoonElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // تهيئة العناصر الكرتونية
        cartoonElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease';
        });
        
        window.addEventListener('scroll', checkCartoonScroll);
        window.addEventListener('load', checkCartoonScroll);
         // تأثير العد المتزايد للإحصاءات
        document.addEventListener('DOMContentLoaded', function() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(statNumber => {
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // مدة العد بالميلي ثانية
                const steps = 50; // عدد الخطوات
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
        });
         // إظهار وإخفاء كلمة المرور
        document.getElementById('passwordToggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
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
        
        // التحقق من صحة النموذج قبل الإرسال
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة البريد الإلكتروني
            const email = document.getElementById('email').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // التحقق من صحة رقم الهاتف
            const phone = document.getElementById('phone').value;
            const phonePattern = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
            
            if (!phonePattern.test(phone)) {
                alert('يرجى إدخال رقم هاتف صحيح');
                return;
            }
            
            // إذا كانت جميع الحقول صحيحة
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            this.reset();
        });
        // في JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // تعريف عناصر البطاقات
    const onlineStoreApp = document.getElementById('online-store-app');
    const salesSystemApp = document.getElementById('sales-system-app');
    const salesSystemAppp = document.getElementById('sales-system-appp');
    const salesSystemApppp = document.getElementById('sales-system-apppp');
    const salesSystemAppppp = document.getElementById('sales-system-appppp');
    const salesSystemApppppp= document.getElementById('sales-system-apppppp');
    const salesSystemAppppppp = document.getElementById('sales-system-appppppp');
    const salesSystemApppppppp = document.getElementById('sales-system-apppppppp');
    // وهكذا لباقي البطاقات...
    
    // إضافة أحداث النقر
    if (onlineStoreApp) {
        onlineStoreApp.addEventListener('click', function() {
            window.location.href = 'mtgr.html';
        });
        onlineStoreApp.style.cursor = 'pointer';
    }
    
    if (salesSystemApp) {
        salesSystemApp.addEventListener('click', function() {
            window.location.href = 'sales.html'; // صفحة نظام المبيعات
        });
        salesSystemApp.style.cursor = 'pointer';
    }
    if (salesSystemAppp) {
        salesSystemAppp.addEventListener('click', function() {
            window.location.href = 'Warehouses.html'; // صفحة نظام مخازن
        });
        salesSystemAppp.style.cursor = 'pointer';
    }
    if (salesSystemApppp) {
        salesSystemApppp.addEventListener('click', function() {
            window.location.href = 'Accounting.html'; // صفحة نظام محاسبة
        });
        salesSystemApppp.style.cursor = 'pointer';
    }
    if (salesSystemAppppp) {
        salesSystemAppppp.addEventListener('click', function() {
            window.location.href = 'Haircut.html'; // صفحة نظام جلاقة
        });
        salesSystemAppppp.style.cursor = 'pointer';
    }
    if (salesSystemApppppp) {
        salesSystemApppppp.addEventListener('click', function() {
            window.location.href = 'Schools.html'; // صفحة نظام مدرسة
        });
        salesSystemApppppp.style.cursor = 'pointer';
    }
    if (salesSystemAppppppp) {
        salesSystemAppppppp.addEventListener('click', function() {
            window.location.href = 'Platform.html'; // صفحة نظام منصة
        });
        salesSystemAppppppp.style.cursor = 'pointer';
    }
    if (salesSystemApppppppp) {
        salesSystemApppppppp.addEventListener('click', function() {
            window.location.href = 'HR.html'; // صفحة نظام المبيعات
        });
        salesSystemApppppppp.style.cursor = 'pointer';
    }
   
});
// وظيفة الانتقال إلى الأعلى
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// إظهار أو إخفاء الزر بناءً على موضع التمرير
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// الانتقال السلس إلى الأعلى عند النقر
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// التحكم في زر واتساب
const whatsappBtn = document.getElementById('whatsappBtn');

// إظهار أو إخفاء زر واتساب بناءً على موضع التمرير
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        whatsappBtn.classList.add('show');
    } else {
        whatsappBtn.classList.remove('show');
    }
});

// التأكد من ظهور الزر عند التحميل إذا كان المستخدم في منتصف الصفحة
window.addEventListener('load', () => {
    if (window.pageYOffset > 300) {
        whatsappBtn.classList.add('show');
    }
});