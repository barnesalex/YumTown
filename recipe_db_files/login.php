<?php
    session_start();
?>

<!DOCTYPE html>
<head>
  <title>Register</title>
</head>

<body>

<form action="" method=POST>
  Name:<br>
  <input type=text name="name" required="required"> <br>
  Pass:<br>
  <input type="text" name="pass" required="required">
  <br><br>
  <input type="submit" name="submit">
</form>
    
<a href="index.php">To create an account, click here!</a>

<?php
if(isset($_POST['submit'])){
    include "../secure/database.php";
    $mysqli = new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
    if($mysqli->connect_errno){
        echo "Connection failed on line 5";
        exit();
    }
    #Do it this way so that you can get the password from the user table where the user field is equal to the user input.
    $query = "SELECT pass FROM user WHERE user=?";
    $stmt = $mysqli->stmt_init();
    if(!$stmt->prepare($query))
    {
        exit();
    }
    #Use htmlspecialchars() to sanitize the user input.
    $username = htmlspecialchars($_POST['name']);
    $password = htmlspecialchars($_POST['pass']);
    #Assign name to session variable.
    $_SESSION['user'] = /*$_POST['name'];*/ $username;
    #Assign password to session variable.
    $_SESSION['pass'] = /*$_POST['pass'];*/ $password;
    //print $_SESSION['user'] . " " . $_SESSION['pass'] . "<br>";
    $hash = password_hash(/*$_POST['pass']*/$password, PASSWORD_DEFAULT);
    $stmt->bind_param("s", /*$_POST['name']*/$username);
    $stmt->execute();
    //print $_SESSION['user'] . " " . $hash;
    $result = $stmt->get_result();
    $exists = $result->num_rows;
    //echo "Found: " . $exists;
    $r = 0;
    $password_correct = 0;
    while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            foreach ($row as $r)
            {
                $GLOBALS['dbpassword'] = $r;
            }
        }
    //echo "<br>$r<br>";
    if(password_verify(/*$_POST['pass']*/$password, $r)) {
        //print "These passwords match!";
        $password_correct = 1;
    }
    #If the username exists, this means the user can be logged in. Verify if the password is correct.
    if(/*$exists == 0 && */$password_correct == 0){
        echo "<hr>Username or password invalid, please try again.<br>";
    } else {
        //echo $password_correct;
        echo "<hr>User sucessfully logged in!";
        header("Location:profile.php");
    }
    $stmt->close();
    $mysqli->close();
}
?>
