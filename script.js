/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton) {

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

}


/* ================= MOBILE MENU CLOSE ================= */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

});


/* ================= FAQ ================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* ================= COPY IBAN ================= */

const copyButton = document.getElementById("copyIban");
const ibanElement = document.getElementById("iban");

if (copyButton && ibanElement) {

    copyButton.addEventListener("click", async () => {

        const iban = ibanElement.innerText.trim();

        try {

            await navigator.clipboard.writeText(iban);

            copyButton.innerText = "Kopyalandı ✓";

            setTimeout(() => {
                copyButton.innerText = "Kopyala";
            }, 2000);

        } catch (error) {

            copyButton.innerText = "Kopyalanamadı";

            setTimeout(() => {
                copyButton.innerText = "Kopyala";
            }, 2000);

        }

    });

}


/* ================= SCROLL ANIMATION ================= */

const observerOptions = {
    threshold: 0.12
};

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    observerOptions
);


document.querySelectorAll(
    ".feature-card, .review-card, .product-info, .visual-card"
).forEach(element => {

    element.classList.add("hidden-animation");

    observer.observe(element);

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".desktop-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* ================= SMOOTH TELEGRAM CHECK ================= */

document.querySelectorAll('a[href*="t.me"]').forEach(link => {

    link.addEventListener("click", () => {

        console.log("WIDEX Telegram bağlantısı açılıyor.");

    });

});
