// script.js

// TÜM YAZILARINIZI BURADA TANIMLAYIN
const allPosts = [
    { title: "Onbirinci Keşif", href: "onbirinci-kesif.html", date: "01 Mart 2025" }, // En yeni yazı en üste gelebilir (isteğe bağlı)
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
    // Daha fazla yazınız varsa buraya ekleyebilirsiniz:
    // { title: "Yeni Yazı Başlığı", href: "yeni-yazi.html", date: "GG Ay YYYY" },
];
// İsterseniz yazıları tarihe göre sıralayabilirsiniz:
// allPosts.sort((a, b) => new Date(b.date.split(' ').reverse().join('-')) - new Date(a.date.split(' ').reverse().join('-')));
// Ancak tarih formatınız "25 Mayıs 2025" ise new Date() ile doğru çalışmayabilir, özel sıralama gerekebilir ya da tarihleri YYYY-AA-GG formatında tutabilirsiniz.
// Şimdilik elle sıralı olduğunu varsayalım (en yeni en üstte veya en altta).
// Eğer en yeni en üstte olacaksa ve allPosts dizisini bu şekilde hazırladıysanız, kodumuz doğru çalışacaktır.

const postsPerPage = 5; // Her seferinde kaç yazı gösterileceği
let postsCurrentlyDisplayed = 0; // Şu anda kaç yazının gösterildiği

const postListContainer = document.getElementById('postList');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Mevcut script.js kodlarınız (tema değiştirici, arama, yıl) burada devam edecek...
// ... (Önceki kodlarınızı buraya DOKUNMADAN bırakın) ...

// Tema Değiştirme İşlevi
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if (currentTheme) {
            document.body.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                // themeToggle.textContent = '☀️'; // İkonu da değiştirebilirsiniz
            }
        } else { // Eğer local storage'da tema yoksa, sistem tercihini kontrol et
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('data-theme', 'dark');
            }
        }


        themeToggle.addEventListener('click', () => {
            let currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                // themeToggle.textContent = '🌙';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                // themeToggle.textContent = '☀️';
            }
        });

        // Arama İşlevi (Basit Filtreleme)
        function filterPosts() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toLowerCase();
            const ul = document.getElementById('postList');
            const li = ul.getElementsByClassName('post-item');

            for (let i = 0; i < li.length; i++) {
                const a = li[i].getElementsByTagName('a')[0];
                const txtValue = a.textContent || a.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }

        // Yıl Bilgisi
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Not: Bu tema değiştirme ve arama kodu diğer sayfalara (yazı sayfaları, hakkımda vb.)
        // eklenecekse, <script> kısmını her HTML dosyasına kopyalamanız veya
        // harici bir .js dosyasına alıp her sayfadan çağırmanız gerekir.
        // Aynı şekilde CSS kodlarını da <style> etiketleri arasında her sayfaya
        // kopyalayabilir veya harici bir style.css dosyasına alıp <link> etiketi ile bağlayabilirsiniz.
// ... (Mevcut script.js kodlarınızın sonu) ...

// YAZILARI SAYFAYA EKLEYEN FONKSİYON
function renderPosts() {
    if (!postListContainer) return; // Eğer postListContainer yoksa (örneğin hakkimda.html'de) işlem yapma

    const postsToRender = allPosts.slice(postsCurrentlyDisplayed, postsCurrentlyDisplayed + postsPerPage);

    postsToRender.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        listItem.innerHTML = `
            <a href="<span class="math-inline">\{post\.href\}"\></span>{post.title}</a>
            <span class="post-date">${post.date}</span>
        `;
        postListContainer.appendChild(listItem);
    });

    postsCurrentlyDisplayed += postsToRender.length;

    // "Daha fazlasını yükle" butonunun görünürlüğünü ayarla
    if (loadMoreBtn) {
        if (postsCurrentlyDisplayed >= allPosts.length) {
            loadMoreBtn.style.display = 'none'; // Tüm yazılar gösterildiyse butonu gizle
        } else {
            loadMoreBtn.style.display = 'block'; // Hala gösterilecek yazı varsa butonu göster
        }
    }
}

// SAYFA YÜKLENDİĞİNDE İLK YAZILARI GÖSTERME
// Bu kod, script.js dosyasının sonunda olduğu için DOM genellikle hazır olur.
// Sadece index.html'de çalışması için postListContainer varlığını kontrol ediyoruz.
if (postListContainer) {
    renderPosts(); // İlk parti yazıları yükle
}

// "DAHA FAZLASINI YÜKLE" BUTONUNA TIKLANDIĞINDA
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', renderPosts);
}

// ARAMA FONKSİYONUNU GÜNCELLEME (ÖNEMLİ)
// filterPosts fonksiyonu artık `allPosts` dizisindeki tüm yazıları değil,
// sadece o an DOM'da olan `<li>` elemanlarını filtreleyecektir.
// Bu, "minimal teknik detay" hedefimiz için kabul edilebilir bir durumdur.
// Eğer tüm yazılar arasında arama isteniyorsa, filterPosts fonksiyonunun
// `allPosts` dizisini filtreleyip `postListContainer` içeriğini yeniden oluşturması gerekir
// ki bu daha karmaşık bir değişiklik olur. Şimdilik mevcut arama yapısı korunmuştur.
// Mevcut filterPosts fonksiyonunuz şöyleydi ve dinamik eklenenler için de çalışmaya devam etmeli:
/*
function filterPosts() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('postList'); // Bu hala aynı ul
    const li = ul.getElementsByClassName('post-item'); // O an DOM'da olan li'leri alır

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName('a')[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
*/
// Eğer filterPosts fonksiyonunuz script.js'in daha önceki bir yerindeyse, dokunmanıza gerek yok.
// Sadece yukarıdaki "YAZILARI SAYFAYA EKLEYEN FONKSİYON" ve devamını en sona ekleyin.
