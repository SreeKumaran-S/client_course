let showNotification = function (message, types) {
    let notification = document.getElementById('notification');

    notification.textContent = message;
    notification.classList.add('show');

    if (Array.isArray(types)) {
        notification.classList.add(...types);
    } else if (typeof types === 'string') {
        notification.classList.add(types);
    }

    setTimeout(() => {
        notification.classList.remove('show');
        
        if (Array.isArray(types)) {
            notification.classList.remove(...types);
        } else if (typeof types === 'string') {
            notification.classList.remove(types);
        }     
    }, 2000);
}