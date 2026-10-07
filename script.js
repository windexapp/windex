// Fareyi Takip Eden Dinamik Işık Efekti
const cursorGlow = document.getElementById('cursor-glow');

window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Her Müşteriye Benzersiz ve Özel Referans Numarası Üretici
function generateUniqueRef() {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const refElement = document.getElementById('dynamicRefNumber');
    if (refElement) {
        refElement.textContent = `WND-${randomCode}`;
    }
}

// S.S.S. Accordion Mantığı
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Modal Aç/Kapat ve Referans Kodu Oluştur
function openModal(id) {
    generateUniqueRef(); // Modal açıldığı anda kişiye özel refno atanır
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function(e) {
    const modal = document.getElementById('buyModal');
    if (e.target === modal) {
        closeModal('buyModal');
    }
};

// Kopyalama Fonksiyonu (Görsel Geri Bildirimli)
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
        button.style.color = '#00F2FE';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.color = '';
        }, 2000);
    });
}
