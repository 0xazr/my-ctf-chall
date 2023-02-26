<?php
error_reporting(0);

if (!isset($_GET["msg"])) {
    header("Location: /?msg=Welcome!");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white">
<div id="app" class="h-screen w-screen flex items-center">
    <img src="https://media.tenor.com/XjLxRaf0FXoAAAAC/sad-troll-face-depressed-trollface.gif">
    <!-- <p class="absolute left-1/2"><?php echo '<?= htmlspecialchars(isset($_GET["msg"]) ? $_GET["msg"] : "") ?>"';?></p> -->
    <p class="absolute left-1/2"><?= htmlspecialchars(isset($_GET["msg"]) ? $_GET["msg"] : "") ?></p>
</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
      }
    }
  }).mount('#app')
</script>
</body>
</html>