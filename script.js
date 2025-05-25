// script.js

// TÜM YAZILARINIZI BURADA YENİ FORMATLA TANIMLAYIN
const allPosts = [
    // ÖNEMLİ: Her yazı için monthShort ve dayShort alanlarını doldurmanız gerekecek.
    // Mevcut 'date' alanını referans alarak bunları oluşturabilirsiniz.
    { title: "Onbirinci Keşif", href: "onbirinci-kesif.html", date: "01 Mart 2025", monthShort: "MART", dayShort: "01" },
    { title: "Onuncu Konu", href: "onuncu-konu.html", date: "05 Mart 2025", monthShort: "MART", dayShort: "05" },
    { title: "Dokuzuncu İpucu", href: "dokuzuncu-ipucu.html", date: "15 Mart 2025", monthShort: "MART", dayShort: "15" },
    { title: "Sekizinci Blog Gönderisi", href: "sekizinci-gonderi.html", date: "25 Mart 2025", monthShort: "MART", dayShort: "25" },
    { title: "Yedinci Harika Makale", href: "yedinci-makale.html", date: "01 Nisan 2025", monthShort: "NİS", dayShort: "01" },
    { title: "Altıncı Yazı Denemesi", href: "altinci-yazi.html", date: "05 Nisan 2025", monthShort: "NİS", dayShort: "05" },
    { title: "Beşinci Yazı: Derinlemesine Bakış", href: "besinci-yazi.html", date: "10 Nisan 2025", monthShort: "NİS", dayShort: "10" },
    { title: "Zengin İçerik Örneği", href: "zengin-icerik.html", date: "20 Nisan 2025", monthShort: "NİS", dayShort: "20" },
    { title: "Markdown Sözdizimi Rehberi", href: "markdown-syntax.html", date: "01 Mayıs 2025", monthShort: "MAY", dayShort: "01" },
    { title: "Harika Bir Başka Yazı", href: "ikinci-yazi.html", date: "15 Mayıs 2025", monthShort: "MAY", dayShort: "15" },
    { title: "Adab-ı Muaşeret Nedir?", href: "adabi-muaseret-nedir.html", date: "25 Mayıs 2025", monthShort: "MAY", dayShort: "25" }
    // Daha fazla yazınız varsa buraya ekleyebilirsiniz.
    // Örnek: { title: "Yeni Yazı", href: "yeni.html", date: "19 Mayıs 2025", monthShort: "MAY", dayShort: "19" },
];

const postsPerPage = 5; // Her seferinde kaç yazı gösterileceği
let postsCurrentlyDisplayed = 0; // Şu anda kaç yazının gösterildiği

// DOM Elementleri (Sadece ilgili sayfalarda bulunacaklar)
const postListContainer = document.getElementById('postList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('searchInput');
const currentYearSpan = document.getElementById('currentYear');

// Tema Değiştirme İşlevi
if (themeToggle) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.body.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let currentBodyTheme = document.body.getAttribute('data-theme');
        if (currentBodyTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Arama İşlevi (Basit Filtreleme)
function filterPosts() {
    if (!searchInput || !postListContainer) return; // Gerekli elemanlar yoksa çık

    const filterValue = searchInput.value.toLowerCase();
    const postItems = postListContainer.getElementsByClassName('post-item');

    for (let i = 0; i < postItems.length; i++) {
        const linkElement = postItems[i].getElementsByTagName('a')[0]; // Başlık linkini al
        if (linkElement) { // Sadece başlık linki olanları dikkate al
            const txtValue = linkElement.textContent || linkElement.innerText;
            if (txtValue.toLowerCase().indexOf(filterValue) > -1) {
                postItems[i].style.display = ""; // Stili flex veya block olarak ayarlamak için CSS'e bırakalım
            } else {
                postItems[i].style.display = "none";
            }
        }
    }
}

// Arama inputuna olay dinleyici ekle
if (searchInput) {
    searchInput.addEventListener('keyup', filterPosts);
}

// Yıl Bilgisi
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// YAZILARI SAYFAYA EKLEYEN FONKSİYON (Kompakt Görünüm İçin Düzenlendi)
function renderPosts() {
    if (!postListContainer) return;

    const postsToRender = allPosts.slice(postsCurrentlyDisplayed, postsCurrentlyDisplayed + postsPerPage);

    postsToRender.forEach(post => {
        const listItem = document.createElement('li');
        // CSS ile daha iyi kontrol için sınıflar ekleyelim
        listItem.className = 'post-item post-item-compact';
        listItem.innerHTML = `
            <div class="post-date-compact">
                <span class="post-month-short">${post.monthShort}</span>
                <span class="post-day-short">${post.dayShort}</span>
            </div>
            <a href="${post.href}" class="post-title-compact">${post.title}</a>
        `;
        postListContainer.appendChild(listItem);
    });

    postsCurrentlyDisplayed += postsToRender.length;

    if (loadMoreBtn) {
        if (postsCurrentlyDisplayed >= allPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            if (allPosts.length > postsPerPage && postsCurrentlyDisplayed < allPosts.length) {
                loadMoreBtn.style.display = 'block'; // Veya CSS ile ortalamak için 'inline-block'
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }
}

// SAYFA YÜKLENDİĞİNDE İLK YAZILARI GÖSTERME (Sadece index.html için)
if (postListContainer) {
    renderPosts(); // İlk parti yazıları yükle
}

// "DAHA FAZLASINI YÜKLE" BUTONUNA TIKLANDIĞINDA (Sadece index.html için)
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', renderPosts);
}
