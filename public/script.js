const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector(".form");
const input = wrapper.querySelector(".form input");
const btn = wrapper.querySelector(".form button");
const img = wrapper.querySelector(".qr-code img");
let currentValueInput = "";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputValue = input.value.trim();

    // Проверка на пустое значение или повторный ввод
    if (!inputValue || inputValue === currentValueInput) return;
    currentValueInput = inputValue;

    btn.textContent = "Идет создание QR-кода";

    try {
        // Отправляем запрос к нашему API
        const response = await fetch(`/api/qr-generate?text=${encodeURIComponent(inputValue)}`);
        
        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        const data = await response.json();
        
        if (!data.qrUrl) {
            throw new Error("Не удалось получить QR-код");
        }

        // Загружаем QR-код
        img.src = data.qrUrl;

        img.addEventListener("load", () => {
            wrapper.classList.add("active");
            btn.textContent = "Сгенерировать QR-код";
        });

        img.addEventListener("error", () => {
            throw new Error("Не удалось загрузить изображение QR-кода");
        });

    } catch (error) {
        alert("ОШИБКА: " + error.message);
        btn.textContent = "Сгенерировать QR-код";
        location.reload();
    }
});

// Скрываем QR-код при очистке поля ввода
input.addEventListener('input', function() {
    if (!this.value.trim() && wrapper.classList.contains("active")) {
        wrapper.classList.remove("active");
    }
});