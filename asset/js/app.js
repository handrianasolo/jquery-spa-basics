let addLogoutButton = function() {
    $('.logout').load('templates/partials/_logout.html');
}

let addLoginButton = function () {
    $('.login').html(`
        <a href="/#login" class="btn btn-success">Login</a>
    `);
}

let USER = {};

let handleRequest = function() {

    $('.logout').html('');

    $('.login').html('');

    $.get('security.php', function(response) {
        response = JSON.parse(response);

        if (response.user) {
            USER['security'] = response.user;
            addLogoutButton();
        }

        if (!response.user){
            addLoginButton();
        }

        let page = '';

        if (window.location.hash === "") {
            page = 'homepage';
        }

        if (window.location.hash !== "") {
            page = window.location.hash.split('#')[1];
        }

        if (!response.user && page !== 'login') {
            window.location.hash = '#homepage';
        }

        if (response.user && page === 'login') {
            window.location.hash = '#homepage';
        }

        $('.container').load('templates/' + page + '.html', function () {
            console.info('page ' + page + ' was loaded');
        });
    })
}

handleRequest();

$(window).on('hashchange', handleRequest);

// IMPORTANT
$('body').on('SECURITY_LOGOUT', handleRequest);


