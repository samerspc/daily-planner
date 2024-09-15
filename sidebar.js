document.querySelector('.toggle-btn').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebaricon = document.querySelector('.sidebar-icon');
    const container = document.querySelector('.container');

    sidebar.classList.toggle('open');
    sidebaricon.classList.toggle('shifted');
    container.classList.toggle('centration');
});
