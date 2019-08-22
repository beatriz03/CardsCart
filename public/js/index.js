$(document).ready(function () {
    $('.viewContactsDiv').hide();
    $('.addContactFormDiv').hide();
    $('.cardsDiv').hide();
    $('.cardDisplay').hide();
    $('.entireShoppingCartDiv').hide();
    $('.viewCartDiv').hide();

    // When user selects 'View my contacts'
    $('#viewContacts').click(function () {
        $('.viewContactsDiv').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
        $('.cardsDiv').hide();
        $('.viewCartDiv').hide();
        $('.welcome').hide();
        $('.cardDisplay').hide();
        $('.entireShoppingCartDiv').hide();
    });

    $('.showsContactFormBtn').click(function () {
        $('.addContactFormDiv').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    });


    // When user views categories a list appears
    $('#viewCategories').click(function () {
        $('.cardsDiv').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
        $('.viewCartDiv').hide();
        $('.entireShoppingCartDiv').hide();
        $('.addContactFormDiv').hide();
        $('.viewContactsDiv').hide();
        $('.welcome').hide();

    });


    //Clicking a catetgory clears display & shows specified list
    $('.categoryLink').click(function () {
        event.preventDefault();
        $('.cardDisplay').empty().show();

        var categoryId = $(this).attr('id');

        var searchURL = 'https://cors-anywhere.herokuapp.com/https://api.handwrytten.com/v1/cards/list/';

        searchQuery(searchURL);
        function searchQuery(searchURL) {
            $.ajax({
                url: searchURL,
                method: 'GET',
                contentType: 'application/JSON',
            }).then(function (response) {
                for (let i = 0; i < response.cards.length; i++) {
                    if (categoryId == response.cards[i].category_id) {

                        var cardDisplay = $("<div>");
                        cardDisplay.addClass("well");
                        cardDisplay.attr("id", "cardWell-" + i);

                        cardDisplay.append('<br><img src="' + response.cards[i].cover + '">');
                        cardDisplay.append('<h4> $ <span class="price">' + response.cards[i].price + '</span></h4>');
                        cardDisplay.append('<button type="button" class="btn btn-outline-success addToCartBtn">Add To Cart</button><br>');

                        $(".cardDisplay").append(cardDisplay);

                        console.log(response.cards[i].cover);
                        console.log(response.cards[i].price);
                    }
                }
            })
        }

    })

    $('#viewCart').click(function () {
        $('.entireShoppingCartDiv').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
        $('.cardsDiv').hide();
        $('.viewContactsDiv').hide();
        $('.welcome').hide();
        $('.cardDisplay').hide();
    })


let cartTotal = 0;
//Add To Cart button posts card in shopping cart
$(document).on('click', ".addToCartBtn", function () {
    $('.viewCartDiv').show();

    var img = $(this).parent().find('img')
    var url = $(img).attr('src')
    var price = $(this).parent().find('.price').text()
    console.log(url)
    console.log(price)

    var shoppingCart = $("<div>");
    shoppingCart.addClass('eachCardDiv');
    shoppingCart.append('<img src="' + url + '">');
    shoppingCart.append('<h4> $ <span class="price">' + price + '</span></h4>');
    shoppingCart.append('<button class="shoppingCartDeleteBtn btn btn-outline-success">Delete</button><br>');

    $('.viewCartDiv').append(shoppingCart);

    //Sum price of shopping cart
    numeralPrice = parseFloat(price)
    cartTotal += numeralPrice;
    console.log('$' + cartTotal);

    $('.cartSubTotalDisplay').html('Subtotal: $' + cartTotal)
    $('.cartTotalDisplay').html('Total: $' + cartTotal)
})


//To delete cards from shopping cart
$(document).on('click', '.shoppingCartDeleteBtn', function () {
    $(this).parent().remove();
    cartTotal -= numeralPrice;
    console.log('$' + cartTotal);

    $('.cartSubTotalDisplay').html('Subtotal: $' + cartTotal)
    $('.cartTotalDisplay').html('Total: $' + cartTotal)
})

//To activate modal after purchase
$(document).ready(function () {
    $('.modal').modal();
    var shippingName = $('#shippingName').val().trim();
    var shippingAddress = $('#shippingAddress').val().trim();
    var shippingCity = $('#shippingCity').val().trim();
    var shippingState = $('#shippingState').val().trim();
    var shippingState = $('#shippingState').val().trim();
    var shippingZip = $('#shippingZip').val().trim();

    var shippingSummary = '<div><h6>' + shippingName + '</h6><h6>' + shippingAddress + '</h6><h6>' + shippingCity + ' ' + shippingState + ' ' + shippingZip + '</h6></div>'

    $('.shippingSummary').append(shippingSummary);
});

//Inserts to whom sipping summary on modal
$(document).on('click', '.purchaseButton', function () {
    event.preventDefault();

    var shippingName = $('#shippingName').val().trim();
    var shippingAddress = $('#shippingAddress').val().trim();
    var shippingCity = $('#shippingCity').val().trim();
    var shippingState = $('#shippingState').val().trim();
    var shippingState = $('#shippingState').val().trim();
    var shippingZip = $('#shippingZip').val().trim();

    var shippingSummary = '<div><p>' + shippingName + '</p><p>' + shippingAddress + '</p><p>' + shippingCity + ' ' + shippingState + ' ' + shippingZip + '</p></div>'

    $('.shippingSummary').append(shippingSummary);
    console.log(shippingSummary);
})


// To delete a new contact
    $(document).on("click", "a.delete", handleContactDelete);

    var url = window.location.search;
    var contactId;

    var updating = false;

    if (url.indexOf("?contact_id=") !== -1) {
        contactId = url.split("=")[1];
        getContactData(contactId);
    }

    var contactName = $('#inputName');
    var contactBirthday = $('#inputBirthday');
    var contactAddress = $('#inputAddress');
    var contactCity = $('#inputCity');
    var contactState = $('#inputState');
    var contactZip = $('#inputZip');
    var contactNotes = $('#inputNotes');

    $('.submitContactButton').on('click', function handleFormSubmit(event) {
        event.preventDefault();

        var newContact = {
            name: contactName.val().trim(),
            birthday: contactBirthday.val().trim(),
            streetAddress: contactAddress.val().trim(),
            city: contactCity.val().trim(),
            state: contactState.val().trim(),
            zip: contactZip.val().trim(),
            additionalNotes: contactNotes.val().trim()
        }

        if (updating) {
            newContact.id = contactId;
            updateContact(newContact);
        } else {
            submitContact(newContact);
        }

    });

    //Submits a new contact 
    function submitContact(Contact) {
        $.post('/api/contacts/', Contact, function (data) {
            console.log(data);
            var addNewContact = '<div id="' + data.id + '" class="card"><div class="card-header">Who: ' + data.name + '</div>' + '<span class="list-group list-group-flush">' + '<li class="list-group-item"> Birthday: ' + data.birthday + '</li>' + '<li class="list-group-item"> Address: ' + data.streetAddress + ', ' + data.city + ', ' + data.state + ' ' + data.zip + '</li>' + '<li class="list-group-item"> Additional Notes: ' + data.additionalNotes + '</li></span><br><div><a data-id="' + data.id + '" class="delete waves-effect waves-light btn">Delete Contact</a></div><br></div></div></div>'

            $('.newCard').prepend(addNewContact);
        });
    }


    // Gets data for a contact if we're editing
    function getContactData(id) {
        $.get("/api/contacts/" + id, function (data) {
            if (data) {

                contactName.val(data.name);
                birthday.val(data.birthday);
                streetAddress.val(data.streetAddress);
                city.val(data.city);
                state.val(data.state);
                zip.val(data.zip);
                additionalNotes.val(data.additionalNotes);

                updating = true;
            }
        });
    }

    // Update a given contact, bring user to the main page when done
    function updateContact(contact) {
        $.ajax({
            method: "PUT",
            url: "/api/contacts",
            data: contact
        })
    }


// Deletes contact
function handleContactDelete() {
    var id = $(this).data('id')
    deleteContact(id);
}

function deleteContact(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/contacts/" + id,
        success: function () {
            $('#' + id).remove();
        }
    })
}



//Disables purchase button until shipping form validated
var $form = $(".shippingInfoForm");
var $purchaseButton = $(".purchaseButton");

$form.on("blur", "input", () => {
  if ($form.valid()) {
    $purchaseButton.removeAttr("disabled");   
  } else {
    $purchaseButton.attr("disabled", "disabled");
  }
});


//Validation for addContact Form & shipping Form
jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});
$.validator.addMethod( "stateUS", function( value, element, options ) {
    var isDefault = typeof options === "undefined", caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive, includeTerritories = ( isDefault || typeof options.includeTerritories === "undefined" ) ? false : options.includeTerritories, includeMilitary = ( isDefault || typeof options.includeMilitary === "undefined" ) ? false : options.includeMilitary, regex;
        if ( !includeTerritories && !includeMilitary ) {
            regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
        } else if ( includeTerritories && includeMilitary ) {
            regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
        } else if ( includeTerritories ) {
            regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
        } else {
            regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
        }
        regex = caseSensitive ? new RegExp( regex ) : new RegExp( regex, "i" );
        return this.optional( element ) || regex.test( value );
    }, "Please specify a valid state" );

$.validator.addMethod('noSpace', function(value, element) {
    return value == '' || value.trim().length != 0;
}, 'Spaces are not allowed.')
        
$.validator.addMethod( "zipcodeUS", function( value, element ) {
    return this.optional( element ) || /^\d{5}(-\d{4})?$/.test( value );
}, "ZIP Code is invalid" );

$.validator.addMethod('onlyLetters', function(value){
    return /[a-z]./i.test(value);
}, 'Please enter only letters.')

$.validator.addMethod('dateRequirement',function(value, element) {
    return value.match(/^(0?[1-9]|1[0-2])[/., -](0?[1-9]|[12][0-9]|3[0-1])[/., -](19|20)?\d{2}$/);
    }, 'Please enter a date in the format MM/DD/YYYY.')

$("form").each( function() {
    $(this).validate({  

    rules: {
        inputBirthday: {
            dateRequirement: true,
            noSpace: true
        },
        inputAddress: {
            noSpace: true
        },
        inputCity: {
            minlength: 3,
            noSpace: true,
            onlyLetters: true
        },
        inputState: {
            noSpace: true,
            stateUS: true
        },
        inputZip: {
            zipcodeUS: true,
            noSpace: true
        },
        shippingName:{
            required: true,
            noSpace: true
        },
        shippingAddress: {
            required: true,
            noSpace: true
        }, 
        shippingCity: {
            required: true,
            minlength: 3,
            noSpace: true,
            onlyLetters: true
        }, 
        shippingState: {
            required: true,
            noSpace: true,
            stateUS: true
        }, 
        shippingZip: {
            required: true,
            zipcodeUS: true,
            noSpace: true
        }
    },
    messages: {
        inputCity: {
            minlength: 'City must be a minimum of 3 letters.'
        },  
        shippingName:{
            required: 'Name is required.'
        },
        shippingAddress: {
            required: 'Street address is required.'
        }, 
        shippingCity: {
            required: 'City is required.',
            minlength: 'City must be a minimum of 3 letters.'
        }, 
        shippingState: {
            required: 'State is required.'
        }, 
        shippingZip: {
            required: 'Zip code is required.'
        }
    }


    });

  });



});