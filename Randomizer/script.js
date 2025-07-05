// Tunggu hingga seluruh halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // Ambil semua elemen yang kita butuhkan dari HTML
    const choicesInput = document.getElementById('choices-input');
    const generateBtn = document.getElementById('generate-btn');
    const resultDisplay = document.getElementById('result-display');
    const resetBtn = document.getElementById('reset-btn');

    // Fungsi utama untuk memilih pilihan acak
    function pickRandomChoice() {
        // 1. Ambil teks dari textarea
        const text = choicesInput.value;

        // 2. Ubah teks menjadi array, pisahkan berdasarkan baris baru
        //    dan bersihkan dari spasi kosong serta baris yang kosong
        const choices = text.split('\n')
                            .map(choice => choice.trim())
                            .filter(choice => choice !== '');

        // 3. Validasi: Jika pilihan kurang dari 2, beri tahu pengguna
        if (choices.length < 2) {
            resultDisplay.textContent = 'Masukkan minimal 2 pilihan!';
            return;
        }

        // Sembunyikan tombol utama dan reset dulu
        generateBtn.disabled = true;
        resultDisplay.textContent = '';
        resetBtn.style.display = 'none';

        // 4. Animasi "Flashing" sebelum menampilkan hasil
        const interval = setInterval(() => {
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            resultDisplay.textContent = randomChoice;
        }, 100); // Ganti pilihan setiap 100ms

        // 5. Setelah 2 detik, hentikan animasi dan tampilkan hasil final
        setTimeout(() => {
            clearInterval(interval);
            const finalChoice = choices[Math.floor(Math.random() * choices.length)];
            resultDisplay.textContent = finalChoice;
            
            // Tampilkan tombol reset dan aktifkan kembali tombol utama
            resetBtn.style.display = 'block';
            generateBtn.disabled = false;
        }, 2000); // Total durasi animasi: 2 detik
    }

    // Fungsi untuk mereset aplikasi ke keadaan semula
    function resetApp() {
        choicesInput.value = '';
        resultDisplay.textContent = '';
        resetBtn.style.display = 'none';
        choicesInput.focus();
    }

    // Tambahkan event listener ke tombol
    generateBtn.addEventListener('click', pickRandomChoice);
    resetBtn.addEventListener('click', resetApp);
});