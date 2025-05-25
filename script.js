// script.js

// --- TEMA YÖNETİMİ (TÜM SAYFALAR İÇİN KALICI VE VARSAYILAN KOYU TEMA) ---

const themeToggle = document.getElementById('theme-toggle'); // Butonu globalde yakala

// Fonksiyon: Belirtilen temayı body elementine uygular ve buton ikonunu günceller
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (themeToggle) { // Buton sayfada varsa ikonunu güncelle
        if (theme === 'dark') {
            themeToggle.textContent = '☀️'; // Koyu temada, açık tema ikonunu göster
        } else {
            themeToggle.textContent = '🌙'; // Açık temada, koyu tema ikonunu göster
        }
    }
}

// Fonksiyon: Seçilen temayı localStorage'a kaydeder
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Sayfa yüklendiğinde ilk tema belirleme ve uygulama
let initialTheme = localStorage.getItem('theme');

if (initialTheme) {
    applyTheme(initialTheme);
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        initialTheme = 'light';
    } else {
        initialTheme = 'dark'; // Varsayılan olarak koyu tema
    }
    applyTheme(initialTheme);
}

// Tema Değiştirme Butonu İşlevselliği (sadece buton sayfada varsa çalışır)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentBodyTheme = document.body.getAttribute('data-theme');
        let newTheme = currentBodyTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme); // Yeni temayı uygula (ikon da burada güncellenir)
        saveTheme(newTheme);  // Yeni temayı localStorage'a kaydet
    });
}

// --- DİĞER SCRIPTLER (Yazı listeleme, arama vb. aynı kalır) ---

const allPosts = [
    { title: "Bıraktım", href: "biraktim.html", date: "25 Mayıs 2025" },
    { title: "Onbirinci Keşif", href: "onbirinci-kesif.html", date: "01 Mart 2025" },
    { title: "Onuncu Konu", href: "onuncu-konu.html", date: "05 Mart 2025" },
    { title: "Dokuzuncu İpucu", href: "dokuzuncu-ipucu.html", date: "15 Mart 2025" },
    { title: "Sekizinci Blog Gönderisi", href: "sekizinci-gonderi.html", date: "25 Mart 2025" },
    { title: "Yedinci Harika Makale", href: "yedinci-makale.html", date: "01 Nisan 2025" },
    { title: "Altıncı Yazı Denemesi", href: "altinci-yazi.html", date: "05 Nisan 2025" },
    { title: "Beşinci Yazı: Derinlemesine Bakış", href: "besinci-yazi.html", date: "10 Nisan 2025" },
    { title: "Zengin İçerik Örneği", href: "zengin-icerik.html", date: "20 Nisan 2025" },
    { title: "Markdown Sözdizimi Rehberi", href: "markdown-syntax.html", date: "01 Mayıs 2025" },
    { title: "Harika Bir Başka Yazı", href: "ikinci-yazi.html", date: "15 Mayıs 2025" },
    { title: "Adab-ı Muaşeret Nedir?", href: "adabi-muaseret-nedir.html", date: "25 Mayıs 2025" }
];

const postsPerPage = 5;
let postsCurrentlyDisplayed = 0;

const postListContainer = document.getElementById('postList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const currentYearSpan = document.getElementById('currentYear');


function filterPosts() {
    if (!searchInput || !postListContainer) return;

    const filterValue = searchInput.value.toLowerCase();
    const postItems = postListContainer.getElementsByClassName('post-item');

    for (let i = 0; i < postItems.length; i++) {
        const linkElement = postItems[i].getElementsByClassName('post-title-compact')[0];
        if (linkElement) {
            const txtValue = linkElement.textContent || linkElement.innerText;
            if (txtValue.toLowerCase().indexOf(filterValue) > -1) {
                postItems[i].style.display = "flex";
            } else {
                postItems[i].style.display = "none";
            }
        }
    }
}

if (searchInput) {
    searchInput.addEventListener('keyup', filterPosts);
}

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

function renderPosts() {
    if (!postListContainer) return;

    const postsToRender = allPosts.slice(postsCurrentlyDisplayed, postsCurrentlyDisplayed + postsPerPage);

    postsToRender.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item post-item-compact';
        listItem.innerHTML = `
            <a href="${post.href}" class="post-title-compact">${post.title}</a>
            <span class="post-date-right-compact">${post.date}</span>
        `;
        postListContainer.appendChild(listItem);
    });

    postsCurrentlyDisplayed += postsToRender.length;

    if (loadMoreBtn) {
        if (postsCurrentlyDisplayed >= allPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            if (allPosts.length > postsPerPage && postsCurrentlyDisplayed < allPosts.length) {
                loadMoreBtn.style.display = 'inline-block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
}

if (postListContainer) {
    renderPosts();
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', renderPosts);
}
