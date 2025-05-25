// script.js

// --- TEMA YÖNETİMİ (TÜM SAYFALAR İÇİN KALICI VE VARSAYILAN KOYU TEMA) ---

// Fonksiyon: Belirtilen temayı body elementine uygular
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}

// Fonksiyon: Seçilen temayı localStorage'a kaydeder
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Sayfa yüklendiğinde ilk tema belirleme ve uygulama
let initialTheme = localStorage.getItem('theme'); // Kayıtlı tema var mı?

if (initialTheme) {
    applyTheme(initialTheme); // Kayıtlı tema varsa uygula
} else {
    // Kayıtlı tema yoksa, varsayılan olarak KOYU TEMA ayarla,
    // ancak kullanıcının işletim sistemi AÇIK TEMA tercih ediyorsa açık tema yap.
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        initialTheme = 'light'; // İşletim sistemi açık modu tercih ediyorsa
    } else {
        initialTheme = 'dark'; // Varsayılan olarak veya işletim sistemi koyu modu tercih ediyorsa
    }
    applyTheme(initialTheme);
    // İsteğe bağlı: İlk yüklemede belirlenen varsayılan temayı localStorage'a kaydedebilirsiniz.
    // saveTheme(initialTheme);
    // Bu, kullanıcının bir sonraki ziyaretinde OS tercihini tekrar kontrol etmeden
    // doğrudan bu varsayılanla başlamasını sağlar, ta ki kullanıcı butona tıklayana kadar.
    // Şimdilik, kullanıcı bilinçli bir seçim yapana kadar localStorage'a yazmıyoruz.
}

// DOM Elementleri (Sadece ilgili sayfalarda bulunacaklar)
const postListContainer = document.getElementById('postList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const themeToggle = document.getElementById('theme-toggle'); // Tema değiştirme butonu
const searchInput = document.getElementById('searchInput');
const currentYearSpan = document.getElementById('currentYear');

// Tema Değiştirme Butonu İşlevselliği (sadece buton sayfada varsa çalışır)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentBodyTheme = document.body.getAttribute('data-theme');
        let newTheme = currentBodyTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme); // Yeni temayı uygula
        saveTheme(newTheme);  // Yeni temayı localStorage'a kaydet
    });
}

// --- DİĞER SCRIPTLER (Yazı listeleme, arama vb. aynı kalır) ---

// TÜM YAZILARINIZI BURADA GÜNCELLENMİŞ FORMATLA TANIMLAYIN
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
