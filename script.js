// script.js

// TÜM YAZILARINIZI BURADA TANIMLAYIN
const allPosts = [
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
    // Daha fazla yazınız varsa buraya ekleyebilirsiniz.
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
        const linkElement = postItems[i].getElementsByTagName('a')[0];
        if (linkElement) {
            const txtValue = linkElement.textContent || linkElement.innerText;
            if (txtValue.toLowerCase().indexOf(filterValue) > -1) {
                postItems[i].style.display = "";
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

// YAZILARI SAYFAYA EKLEYEN FONKSİYON
function renderPosts() {
    if (!postListContainer) return; // Eğer postListContainer yoksa (örneğin hakkimda.html'de) işlem yapma

    const postsToRender = allPosts.slice(postsCurrentlyDisplayed, postsCurrentlyDisplayed + postsPerPage);

    postsToRender.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        // *** DİKKAT: BURASI DÜZELTİLDİ! ***
        // Önceki kodunuzda burada bir hata vardı. Doğrusu aşağıdaki gibi olmalı:
        listItem.innerHTML = `<a href="${post.href}">${post.title}</a><span class="post-date">${post.date}</span>`;
        postListContainer.appendChild(listItem);
    });

    postsCurrentlyDisplayed += postsToRender.length;

    // "Daha fazlasını yükle" butonunun görünürlüğünü ayarla
    if (loadMoreBtn) {
        if (postsCurrentlyDisplayed >= allPosts.length) {
            loadMoreBtn.style.display = 'none'; // Tüm yazılar gösterildiyse butonu gizle
        } else {
            // Butonu sadece gerçekten daha fazla yazı varsa göster (ilk yüklemede veya sonrasında)
            if (allPosts.length > postsPerPage && postsCurrentlyDisplayed < allPosts.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none'; // Eğer toplam yazı sayısı ilk gösterimden az veya eşitse de gizle
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

// Not: Bu script.js dosyası, <script src="script.js"></script> etiketi ile
// tüm HTML sayfalarınıza (index.html, hakkimda.html, yazı sayfaları vb.) eklenebilir.
// Script içindeki kontroller (if (themeToggle) vb.) sayesinde sadece ilgili sayfada
// bulunan elementlerle ilgili kodlar çalışacaktır.
