// Navbar Scroll Efekti
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Sıkça Sorulan Sorular (Accordion)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const answer = item.querySelector('.faq-answer');
        
        // Diğerlerini kapat
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        // Tıklananı aç/kapat
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Modal (Satın Alma Penceresi) İşlemleri
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Arka plan kaymasını engelle
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Kaymayı geri aç
}

// Modal dışına tıklayınca kapatma
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Kopyalama İşlemi
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = button.querySelector('i');
        icon.classList.remove('fa-copy', 'fa-regular');
        icon.classList.add('fa-check', 'fa-solid');
        
        setTimeout(() => {
            icon.classList.remove('fa-check', 'fa-solid');
            icon.classList.add('fa-copy', 'fa-regular');
        }, 2000);
    });
}
