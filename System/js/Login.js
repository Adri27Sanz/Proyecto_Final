window.onload = init;

function init() {
    const btn = document.querySelector('.btn-primary');
    if (btn) {
        btn.addEventListener('click', login);
    }
}

function login() {
    const mail = document.getElementById('input-mail').value.trim();
    const pass = document.getElementById('input-password').value.trim();

    if (!mail || !pass) {
        alert("Por favor ingresa tu correo y contraseña.");
        return;
    }

    axios.post('http://localhost:3000/user/login', {
        cAdmin_correo: mail,
        cAdmin_contrasena: pass
    })
    .then(res => {
        if (res.data.code === 200) {
            localStorage.setItem('token', res.data.message);
            window.location.href = 'Sistema.html';
        } else {
            alert('Usuario y/o contraseña incorrectos');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Error al intentar iniciar sesión. Revisa la consola.');
    });
}