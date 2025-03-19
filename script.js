const wrapper = document.querySelector(".wrapper"),
    form = wrapper.querySelector(".form"),
    input = wrapper.querySelector(".form input"),
    btn = wrapper.querySelector(".form button"),
    img = wrapper.querySelector(".qr-code img");
let currentValueInput;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = input.value.trim();

    if (!inputValue || inputValue === currentValueInput) return;
    currentValueInput = inputValue;

    btn.textContent = "Идет создание QR-кода";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;

    img.addEventListener("load", () => {
        wrapper.classList.add("active");
        btn.textContent = "Сгенерировать QR-код"
    });
    img.addEventListener("error", () =>{
        alert("ОШИБКА. Попробуйте как-нибудь в другой раз");
        location.reload();
    });
    input.addEventListener('input', function() {
        if(!this.value.trim() && wrapper.classList.contains("active")) {
            wrapper.classList.remove("active");
        }
    })
})

 