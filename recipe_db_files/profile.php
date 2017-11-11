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

<a href=login.php>For registered users, log in here!</a>

<?php
if(isset($_POST['submit'])){
    include "../secure/database.php";
    //echo "Got here!";
    $mysqli = new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
    if($mysqli->connect_errno){
        echo "Connection failed on line 5";
        exit();
    }
    #If we have it set to user=$_POST['name'], we could be vulnerable to a SQL injection. If you type Ali' OR SELECT * FROM PASSWORD in the username field, it would get all passwords. What we have below is a prepared statement, which is more secure.
    //echo "Got here!";
    $query = "SELECT * FROM user WHERE user=?";
    #Here we are initializing our statement. This is letting the mysqli know that we are initializing the prepared statement.
    //echo "Got here too!";
    $stmt = $mysqli->stmt_init();
    #This if statement will make sure that the SQL statement that we are trying to prepare is valid. If it is not, we will exit.
    if(!$stmt->prepare($query))
    {
        //print "Got inside the if statement.";
        exit();
    }
    #Use htmlspecialchars() to sanitize the user input.
    $username = htmlspecialchars($_POST['name']);
    $password = htmlspecialchars($_POST['pass']);
    #This process is called binding the parameter, we do it to this statement. Doing this will bind our name to "s". We chose s because it stands for string, if we used an int we could use i.
    $stmt->bind_param("s", /*$_POST['name']*/$username);
    #Finally, we will need to bind our statement. We will need to follow all of these steps every time for each prepared statement.
    $stmt->execute();
    
    #now, we assign our statement result to result. We are trying to see if our PK is filled and unique; if result is 1, we have it filled out and know we have one user stored in there. 
    $result = $stmt->get_result();
    #The number of rows is returned here, we need it to determine if the PK exists as stated in the previous comment.
    $exists = $result->num_rows;
    #Here our echo statement prints out the number of rows that exists.
    //echo "Found: " . $exists;
    /* If we wanted to print results:
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            foreach ($row as $r)
            {
                echo "$r ";
            }
            echo "<br>";
        }
    */
    #The variable exists will return a number, we want to verify whether it will be zero or one. If it's zero, we will need to insert the user into the database.
    if($exists == 0){
	#Here we are inserting the values into the database.
        $query = "INSERT INTO user VALUES(?,?)";
	#Here we initialize the statement again. You may be able to get away with not initializing it, but it is more helpful to initialize it.
        $stmt = $mysqli->stmt_init();
        if(!$stmt->prepare($query)){
            exit();
        }
	#Fortunately, someone already created a function to hash the password for us. We can call it to hash it, using the PASSWORD_DEFAULT hash (this one is the default hash, hence the name). We store the hash to convert the password back to plaintext later, I think.
        $hash = password_hash(/*$_POST['pass']*/$password, PASSWORD_DEFAULT);
	#Here we are binding the name and hash to ss.
        $stmt->bind_param("ss", /*$_POST['name']*/$username, $hash);
        $stmt->execute();
        echo "<hr>User created<br>";
    } else {
        echo "<hr>User name taken";
    }
    #We want to close our statement and mysqli objects that we opened up to reduce the load on the server. It's not neccessary, however it is pertinent.
    $stmt->close();
    $mysqli->close();
}
?>
