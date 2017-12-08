function getRecipeList() {
    $("#displayUserProfileDiv").empty();
    var searchText = document.getElementById('dishSearch').value;
    var searchText1 = searchText.split(' ').join('+');
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&limitLicense=false&number=12&offset=0&query=" + searchText1;
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        headers: {
            "X-Mashape-Key": "KPcwDkFQicmshdW99jxJxJaXyBZ1p1VgGiGjsnKS43zN1TMUJm"
        },
        success: function(data) {
            console.log(data);
            var arr = [];
            var obj = data['results'];
            var imageURL = [];
            var arr1 = [];
            var idarr = [];
            for (var x in obj) {
                arr.push(obj[x]['title']);
                imageURL.push(data['baseUri'] + obj[x]['image']);
                arr1.push(obj[x]['readyInMinutes']);
                idarr.push(obj[x]['id']);
            }
            // alert(arr1);
            $('#recipeCardContainer').empty();
            for (i = 0; i < obj.length; i++) {
                "<a href='"+"details.html?"+idarr[i]+"'>"+
                "<div class='card-image'>"+
                "<img src='"+imageURL[i]+"'/></a>"+
                "</div>"+
                "<h4 class='name'>"+arr[i]+"</h4>"+
                "<p class='time'>"+'Ready in '+ arr1[i]+ ' minutes'+"</p>"+
                "</div>");
                
                /*$('#recipeCardContainer').append("<div class='card' style='width: 20 rem;'>" +
                    "<a href='" + "details.html?" + idarr[i] + "'>" +
                    "<img class='card-img-top' src='" + imageURL[i] + "'/></a>" +
                    "<h4 class='name'>" + arr[i] + "</h4>" +
                    "<p class='time'>" + 'Ready in ' + arr1[i] + ' minutes' + "</p>" +
                    "</div>" +
                    "</div>");*/
            }
        }
    });
}

function logInToolbar() {
    $("#displayUserProfileDiv").empty();

    var Container = document.getElementById("container");
    Container.innerHTML =
        '<ul class="nav nav-pills nav-stacked"><button id="loggedInNav1" type="button" class="btn btn-default">Search Dishes</button><button id="loggedInNav2" type="button" class="btn btn-default">View Saved Dishes</button><button id="loggedInNav3" type="button" class="btn btn-default" onclick="viewProfilePage()">View Profile</button><button id="loggedInNav4" type="button" class="btn btn-default" onclick="editProfilePage()">Edit Profile</button><button id="loggedInNav5" type="button" class="btn btn-default" onclick="logoutUser()">Log Out</button></ul>'
}

function logoutUser() {
    //Unset PHP variables
    var profile3 = {
        logoutUser: true,
    }
    var template = document.getElementById("template");
    var hash = profile3;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;

    //Call PHP function to unset the variables
    var theForm, newInput1, newInput2;
    // Start by creating a <form>
    theForm = document.createElement('form');
    theForm.action = '';
    theForm.method = 'post';
    // Next create the <input>s in the form and give them names and values
    newInput1 = document.createElement('input');
    newInput1.type = 'hidden';
    newInput1.name = 'logoutSubmit';
    newInput1.value = 'logoutUser';
    //              newInput2 = document.createElement('input');
    //              newInput2.type = 'hidden';
    //              newInput2.name = 'input_2';
    //              newInput2.value = 'value 2';
    // Now put everything together...
    theForm.appendChild(newInput1);
    //theForm.appendChild(newInput2); 
    // ...and it to the DOM...
    document.getElementById('hidden_form_container_logout').appendChild(theForm);
    // ...and submit it
    theForm.submit();
    logOutButton();

}

function logOutButton() {
    //alert("Got to the logout button!");
    $("#displayUserProfileDiv").empty();

    var Container = document.getElementById("container");
    Container.innerHTML =
        '<ul class="nav nav-pills nav-stacked"><button id="generalNav1" type="button" class="btn btn-default" onclick="homePageDisplay()">Home</button><button id="generalNav2" type="button" class="btn btn-default" onclick="logInPage()">Log In</button><button id="generalNav3" type="button" class="btn btn-default" onclick="createAccountPage()">Create Account</button></ul>'
}

function homePageDisplay() {
    $("#displayUserProfileDiv").empty();

    //            logOutButton();
    var state = {
        main: true,
        login: false,
        details: false,
    }
    var template = document.getElementById("template");
    var hash = state;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;
}

function logInPage() {
    $("#displayUserProfileDiv").empty();

    var logIn = {
        loginPage: true,
    }
    var template = document.getElementById("template");
    var hash = logIn;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;
}

function createAccountPage() {
    $("#displayUserProfileDiv").empty();

    var account = {
        createAccount: true,
    }
    var template = document.getElementById("template");
    var hash = account;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;
}

function toolbarToggle(login) {
    $("#displayUserProfileDiv").empty();

    if (login == true) {
        //alert("Got inside toolbar toggle!");
        $("#display").empty();
        logInToolbar();
    } else {
        logOutButton();
    }
}

function displayRecipeDetails(title, length, imageURL, ingredients, steps) {
    $("#displayUserProfileDiv").empty();

    var details = {
        main: true,
        login: false,
        details: false,
        name: title,
        length: length,
        image: imageURL,
        ingredients: [

        ],
        steps: [

        ],
    };
    details.steps = steps;
    details.ingredients = ingredients;
    var template = document.getElementById("template");
    var hash = details;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;
}

function getRecipe() {
    $("#displayUserProfileDiv").empty();
    var id = document.location.href.split('?').pop();
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/information?includeNutrition=false/limitLicense=true";
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        headers: {
            "X-Mashape-Key": "KPcwDkFQicmshdW99jxJxJaXyBZ1p1VgGiGjsnKS43zN1TMUJm"
        },
        success: function(data) {
            console.log(data);
            var title = data['title'];

            var length = data['readyInMinutes'];

            var imageURL = data['image'];

            var steps = [];
            var step = data['analyzedInstructions'][0]['steps'];
            for (var x in step) {
                steps.push(step[x]['step']);
            }

            var ingredients = [];
            var ingredient = data['extendedIngredients'];
            for (var x in ingredient) {
                ingredients.push(ingredient[x]['originalString']);
            }
            console.log(imageURL);
            displayRecipeDetails(title, length, imageURL, ingredients, steps);
        }
    });
}

function editProfilePage() {
    $("#displayUserProfileDiv").empty();

    var profile = {
        editProfile: true,
    }
    var template = document.getElementById("template");
    var hash = profile;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;

    //                $("#editPage").submit(function(e) {
    //                    e.preventDefault();
    //                });
}

function viewProfilePage() {
    $("#displayUserProfileDiv").empty();


    var profile2 = {
        viewProfile: true,
    }
    var template = document.getElementById("template");
    var hash = profile2;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;

    //Pass info to the PHP function over POST. May not work yet.
    //                var form = document.createElement('form');
    //                form.setAttribute('method', 'post');
    //                form.setAttribute('action', '');
    //                form.setAttribute('value', 'viewProfile');
    //                form.style.display = 'hidden';
    //                document.body.appendChild(form)
    //                form.submit();
    //                var xhr = new XMLHttpRequest();
    //                xhr.open("POST", yourUrl, true);
    //                xhr.setRequestHeader('Content-Type', 'application/json');
    //                xhr.send(JSON.stringify({
    //                    value: value
    //                }));
    var theForm, newInput1, newInput2;
    // Start by creating a <form>
    theForm = document.createElement('form');
    theForm.action = '';
    theForm.method = 'post';
    // Next create the <input>s in the form and give them names and values
    newInput1 = document.createElement('input');
    newInput1.type = 'hidden';
    newInput1.name = 'btnSubmit';
    newInput1.value = 'viewProfile';
    //              newInput2 = document.createElement('input');
    //              newInput2.type = 'hidden';
    //              newInput2.name = 'input_2';
    //              newInput2.value = 'value 2';
    // Now put everything together...
    theForm.appendChild(newInput1);
    //theForm.appendChild(newInput2); 
    // ...and it to the DOM...
    document.getElementById('hidden_form_container').appendChild(theForm);
    // ...and submit it
    theForm.submit();
    //alert("Got here!");
}

function homePageDisplay() {
    // $("#displayUserProfileDiv").empty();

    //            logOutButton();
    var state = {

        main: true,
        login: false,
        details: false,
    }
    var template = document.getElementById("template");
    var hash = state;

    var output = Mustache.render(template.innerHTML, hash);

    var display = document.getElementById("display");
    display.innerHTML = output;
}