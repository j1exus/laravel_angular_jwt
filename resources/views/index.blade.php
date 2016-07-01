<!DOCTYPE html>
<html ng-app="app">
<head>
    <link rel="stylesheet" href="/css/vendor.css">
    <link rel="stylesheet" href="/css/app.css">
    <base href="/">
</head>
<body>

<div ui-view="header"></div>
<div ui-view="main"></div>
<div ui-view="footer"></div>

<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
</body>
</html>