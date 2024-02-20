<?php
ob_start(); // Démarre la mise en mémoire tampon de sortie

if (isset($_GET['name'])) {
    $file = urldecode($_GET['name']);
    $filepath = "articles/" . $file;
    if ($file == 'images') {
        echo "Le dossier 'images' ne peut pas être supprimé.";
    } else {
        if (file_exists($filepath)) {
            include $filepath;
            if (isset($image)) {
                $imagepath = $image;
                if (file_exists($imagepath)) {
                    unlink($imagepath);
                } else {
                    echo "Le fichier image n'existe pas à l'emplacement : " . $imagepath;
                }
            } else {
                echo "La variable image n'est pas définie dans l'article.";
            }
            unlink($filepath);
            header("Location: admin.php"); // Redirige vers la page admin
            exit; // Assurez-vous de terminer le script après une redirection
        } else {
            echo "Le fichier n'existe pas.";
        }
    }
} else {
    echo "Nom de fichier non fourni.";
}

ob_end_flush(); // Envoie la sortie au navigateur
?>


<script src="scripts/main.js"></script>