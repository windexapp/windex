// ==========================================
// 1. ANİMASYONLU AÇILIŞ EKRANI (PRELOADER)
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1200);
});

// ==========================================
// 2. SÜRÜKLENEBİLİR YÜZEN TELEGRAM BALONU
// ==========================================
const dragBubble = document.getElementById('draggable-telegram');
let isDragging = false;
let hasMoved = false;
let startX, startY, initialX, initialY;

function startDrag(e) {
    isDragging = true;
    hasMoved = false;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    
    const rect = dragBubble.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;

    dragBubble.style.transition = 'none';
}

function doDrag(e) {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved = true;
    }

    let newX = initialX + deltaX;
    let newY = initialY + deltaY;

    // Ekran sınırlarını koru
    const maxX = window.innerWidth - dragBubble.offsetWidth;
    const maxY = window.innerHeight - dragBubble.offsetHeight;

    newX = Math.max(10, Math.min(newX, maxX - 10));
    newY = Math.max(10, Math.min(newY, maxY - 10));

    dragBubble.style.left = newX + 'px';
    dragBubble.style.top = newY + 'px';
    dragBubble.style.bottom = 'auto';
    dragBubble.style.right = 'auto';
}

function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    dragBubble.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    
    // Sürüklenme olmadıysa Telegram'ı aç
    if (!hasMoved) {
        window.open('https://t.me/senintelegramlinkin', '_blank');
    }
}

dragBubble.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', doDrag);
window.addEventListener('mouseup', stopDrag);

dragBubble.addEventListener('touchstart', startDrag, { passive: true });
window.addEventListener('touchmove', doDrag, { passive: true });
window.addEventListener('touchend', stopDrag);

// ==========================================
// 3. FARE TAKİP IŞIĞI EFEKTİ
// ==========================================
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

// ==========================================
// 4. SAYFA KAYDIRMA ANİMASYONLARI (REVEAL)
// ==========================================
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('reveal-active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// ==========================================
// 5. BANKA SEÇİMİ VE MODAL MANTIĞI
// ==========================================
const bankData = {
    papara: {
        title: "PAPARA İLE ÖDEME",
        iban: "1234567890",
        owner: "WINDEX MEDIA PAPARA"
    },
    ziraat: {
        title: "ZİRAAT BANKASI İLE ÖDEME",
        iban: "TR56 0001 0000 0000 1234 5678 90",
        owner: "WINDEX TEKNOLOJİ"
    },
    garanti: {
        title: "GARANTİ BBVA İLE ÖDEME",
        iban: "TR62 0006 2000 0000 9876 5432 10",
        owner: "WINDEX TEKNOLOJİ"
    },
    enpara: {
        title: "ENPARA / QNB İLE ÖDEME",
        iban: "TR11 0011 1000 0000 5555 4444 33",
        owner: "WINDEX MEDIA"
    },
    vakif: {
        title: "VAKIFBANK İLE ÖDEME",
        iban: "TR15 0001 5000 0000 7777 8888 99",
        owner: "WINDEX TEKNOLOJİ"
    }
};

function generateUniqueRef() {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const refElement = document.getElementById('dynamicRefNumber');
    if (refElement) {
        refElement.textContent = `WND-${randomCode}`;
    }
}

function openModal(id) {
    generateUniqueRef();
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
    modalGoBack(); // İlk açılışta banka seçim adımını göster
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
}

function selectBank(bankKey) {
    const bank = bankData[bankKey];
    if (!bank) return;

    document.getElementById('selectedBankTitle').innerHTML = `<i class="fa-solid fa-university"></i> ${bank.title}`;
    document.getElementById('selectedIban').textContent = bank.iban;
    document.getElementById('selectedOwner').textContent = bank.owner;

    document.getElementById('step-bank-select').classList.remove('active-step');
    document.getElementById('step-payment-details').classList.add('active-step');
    document.querySelector('.modal-back-btn').classList.add('show');
}

function modalGoBack() {
    document.getElementById('step-payment-details').classList.remove('active-step');
    document.getElementById('step-bank-select').classList.add('active-step');
    document.querySelector('.modal-back-btn').classList.remove('show');
}

window.onclick = function(e) {
    const modal = document.getElementById('buyModal');
    if (e.target === modal) {
        closeModal('buyModal');
    }
};

// SSS Accordion
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

// Kopyalama Fonksiyonu
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
