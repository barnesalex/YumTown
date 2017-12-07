function getRecipeList() 
{
          $("#displayUserProfileDiv").empty();
          var searchText= document.getElementById('search1').value;
          var searchText1= searchText.split(' ').join('+');
          var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&limitLicense=false&number=12&offset=0&query="+searchText1;
          $.ajax({
                  type: "GET",
                  dataType: 'json',
                  cache: false,
                  url: url,
                  headers: {
                    "X-Mashape-Key": "KPcwDkFQicmshdW99jxJxJaXyBZ1p1VgGiGjsnKS43zN1TMUJm"
                  },
                  success: function(data){
                      console.log(data);
                      var arr = [];
                      var obj = data['results'];
                      var imageURL = [];
                      var arr1 =[];
                      var idarr = [];
                      for(var x in obj){
                        arr.push(obj[x]['title']);
                        imageURL.push(data['baseUri'] + obj[x]['image']);
                        arr1.push(obj[x]['readyInMinutes']);
                        idarr.push(obj[x]['id']);
                      }
                      // alert(arr1);
                      $('#demo').empty();
                      for(i = 0; i < obj.length; i++){
/////////////////////
//Place link to details.php here
//////////////////
                        $('#demo').append("<div class='card'>"+
                              "<div class='card-image'>"+
                              "<img src='"+imageURL[i]+"'/></a>"+
                              "</div>"+
                              "<h4 class='name'>"+arr[i]+"</h4>"+
                              "<p class='time'>"+'Ready in '+ arr1[i]+ ' minutes'+"</p>"+
                              "</div>");
                      }
                  }
          });
      }
    
function logInToolbar()
{
              $("#displayUserProfileDiv").empty();

    var Container = document.getElementById("container");
    Container.innerHTML =
                    '<ul class="nav nav-pills nav-stacked"><button id="loggedInNav1" type="button" class="btn btn-default">Search Dishes</button><button id="loggedInNav2" type="button" class="btn btn-default">View Saved Dishes</button><button id="loggedInNav3" type="button" class="btn btn-default" onclick="viewProfilePage()">View Profile</button><button id="loggedInNav4" type="button" class="btn btn-default" onclick="editProfilePage()">Edit Profile</button><button id="loggedInNav5" type="button" class="btn btn-default" onclick="logOutButton()">Log Out</button></ul>'
}

function logOutButton()
{
              $("#displayUserProfileDiv").empty();

        var Container = document.getElementById("container");
        Container.innerHTML =
                    '<ul class="nav nav-pills nav-stacked"><button id="generalNav1" type="button" class="btn btn-default" onclick="homePageDisplay()">Home</button><button id="generalNav2" type="button" class="btn btn-default" onclick="logInPage()">Log In</button><button id="generalNav3" type="button" class="btn btn-default" onclick="createAccountPage()">Create Account</button></ul>'
    }

function homePageDisplay()
{
              $("#displayUserProfileDiv").empty();

//            logOutButton();
            var state =
            {
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

function logInPage()
{
              $("#displayUserProfileDiv").empty();

            var logIn =
            {
                loginPage: true,
            }
            var template = document.getElementById("template");
            var hash = logIn;
        
            var output = Mustache.render(template.innerHTML, hash);
        
            var display = document.getElementById("display");
            display.innerHTML = output;
        }

function createAccountPage()
{
              $("#displayUserProfileDiv").empty();

            var account =
            {
                createAccount: true,
            }
            var template = document.getElementById("template");
            var hash = account;
        
            var output = Mustache.render(template.innerHTML, hash);
        
            var display = document.getElementById("display");
            display.innerHTML = output;
        }
        
function toolbarToggle(login) 
{
              $("#displayUserProfileDiv").empty();

            if(login == true)
            {
                logInToolbar();     
            }
            else
            {
                logOutButton();    
            }
        }

function displayRecipeDetails(title, length, imageURL, ingredients, steps) 
{
              $("#displayUserProfileDiv").empty();

            var details = 
            {
                main: true,
                login: false,
                details: false,
                name: title,
                length: length,
                image: imageURL,
                ingredients:
                [   
                    
                ],
                steps: 
                [
                    
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

function getRecipe() 
{
              $("#displayUserProfileDiv").empty();

             var id = document.location.href.split('?').pop();
            var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information?includeNutrition=false/limitLicense=true";
            $.ajax(
            {
                type: "GET",
                dataType: 'json',
                cache: false,
                url: url,
                headers: 
                {
                    "X-Mashape-Key": "KPcwDkFQicmshdW99jxJxJaXyBZ1p1VgGiGjsnKS43zN1TMUJm"
                },
                success: function(data)
                {
                    console.log(data);
                    var title = data['title'];
                            
                    var length = data['readyInMinutes'];
                            
                    var imageURL = data['image'];
                                
                    var steps=[];
                    var step = data['analyzedInstructions'][0]['steps'];
                    for(var x in step)
                    {
                        steps.push(step[x]['step']);
                    }   
                                
                    var ingredients = [];
                    var ingredient = data['extendedIngredients'];
                    for(var x in ingredient)
                    {
                        ingredients.push(ingredient[x]['originalString']);
                    }
                    console.log(imageURL);
                    displayRecipeDetails(title, length, imageURL, ingredients, steps);
                }
            });  
        }

function getRecipeList() 
{
                    $("#displayUserProfileDiv").empty();

          var searchText= document.getElementById('search1').value;
          var searchText1= searchText.split(' ').join('+');
          var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&limitLicense=false&number=12&offset=0&query="+searchText1;
          $.ajax({
                  type: "GET",
                  dataType: 'json',
                  cache: false,
                  url: url,
                  headers: {
                    "X-Mashape-Key": "KPcwDkFQicmshdW99jxJxJaXyBZ1p1VgGiGjsnKS43zN1TMUJm"
                  },
                  success: function(data){
                      console.log(data);
                      var arr = [];
                      var obj = data['results'];
                      var imageURL = [];
                      var arr1 =[];
                      var idarr = [];
                      for(var x in obj){
                        arr.push(obj[x]['title']);
                        imageURL.push(data['baseUri'] + obj[x]['image']);
                        arr1.push(obj[x]['readyInMinutes']);
                        idarr.push(obj[x]['id']);
                      }
                      // alert(arr1);
                      $('#demo').empty();
                      for(i = 0; i < obj.length; i++){
/////////////////////
//Place link to details.php here
//////////////////
                        $('#demo').append("<div class='card'>"+
                              "<div class='card-image'>"+
                              "<img src='"+imageURL[i]+"'/></a>"+
                              "</div>"+
                              "<h4 class='name'>"+arr[i]+"</h4>"+
                              "<p class='time'>"+'Ready in '+ arr1[i]+ ' minutes'+"</p>"+
                              "</div>");
                      }
                  }
          });
      }

