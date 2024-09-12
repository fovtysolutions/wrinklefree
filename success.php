<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Status</title>
</head>
<body>
    <center>
    <script src="https://cdn.lordicon.com/libs/frhvbuzj/lord-icon-2.0.2.js"></script>
        <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#121331,secondary:#08a88a"
            style="width:80px;height:80px">
        </lord-icon>
         <h2>Payment Received</h2>  <br>
         <p>Please wait..</p>
    </center>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    
    <?php
        if (isset($_GET['pay_id']) && $_GET['pay_id'] != 1) {
            $getit = $_GET['pay_id'];
            echo "<script>
                    $(document).ready(function() {
                        sessionStorage.setItem('mypay', '$getit');
                    });
                </script>";
        }
    ?>
    <?php
        if (isset($_GET['key_id']) && $_GET['key_id'] != 1) {
            $getit = $_GET['key_id'];
            echo "<script>
                    $(document).ready(function() {
                        sessionStorage.setItem('mypay', '$getit');
                    });
                </script>";
        }
    ?>
    <a href="javascript:void(0)" id="closeWindow">Close</a>
    <script>
        $(document).ready(function() {
            $('#closeWindow').click(function() {
                window.close();
            });
        });
    </script>
</body>
</html>