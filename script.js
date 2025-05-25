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