<?php
namespace imbie;
require_once 'view/questionnaire.php';
session_start();

$file = $_SESSION["questions-file"];
$data = file_get_contents($file);
$data = json_decode($data);
$view = view\QuestionnaireFactory::create($data);
$page = isset($_GET["page"]) ? $_GET["page"] : 1;

$group_id = $_SESSION["group"];
$group_names = array(
  "RA" => "Radar Altimetry Group",
  "SMB" => "Surface Mass Balance Group",
  "GMB" => "Gravimetry Group",
  "IOM" => "Mass Budget Group",
  "GIA" => "Glacial Isostatic Adjustment Group",
  "TEST" => "Secret Testing Group"
);
$group_name = $group_names[$group_id];

// get path to existing answers
$user_folder = $_SESSION["user-folder"];
$temp_folder = $_SESSION["user-temp-folder"];
$answers_file = $user_folder . "/.answers.json";
// if we're in edit mode
if (file_exists($answers_file) && isset($_GET["edit"])) {
  // read the json from the answers file
  $data = file_get_contents($answers_file);
  $data = json_decode($data, true);
  // add/overwrite the values in the session
  $_SESSION = array_merge($_SESSION, $data);

  foreach($_SESSION["files"] as $q_name => &$f_data) {
    $f_data = (object) $f_data;
  }
}
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Upload Questionnaire &mdash; IMBIE 2016</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.jsdelivr.net/g/jquery@3.1.1,jquery.validation@1.15.1"></script>
    <script src="submissions.js"></script>
    <script src="session.js"></script>
    <script src="validate.js"></script>
    <script src="../modal.js"></script>
  </head>
  <body>
    <div id="main">
      <header>
        <h1><?=$group_name?></h1>
      </header>
      <?= $view->renderPage($page) ?>
    </div>
  </body>
</html>
