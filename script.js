// Ekran Karşılaştırması Değiştirme (Normal vs Wide)
function switchView(view) {
    const wideBox = document.getElementById('view-wide');
    const normalBox = document.getElementById('view-normal');
    const buttons = document.querySelectorAll('.toggle-btn');

    if (view === 'wide') {
        wideBox.classList.add('active');
        normalBox.classList.remove('active');
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    } else {
        normalBox.classList.add('active');
        wideBox.classList.remove('active');
        buttons[1].classList.add('active');
        buttons[0].classList.remove('active');
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

// Modal (Satın Alma Popup)
function openModal(id) {
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
