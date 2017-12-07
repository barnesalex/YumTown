<?php
    require '/home/jpjnq5/CS4830/public_html/CS4320/ProjectFiles2/SnazzyRecipes/Project Files/vendor/mustache.php-master/src/Mustache/Autoloader.php';
    
    Mustache_Autoloader::register();

    $template = file_get_contents("templates/Details.mustache");

    $hash = array(
                    'details' => array
                    (
                    'name' => 'Awesome Lasagna',
                    'steps' => array
                    (
                        'Step 1',
                        'Step 2',
                        'Step 3',
                        'Step 4',
                        'Step 5'
                    ),
                    'ingredients' => array
                    (
                        'Ingredient 1',
                        'Ingredient 2',
                        'Ingredient 3',
                        'Ingredient 4',
                        'Ingredient 5'
                    ),
                    'info' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget justo eu mi eleifend tincidunt ac ut ante. Suspendisse eget diam quam. Nam non massa mattis, suscipit erat et, vestibulum augue. Proin a consectetur turpis. Donec eu est et leo varius semper. Quisque ut maximus orci. Quisque convallis volutpat nisl. Ut vitae feugiat dui. Integer mattis fermentum consectetur. In blandit porttitor rutrum.'
                    )
                 );

    $m = new Mustache_Engine;
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        
        <title>Snazzy Recipes</title>
        
        <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
        
        <!-- Bootstrap core CSS -->
        <link href="startbootstrap-simple-sidebar-gh-pages/startbootstrap-simple-sidebar-gh-pages/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Bootstrap core JavaScript -->
        <script src="startbootstrap-simple-sidebar-gh-pages/startbootstrap-simple-sidebar-gh-pages/vendor/jquery/jquery.min.js"></script>
        <script src="startbootstrap-simple-sidebar-gh-pages/startbootstrap-simple-sidebar-gh-pages/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        
        <link rel="stylesheet" type="text/css" href="Main.css">
        
        <script src="js/mustache.js"></script>
        <script>
            function logIn()
            {
                var Container = document.getElementById("container");
                Container.innerHTML =
                    '<ul class="nav nav-pills nav-stacked"><button id="loggedInNav1" type="button" class="btn btn-default"><a data-toggle="tab" href="#SearchDishes">Search Dishes</a></button><button id="loggedInNav2" type="button" class="btn btn-default"><a data-toggle="tab" href="#ViewSavedDishes">View Saved Dishes</a></button><button id="loggedInNav3" type="button" class="btn btn-default"><a data-toggle="tab" href="#CreateNewRecipe">Create New Recipe</a></button><button id="loggedInNav4" type="button" class="btn btn-default"><a data-toggle="tab" href="#EditProfile">Edit Profile</a></button><button id="loggedInNav5" type="button" class="btn btn-default" onclick="logOut()"><a data-toggle="tab" href="#LogOut">Log Out</a></button></ul>'
            }
            
            function logOut()
            {
                var Container = document.getElementById("container");
                Container.innerHTML =
                    '<ul class="nav nav-pills nav-stacked"><button id="generalNav1" type="button" class="btn btn-default"><a data-toggle="tab" href="#home">Home</a></button><button id="generalNav2" type="button" class="btn btn-default" onclick="logIn()"><a data-toggle="tab" href="#LogIn">Log In</a></button><button id="generalNav3" type="button" class="btn btn-default"><a data-toggle="tab" href="#CreateAccount">Create Account</a></button></ul>'
            }
        </script>
    </head>
    <body>
        <div id="mySidenav" class="sidenav"> <!--https://www.w3schools.com/howto/howto_js_sidenav.asp-->
            <img id="broccoliLeft" src="broccoli.png">
            <div id ="container" class="container">      
                <ul class="nav nav-pills nav-stacked">
                    <button id="generalNav1" type="button" class="btn btn-default"><a data-toggle="tab" href="#home">Home</a></button>
                    <button id="generalNav2" type="button" class="btn btn-default" onclick="logIn()"><a data-toggle="tab" href="#LogIn">Log In</a></button>
                    <button id="generalNav3" type="button" class="btn btn-default"><a data-toggle="tab" href="#CreateAccount">Create Account</a></button>
                </ul>
            </div>
        </div>
        
        <div id="mySidenavRight" class="sidenavRight"> <!--https://www.w3schools.com/css/css_align.asp-->
            <img id="broccoliRight" src="broccoli.png">
        </div>
        
        <div class="topnav navbar-fixed top" id="myTopnav"> <!--https://www.w3schools.com/howto/howto_js_topnav.asp-->

        </div>
        
        <div id="main">
            <script id="detailsTemplate" type="text/mustache-template">
            <?php
                include("templates/Details.mustache");
            ?>
            </script>
            <h1 id="header">Snazzy Recipes</h1><br><br>
            <div style="padding-left: 100px;">
            <?php
                echo $m->render($template, $hash);
            ?>
            </div>
        </div>
    </body>
</html>