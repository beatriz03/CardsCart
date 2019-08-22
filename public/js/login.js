jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$.validator.addMethod('noSpace', function(value, element) {
    return value == '' || value.trim().length != 0;
}, 'Spaces are not allowed.')

$( "form" ).each( function() {
    $( this ).validate({  

    rules: {
        registerUsername: {
            required: true,
            noSpace: true,
            minlength: 6,
        },
        registerEmail: {
            required: true,
            noSpace: true,
            email: true
        },
        registerPassword: {
            required: true,
            noSpace: true,
            minlength: 6
        },
        registerPasswordVerify: {
            required: true,
            noSpace: true,
            equalTo: '#registerPassword'
        },
        loginUsername: {
            required: true,
            noSpace: true,
            minlength: 2
        },
        loginPassword: {
            required: true,
            noSpace: true,
            minlength: 6
        }
    }, 
    messages: {
        registerUsername: {
            required: 'Please enter a username.',
            minlength: 'Username must be more than 6 characters.'
        },
        registerEmail: {
            required: 'Please enter a valid email.',
            email: 'Email must include @ character.'
        },
        registerPassword: {
            required: 'Please enter a password.',
            minlength: 'Password must be more than 5 characters.'
        },
        registerPasswordVerify: {
            required: 'Please enter a password.',
            equalTo: 'Passwords do not match.'
        },        
        loginUsername: {
            required: 'Invalid username/password combination.',
            minlength: 'Username must be more than 6 characters.'
        },
        loginPassword: {
            required: 'Invalid username/password combination.',
            minlength: 'Password must be more than 6 characters.'
        }
    }
    });
  });
