const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Stores the event
    window.deferredPrompt = event;
    // Removes hidden classes
    butInstall.classList.toggle("hidden", false);
});

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const eventPrompt = window.deferredPrompt;
    if (!eventPrompt) {
        return;
    }
    // Shows prompt and resets deferred prompts, once
    eventPrompt.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clears the prompts
    window.deferredPrompt = null;

    console.log('Installation complete', event);
});
