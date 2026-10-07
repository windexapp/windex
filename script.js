// Fareyi (Mouse) Takip Eden Dinamik Işık Efekti
const cursorGlow = document.getElementById('cursor-glow');

window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Her Müşteri Satın Al Butonuna Bastığında Benzersiz Referans Numarası Üretme
function generateRandomRef() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refElement = document.getElementById('dynamicRefNumber');
    if(refElement) {
        refElement.textContent = `WND-${randomNum}`;
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

// Modal Aç/Kapat ve Referans Atama
function openModal(id) {
    generateRandomRef(); // Her açılışta yeni benzersiz refno üretir
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

// Kopyalama Butonu
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = button.querySelector('i');
        icon.className = 'fa-solid fa-check';
        setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
        }, 2000);
    });
}
