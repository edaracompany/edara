// ============================================================
// دعم الأسعار في صفحات الخدمات
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof updateAllPrices === 'function') {
            updateAllPrices();
        } else {
            updatePricesManually();
        }
    }, 300);
});

function updatePricesManually() {
    const priceElements = document.querySelectorAll('.pricing-card-price, .subscription-option-price, [data-price]');
    
    priceElements.forEach(element => {
        const text = element.textContent.trim();
        const match = text.match(/([\d,]+\.?[\d]*)/);
        if (match) {
            const price = parseFloat(match[1].replace(/,/g, ''));
            element.dataset.originalPrice = price;
            element.dataset.price = price;
            element.classList.add('price');
        }
    });
    
    if (typeof updateAllPrices === 'function') {
        updateAllPrices();
    }
}

// ============================================================
// تحديث سعر صرف الدولار (للمطورين)
// ============================================================

window.setUSDRate = function(newRate) {
    if (typeof updateUSDToSYP === 'function') {
        updateUSDToSYP(newRate);
    } else {
        console.warn('الدالة updateUSDToSYP غير موجودة');
    }
};

console.log(' لتحديث سعر صرف الدولار استخدم: setUSDRate(السعر)');
console.log(' مثال: setUSDRate(14500)');