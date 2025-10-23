document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо елементи DOM
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeBtn = document.querySelector('.close-btn');
    const saveSettingsBtn = document.getElementById('saveSettings');

    // Функція для відкриття модального вікна
    function openModal() {
        settingsModal.style.display = 'flex';
        // Завантажуємо збережені ключі API
        const openaiKey = localStorage.getItem('openaiKey') || '';
        const datKey = localStorage.getItem('datKey') || '';
        
        document.getElementById('openaiKey').value = openaiKey;
        document.getElementById('datKey').value = datKey;
    }

    // Функція для закриття модального вікна
    function closeModal() {
        settingsModal.style.display = 'none';
    }

    // Функція для збереження налаштувань
    function saveSettings() {
        const openaiKey = document.getElementById('openaiKey').value;
        const datKey = document.getElementById('datKey').value;
        
        // Зберігаємо ключі в localStorage
        localStorage.setItem('openaiKey', openaiKey);
        localStorage.setItem('datKey', datKey);
        
        // Закриваємо модальне вікно
        closeModal();
    }

    // Додаємо обробники подій
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }

    // Закриваємо модальне вікно при кліку поза ним
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            closeModal();
        }
    });
});
