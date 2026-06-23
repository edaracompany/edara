// currency.js - نظام تحويل العملات لموقع Edara

// إعدادات العملات
const CURRENCY_CONFIG = {
    EGP: {
        symbol: 'ج.م',
        code: 'EGP',
        name: 'الجنيه المصري',
        rate: 1, // العملة الأساسية
        flag: '🇪🇬'
    },
    SAR: {
        symbol: 'ر.س',
        code: 'SAR',
        name: 'الريال السعودي',
        rate: 0.125, // مقابل الجنيه المصري (مثال)
        flag: '🇸🇦'
    },
    SYP: {
        symbol: 'ل.س',
        code: 'SYP',
        name: 'الليرة السورية',
        rate: 2500, // مقابل الجنيه المصري (مثال)
        flag: '🇸🇾',
        showUSD: true // عرض قيمة الدولار بجانبها
    }
};

// سعر الدولار مقابل الليرة السورية (يتم تحديثه يدوياً أو عبر API)
const USD_TO_SYP = 13250; // سعر تقريبي

// العملة الافتراضية
let currentCurrency = 'EGP';

// عناصر DOM للعملة
let currencySelector = null;
let currencyDisplayElements = [];

// تهيئة نظام العملات
function initCurrencySystem() {
    // إنشاء محدد العملة في النافبار
    createCurrencySelector();
    
    // تحميل العملة المخزنة
    loadSavedCurrency();
    
    // تحديث جميع الأسعار
    updateAllPrices();
}

// إنشاء محدد العملة
function createCurrencySelector() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // البحث عن مكان مناسب لوضع محدد العملة
    const navButtons = navbar.querySelector('.nav-buttonss');
    if (!navButtons) return;
    
    // إنشاء حاوية محدد العملة
    const currencyContainer = document.createElement('div');
    currencyContainer.className = 'currency-selector-container';
    currencyContainer.style.cssText = `
        display: inline-flex;
        align-items: center;
        margin-right: 15px;
        position: relative;
    `;
    
    // زر اختيار العملة
    const selectorBtn = document.createElement('button');
    selectorBtn.className = 'currency-selector-btn';
    selectorBtn.style.cssText = `
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.3s ease;
        font-weight: 600;
    `;
    selectorBtn.innerHTML = `
        <span>${CURRENCY_CONFIG.EGP.flag}</span>
        <span id="currentCurrencySymbol">ج.م</span>
        <i class="fas fa-chevron-down" style="font-size: 10px;"></i>
    `;
    selectorBtn.onmouseover = () => {
        selectorBtn.style.background = 'rgba(255,255,255,0.25)';
    };
    selectorBtn.onmouseout = () => {
        selectorBtn.style.background = 'rgba(255,255,255,0.15)';
    };
    
    // القائمة المنسدلة للعملات
    const dropdown = document.createElement('div');
    dropdown.className = 'currency-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 110%;
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        padding: 8px 0;
        min-width: 180px;
        display: none;
        z-index: 1000;
        overflow: hidden;
    `;
    
    // إضافة خيارات العملات
    Object.entries(CURRENCY_CONFIG).forEach(([code, config]) => {
        const option = document.createElement('div');
        option.className = 'currency-option';
        option.style.cssText = `
            padding: 10px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s ease;
            color: #333;
            font-size: 0.9rem;
        `;
        option.innerHTML = `
            <span>${config.flag}</span>
            <span>${config.code}</span>
            <span style="color: #999; font-size: 0.8rem;">${config.name}</span>
        `;
        option.onmouseover = () => {
            option.style.background = '#f3e8ff';
        };
        option.onmouseout = () => {
            option.style.background = 'transparent';
        };
        option.onclick = () => {
            setCurrency(code);
            dropdown.style.display = 'none';
        };
        dropdown.appendChild(option);
    });
    
    // إظهار/إخفاء القائمة
    selectorBtn.onclick = (e) => {
        e.stopPropagation();
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
    };
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });
    
    currencyContainer.appendChild(selectorBtn);
    currencyContainer.appendChild(dropdown);
    
    // إدراج محدد العملة في النافبار
    navButtons.parentNode.insertBefore(currencyContainer, navButtons);
    
    currencySelector = {
        container: currencyContainer,
        btn: selectorBtn,
        dropdown: dropdown,
        symbol: document.getElementById('currentCurrencySymbol')
    };
}

// تعيين العملة
function setCurrency(code) {
    if (!CURRENCY_CONFIG[code]) return;
    
    currentCurrency = code;
    localStorage.setItem('edara_currency', code);
    
    // تحديث الزر
    if (currencySelector) {
        const config = CURRENCY_CONFIG[code];
        currencySelector.btn.innerHTML = `
            <span>${config.flag}</span>
            <span>${config.symbol}</span>
            <i class="fas fa-chevron-down" style="font-size: 10px;"></i>
        `;
    }
    
    // تحديث جميع الأسعار
    updateAllPrices();
    
    // إطلاق حدث تغيير العملة
    document.dispatchEvent(new CustomEvent('currencyChanged', { 
        detail: { currency: code, config: CURRENCY_CONFIG[code] } 
    }));
}

// تحميل العملة المخزنة
function loadSavedCurrency() {
    const saved = localStorage.getItem('edara_currency');
    if (saved && CURRENCY_CONFIG[saved]) {
        currentCurrency = saved;
        if (currencySelector) {
            const config = CURRENCY_CONFIG[saved];
            currencySelector.btn.innerHTML = `
                <span>${config.flag}</span>
                <span>${config.symbol}</span>
                <i class="fas fa-chevron-down" style="font-size: 10px;"></i>
            `;
        }
    }
}

// تحويل العملة
function convertCurrency(amount, fromCurrency = 'EGP') {
    if (!amount && amount !== 0) return '0';
    
    const fromRate = CURRENCY_CONFIG[fromCurrency]?.rate || 1;
    const toRate = CURRENCY_CONFIG[currentCurrency]?.rate || 1;
    
    // التحويل إلى العملة الأساسية (EGP) ثم إلى العملة المطلوبة
    const baseAmount = amount / fromRate;
    const converted = baseAmount * toRate;
    
    return converted;
}

// تنسيق السعر مع العملة
function formatPrice(amount, fromCurrency = 'EGP', showSymbol = true) {
    if (!amount && amount !== 0) return '0';
    
    const converted = convertCurrency(amount, fromCurrency);
    const config = CURRENCY_CONFIG[currentCurrency];
    
    let formatted = converted.toFixed(2);
    
    // إضافة فواصل الآلاف
    formatted = Number(formatted).toLocaleString('ar-EG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    if (showSymbol) {
        formatted = `${formatted} ${config.symbol}`;
    }
    
    // إذا كانت العملة ليرة سورية، إضافة سعر الدولار
    if (currentCurrency === 'SYP' && config.showUSD) {
        const usdValue = (amount / fromRate) * USD_TO_SYP;
        const usdFormatted = Number(usdValue).toLocaleString('ar-EG', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        formatted += ` (≈ $${usdFormatted})`;
    }
    
    return formatted;
}

// تحديث جميع الأسعار في الصفحة
function updateAllPrices() {
    // البحث عن جميع العناصر التي تحتوي على أسعار
    const priceElements = document.querySelectorAll('[data-price], [data-currency]');
    
    priceElements.forEach(element => {
        const amount = parseFloat(element.getAttribute('data-price'));
        const fromCurrency = element.getAttribute('data-currency') || 'EGP';
        
        if (!isNaN(amount)) {
            const formatted = formatPrice(amount, fromCurrency);
            element.textContent = formatted;
        }
    });
    
    // تحديث العناصر التي تحمل كلاس price
    document.querySelectorAll('.price, .product-price, .service-price').forEach(element => {
        const amount = parseFloat(element.getAttribute('data-price'));
        const fromCurrency = element.getAttribute('data-currency') || 'EGP';
        
        if (!isNaN(amount)) {
            const formatted = formatPrice(amount, fromCurrency);
            element.textContent = formatted;
        }
    });
}

// دالة مساعدة لإضافة سعر قابل للتحويل
function addPriceElement(element, amount, currency = 'EGP') {
    element.setAttribute('data-price', amount);
    element.setAttribute('data-currency', currency);
    element.classList.add('price');
    
    const formatted = formatPrice(amount, currency);
    element.textContent = formatted;
    
    return element;
}

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CURRENCY_CONFIG,
        USD_TO_SYP,
        currentCurrency,
        setCurrency,
        convertCurrency,
        formatPrice,
        updateAllPrices,
        addPriceElement,
        initCurrencySystem
    };
}