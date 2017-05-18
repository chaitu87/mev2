$(function() {
    var w;
    // Setting the web worker
    function startWorker() {
        if (typeof(Worker) !== "undefined") {
            // Yes! Web worker support!
            console.log("Web worker is on");
            if (typeof(w) == "undefined") {
                w = new Worker("/js/snippets/webworker/worker.js");
            }
            w.onmessage = function(e) {
                $('.counter').html(e.data);
            };
        } else {
            console.log("No support for web worker");
            $('.counter').html("No web worker support");
        }
    }

    function stopWorker() {
        if (typeof(w) !== "undefined") {
            w.terminate();
        }
        w = undefined;
    }

    function notifyMe(title, body) {
        console.log("checking for notifications");
        Notification.requestPermission().then(function(result) {
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                console.log("browser doen't support notifications");
            }
            // Let's check whether notification permissions have already been granted
            else if (result === "granted") {
                // If it's okay let's create a notification
                var options = {
                    body: body,
                    icon: "https://assets.theinnerhour.com/logo.png"
                }
                var notification = new Notification(title, options);
                setTimeout(notification.close.bind(notification), 3000);
                notification.onclick = function() {
                    window.location.href = "https://www.theinnerhour.com/dashboard/inbox";
                };
            }
            // Otherwise, we need to ask the user for permission
            else if (result !== 'denied' || result === "default") {
                Notification.requestPermission(function(permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var options = {
                            body: body,
                            icon: "https://assets.theinnerhour.com/logo.png"
                        }
                        var notification = new Notification(title, options);
                        setTimeout(notification.close.bind(notification), 3000);
                        notification.onclick = function() {
                            window.location.href = "https://www.theinnerhour.com/dashboard/inbox";
                        };
                    }
                });
            }
        });
    }

    $('.btn-start').on('click', function() {
        console.log("start worker");
        startWorker();
    });

    $('.btn-stop').on('click', function() {
        console.log("stop worker");
        stopWorker();
    });

    $('.btn-send-notification').on('click',function(){
        notifyMe("Hello World","This is something unique");
    });
});
