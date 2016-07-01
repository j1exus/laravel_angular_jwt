<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Verify Your Email Address</h2>

<div>
    Click here to reset your password: {{ URL::to('/password/'.$token) }}.<br/>

</div>

</body>
</html>
