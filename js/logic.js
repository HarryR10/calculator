let mainField = document.getElementById('numField');
let chainging = function () {
    mainField.value = 007;

};
let button = document.getElementById("test");
button.onclick = () => chainging();
