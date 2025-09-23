document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    menuBtn.onclick = () => {
        menuBtn.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.onclick = () => {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        };
    });

    // --- LÓGICA DO MODAL DE HABILIDADES ---
    const skillCards = document.querySelectorAll('.skill-card');
    const modal = document.getElementById('skillModal');
    const modalInfo = document.getElementById('skillInfo');
    const closeBtn = document.querySelector('.close-btn');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const info = card.getAttribute('data-info');
            modalInfo.textContent = info;
            modal.style.display = 'block';
        });
    });

    // Função para fechar o modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Eventos para fechar o modal
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

});