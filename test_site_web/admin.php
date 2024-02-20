<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Sigma Racing - Accueil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">    <link rel="shortcut icon" href="images_main/favicon_sr.png" type="image/x-icon" />
    <link href="styles/styles_main.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css" />
  </head>
  <body>
  <header class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand ms-4 href=index.html" id="barde">
              <!-- ici au dessus rajt le ms-4 -->
            <picture>
              <source
              media="(max-width: 991px)"
              srcset="images_main/favicon_sr.png"        
              alt="Favicon Sigma Racing" 
              width="69px"
              height="auto" />
              <source
              media="(min-width: 992px)"
              srcset="images_main/logo-sr-admin.png"
              alt="Logo Sigma Racing" 
              width="250px"
              height="auto"
              class="favc" />
              <img src="images_main/logo-sr-admin.png" />
             </picture>
            </a>

            <button class="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active ms-4" aria-current="page" href="accueil/index.html">Accueil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active ms-4" aria-current="page" href="actualites/actualites.php">Actualités</a>
                </li>
                <!--la navbar glissante là-->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle ms-4"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sigma Racing Team
                  </a>
                  <!--dropdown menu-->
                  <ul class="dropdown-menu ms-4 me-4 ">
                    <li><a class="dropdown-item " href="sigma_racing_team/presentation.html">Qui sommes nous ?</a></li>
                    <li><a class="dropdown-item " href="sigma_racing_team/partenaires.html">Nos partenaires</a></li>
                    <li><a class="dropdown-item " href="sigma_racing_team/sigma_clermont.html">Sigma Clermont</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item " href="sigma_racing_team/contact.html">Nous contacter</a></li>
                  </ul>
                </li>
                <a class="nav-link active ms-4" aria-current="page" href="fs.html">Formula student</a>
                <a class="nav-link active ms-4" aria-current="page" href="rallye.html">Rallye</a>
                <a class="nav-link active ms-4" aria-current="page" href="admin.php">Admin</a>
                </li>
              </ul>
              <form class="d-flex ms-4 me-4" role="search">
                <input class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">
                  <i class="bi bi-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                  </i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <div class="souscont">
        <div class="blur-background"></div>
          <div class="container">
            <h4 class="rappeldepage ms-4">Espace admin.
            </h4>
          </div>
        </div>
      </div>

  <div class="bloc_main">
    <main class="container">
      <!-- formulaire-container espace -->


      <h2 class="mt-5"> Modifier la section Actualités </h2>
      <div class="accordion mb-5 mt-1" id="accordionExample">

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Ajouter un article
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <?php
              if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $title = $_POST['title'];
                $content = $_POST['content'];

                // Vérifie si le fichier a été téléchargé sans erreur
                if ($_FILES['image']['error'] == 0) {
                    $image = 'articles/images/' . $_FILES['image']['name'];
                    $image_article = 'images/' . $_FILES['image']['name'];
                    move_uploaded_file($_FILES['image']['tmp_name'], $image);
                } else {
                    $image = 'articles/images/favicon_sr.png';
                    $image_article = 'images/favicon_sr.png' . $_FILES['image']['name'];
                }
                $header = file_get_contents('header.php');
                $footer = file_get_contents('footer.php');

                $fileContent = "<?php\n\$title = '$title';\n\$image = '$image';\n\$content = '$content';\n?>";
                $fileContent .= $header . "\n";
                // $fileContent .= "<img src=\"$image_article\" alt=\"$title\">\n";

                $fileContent .= "
                <main class=\"container\"> 
                  <div class=\"container mt-0\">
                    <div class=\"row\" >
                      <div class=\"container mt-4 mb-4\">
                        <div class=\"l-md-4\">
                          <H1>$title</H1>
                        </div>
          
                        <figure class=\"figure\">
                          <img src=\"$image_article\" class=\"figure-img img-fluid rounded\" alt=\"$title\">
                        </figure>
                          
                        <div class=\"d-flex justify-content-center\">
                          <div class=\"article_content\">
                            <p> $content </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>";

                // $fileContent .= "<div>$content</div>\n";
                $fileContent .= $footer;

                file_put_contents("articles/$title.php", $fileContent);
                echo 'L\'article a été créé avec succès !';
              }?>

              <form method="POST" enctype="multipart/form-data">
              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Titre :</label>
                  <input class="form-control" type="text" id="exampleFormControlInput1" name="title">
                  </div>

                  <div class="mb-3">
                  <label for="image" class="form-label">Image :</label>
                  <input class="form-control" type="file" id="image" name="image">
                  </div>

                  <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Contenu</label>
                  <textarea class="form-control" type="text" id="exampleFormControlTextarea1" rows="3" name="content"></textarea>
                  </div>
                  <form class="row g-3">

                  <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">Créer l'article</button>
                  </div>
              </form>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Modifier ou supprimer un article
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">

              <?php
              $dir = 'articles/';
              $files = array_diff(scandir($dir), array('..', '.'));

              foreach ($files as $file) {
                  echo '<div>';
                  echo '<h6>' . $file . '</h6>';
                  echo '<a href="delete.php?name=' . urlencode($file) . '" onclick="return confirmDelete()">Supprimer</a>';
                  echo '</div>';}
              ?>

            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Créer une signature
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              
              <h3 class="mb-3">Formulaire de génération de signature d'e-mail</h3>

              <form id="signatureForm">

                <!-- <div class="mb-3">
                  <label for="loginZimbra" class="form-label">Login Zimbra :</label>
                  <input type="text" class="form-control" id="loginZimbra" placeholder="jmichel" name="loginZimbra" oninput="genererSignature()">
                </div> -->
                <div class="mb-3">
                  <label for="nom" class="form-label">Nom PRENOM</label>
                  <input type="text" class="form-control" id="nom" placeholder="Jean MICHEL" name="nom" oninput="genererSignature()">
                </div>
                <div class="mb-3">
                  <label for="detail1" class="form-label">Détail 1</label>
                  <input type="text" class="form-control" id="detail1" placeholder="Membre de l'association" name="detail1" oninput="genererSignature()">
                </div>
                <div class="mb-3">
                  <label for="detail2" class="form-label">Détail 2</label>
                  <input type="text" class="form-control" id="detail2" placeholder="Pôle Nord" name="detail2" oninput="genererSignature()">
                </div>
                <div class="mb-3">
                  <label for="telephone" class="form-label">Téléphone</label>
                  <input type="text" class="form-control" id="telephone" placeholder="+33(0)6 88 88 88 88" name="telephone" oninput="genererSignature()">
                </div>
              </form>

              <h3 class="mb-3">Prévisualisation de la signature :</h3>
              <div id="signature"></div>

              <!-- Zone cachée pour stocker le code HTML de la signature -->
              <input type="hidden" id="htmlCode">


              <h3 class="mt-3">Implémenter dans Zimbra</h3>
              <h6> 1 - Saisissez votre login Zimbra (=identifiant) :</h6>

              <form id="signatureForm">
                <div class="row">
                  <div class="col-6 ms-3 mb-3 mt-0">
                    <label for="loginZimbra" class="form-label"></label>
                    <input type="text" class="form-control" id="loginZimbra" placeholder="jmichel" name="loginZimbra" oninput="genererSignature()">
                  </div>
                </div>
              </form>

              <h6> 2 - Enregistrez ces fichiers images de votre signature (Sur chaque item, clic-droit, puis  <code>enregistrer le lien sous...</code>).</h6>
              <ul>
                <li>
                  <a href="img_signature/logo-sr.png"> Logo Sigma Racing </a>
                </li>
                <li>
                  <a href="img_signature/instagram-sr.png"> Logo Instagram</a>
                </li>
                <li>
                  <a href="img_signature/facebook-sr.png"> Logo Facebook </a>
                </li>
                <li>
                  <a href="img_signature/linkedin-sr.png"> Logo LinkedIn </a>
                </li>
                <li>
                  <a href="img_signature/ligne-separatrice.png"> Ligne verticale </a>
                </li>
              </ul>

              <!-- ancien bouton copier -->

              <h6 class="mt-3 mb-3"> 3 - Rendez-vous sur votre messagerie :</h6>
              <ul>
                <li class="mb-2">
                  Rendez-vous sur l'application web classique (icone "roue dentée" en haut à droite) </br>
                  Puis, allez dans le Porte-documents
                  <!-- Sur le client web "modern", allez dans l'onglet "malette" </br>
                  ou </br>
                  Sur l'application web classique, allez dans le Porte-documents -->
                </li>
                <li class="mb-2">
                  Uploadez <b>tous</b> les fichiers images précédements enregistrés en cliquant sur "uploader le fichier" </br>
                  <!-- <i>Sur le client web "modern", cliquez sur "TÉLÉCHARGER"</i></br>
                  <i>Sue l'application web classique, cliquez sur "uploader le fichier"</i> -->
                </li>
                <li class="mb-2">
                  Pour implémenter le code HTML de votre signature dans la messagerie :</br>
                  Copiez le code HTML de votre signature en cliquant sur ce bouton vert : 
                  <button id="copyButton" onclick="copierSignature()" type="button" class="btn btn-success">Copier</button> </br>
                  Sur Zimbra, rendez-vous dans "Préférences" ; puis, Signatures ; puis "Nouvelle signature". </br>
                  Nommez votre signature </br>
                  Cliquez sur le bouton "Format texte simple" et passez en "Format HTML"</br>
                  Cliquez sur l'icone "Code source" (icone "<>") et collez ce code ; puis, en haut à gauche, "Enregistrer".
                  <!-- Sur le client web "modern", cliquez sur "Paramètres et plus" (icone "roue dentée" en haut à droite) ; puis, "Paramètres" ; puis, "Signatures". </br>
                  Sue l'application web classique, cliquez sur "uploader le fichier" -->
                </li>
              </ul>

              <script>
              function genererSignature() {
                var loginZimbra = document.getElementById("loginZimbra").value;
                var nom = document.getElementById("nom").value;
                var detail1 = document.getElementById("detail1").value;
                var detail2 = document.getElementById("detail2").value;
                var telephone = document.getElementById("telephone").value;

                var signaturePreview = '<div></div><div style="width: 100%; display: inline-block; margin: 0px 0px 0px 0px;"><div style="padding: 5px 0px 0px 20px;"><p style="float: left; font-family: \'arial\' , sans-serif; margin: 0px 5px 0px 0px;"><a href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/logo-sr.png" dfsrc="doc:img_signature/logo-sr.png" alt="SIGMA Racing" style="height: 80px;" /> </a></p><p style="float: left; font-family: \'arial\' , \'helvetica\' , sans-serif; margin: 0px 0px 0px 20px;"><img src="img_signature/ligne-separatrice.png" dfsrc="img_signature/ligne-separatrice.png" style="height: 100%; padding: 0px 0px 0px 20px; margin-right: 40px;" /></p><div style="padding: 5px 0px 0px 20px;"> <span id="templateWebNomPrenom" style="font-size: 11pt; color: #b50000; font-weight: bold;">' 
                + nom + '</span><br /><span id="templateWebDetail1" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + detail1 + '</span><br /><span id="templateWebDetail3" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + detail2 + '</span><br /><span id="templateWebTelephone" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + telephone + '</span><br /><br /><a style="font-size: 11pt; text-decoration: none; color: #b50000;" href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> <strong>SIGMA Racing</strong> </a><br /><span style="font-size: 11pt;"> 20 avenue Blaise Pascal TSA 62006 63178 AUBIERE Cedex </span><br /><br /><a href="https://www.instagram.com/ecurie_sigmaracing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/instagram-sr.png" dfsrc="doc:Briefcase/instagram-sr.png" alt="Instagram" style="margin: 5px;" /> </a><a href="https://www.facebook.com/sigmaracing1" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/facebook-sr.png" dfsrc="doc:img_signature/facebook-sr.png" alt="Facebook" style="margin: 5px;" /> </a><a href="https://www.linkedin.com/company/sigma-racing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/linkedin-sr.png" dfsrc="doc:img_signature/linkedin-sr.png" alt="LinkedIn" style="margin: 5px;" /></a></div></div></div>';



                var signature = '<div></div><div style="width: 100%; display: inline-block; margin: 0px 0px 0px 0px;"><div style="padding: 5px 0px 0px 20px;"><p style="float: left; font-family: \'arial\' , sans-serif; margin: 0px 5px 0px 0px;"><a href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> <img src="/home/' + loginZimbra + '/Briefcase/logo-sr.png" dfsrc="doc:Briefcase/logo-sr.png" alt="SIGMA Racing" style="height: 80px;" /> </a></p><p style="float: left; font-family: \'arial\' , \'helvetica\' , sans-serif; margin: 0px 0px 0px 20px;"><img src="/home/' + loginZimbra + '/Briefcase/ligne-separatrice.png" dfsrc="doc:Briefcase/ligne-separatrice.png" style="height: 100%; padding: 0px 0px 0px 20px; margin-right: 40px;" /></p><div style="padding: 5px 0px 0px 20px;"> <span id="templateWebNomPrenom" style="font-size: 11pt; color: #b50000; font-weight: bold;">' 
                + nom + '</span><br /><span id="templateWebDetail1" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + detail1 + '</span><br /><span id="templateWebDetail3" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + detail2 + '</span><br /><span id="templateWebTelephone" style="font-size: 11pt; color: #202020; font-weight: bold;">' 
                + telephone + '</span><br /><br /><a style="font-size: 11pt; text-decoration: none; color: #b50000;" href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> <strong>SIGMA Racing</strong> </a><br /><span style="font-size: 11pt;"> 20 avenue Blaise Pascal TSA 62006 63178 AUBIERE Cedex </span><br /><br /><a href="https://www.instagram.com/ecurie_sigmaracing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="/home/' + loginZimbra + '/Briefcase/instagram-sr.png" dfsrc="doc:Briefcase/instagram-sr.png" alt="Instagram" style="margin: 5px;" /> </a><a href="https://www.facebook.com/sigmaracing1" rel="nofollow noopener noreferrer" target="_blank"> <img src="/home/' + loginZimbra + '/Briefcase/facebook-sr.png" dfsrc="doc:Briefcase/facebook-sr.png" alt="Facebook" style="margin: 5px;" /> </a><a href="https://www.linkedin.com/company/sigma-racing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="/home/' + loginZimbra + '/Briefcase/linkedin-sr.png" dfsrc="doc:Briefcase/linkedin-sr.png" alt="LinkedIn" style="margin: 5px;" /></a></div></div></div>';

                document.getElementById("signature").innerHTML = signaturePreview;
                document.getElementById("htmlCode").value = signature;
              }

              function copierSignature() {
                var copyText = document.createElement('textarea');
                copyText.value = document.getElementById("htmlCode").value;
                document.body.appendChild(copyText);
                copyText.select();
                document.execCommand("copy");
                document.body.removeChild(copyText);

                document.getElementById("copyButton").innerHTML = "Copié";

                // Réinitialiser le bouton à "Copier" après 5 secondes
                setTimeout(function() {
                  document.getElementById("copyButton").innerHTML = "Copier";
                }, 5000);
              }
              </script>
            </div>
          </div>
        </div>
      </div>

      <h2 class="mt-5"> Modifier la section "Qui sommes nous ?" </h2>
      <div class="accordion mb-5 mt-1" id="accordionExample">

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Créer une signature Zimbra
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <!-- contenu -->
            </div>
          </div>
        </div>

      </div>

      <h2 class="mt-5"> Créer une signature d'e-mail </h2>
      <div class="accordion mb-5 mt-1" id="accordionExample">

        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Créer une signature Zimbra
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <!-- contenu -->
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>

    <div class="bloc_footer">
      <footer class="container-fluid">

        <div class="row">
          <div class="col-12 col-lg-6 bloc" data-delay="100">


            <div class="row align-items-center">
            <div class="bloc_logo_footer ms-5 border-end mt-5"
        style="border-color: black !important;" >
          <div></div>
        <picture class="">
          <!--favicon ci-dessous-->
          <source
          media="(max-width: 991px)"
          srcset="images_main/favicon_sr.svg"        
          alt="Favicon Sigma Racing" 
          width="69px"
          height="auto" />
          <source
          media="(min-width: 992px)"
          srcset="images_main/favicon_sr.svg"
          alt="Logo Sigma Racing" 
          width="100px"
          height="auto"
          class="favc" />
          <img
          src="images_main/favicon_sr.svg" />
         </picture>
         <h4 class="">
          Sigma Racing
         </h4>
         <p>
         </p>
         <p>
          2024 -  v0.1.8.
         </p>
            </div>
            <div style="height: 3rem;"></div>

          </div>

          <div class="col">
          </div>

          <div class="col">
          </div>
        </div>

        </footer>       
      </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js"></script>
    <script src="scripts/main.js"></script>

  </body>
  <script src="scripts/main.js"></script>



  <!-- <div></div>
<div style="width: 100%; display: inline-block; margin: 0px 0px 0px 0px;">
    <div style="padding: 5px 0px 0px 20px;">
        <p style="float: left; font-family: 'arial' , sans-serif; margin: 0px 5px 0px 0px;">
            <a href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> 
                <img src="img_signature/logo-sr.png" dfsrc="doc:img_signature/logo-sr.png" alt="SIGMA Racing" style="height: 80px;" /> 
            </a>
        </p>
        <p style="float: left; font-family: 'arial' , 'helvetica' , sans-serif; margin: 0px 0px 0px 20px;">
            <img src="img_signature/ligne-separatrice.png" dfsrc="img_signature/ligne-separatrice.png" style="height: 100%; padding: 0px 0px 0px 20px; margin-right: 40px; vertical-align: middle;" />
        </p>
        <div style="padding: 5px 0px 0px 20px; align-items: flex-start; min-width: 200px;">
          <div style="padding: 0px 0px 0px 20px; margin-right: 20px; ">
              <span id="templateWebNomPrenom" style="font-size: 11pt; color: #b50000; font-weight: bold;">' + nom + '</span><br />
              <span id="templateWebDetail1" style="font-size: 11pt; color: #202020; font-weight: bold;">' + detail1 + '</span><br />
              <span id="templateWebDetail3" style="font-size: 11pt; color: #202020; font-weight: bold;">' + detail2 + '</span><br />
              <span id="templateWebTelephone" style="font-size: 11pt; color: #202020; font-weight: bold;">' + telephone + '</span><br /><br />
              <a style="font-size: 11pt; text-decoration: none; color: #b50000;" href="https://www.sigma-clermont.fr" rel="nofollow noopener noreferrer" target="_blank"> <strong>SIGMA Racing</strong> </a><br />
              <span style="font-size: 11pt;"> 20 avenue Blaise Pascal TSA 62006 63178 AUBIERE Cedex </span><br /><br />
              <a href="https://www.instagram.com/ecurie_sigmaracing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/instagram-sr.png" dfsrc="doc:img_signature/instagram-sr.png" alt="Instagram" style="margin: 5px;" /> </a>
              <a href="https://www.facebook.com/sigmaracing1" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/facebook-sr.png" dfsrc="doc:img_signature/facebook-sr.png" alt="Facebook" style="margin: 5px;" /> </a>
              <a href="https://www.linkedin.com/company/sigma-racing/" rel="nofollow noopener noreferrer" target="_blank"> <img src="img_signature/linkedin-sr.png" dfsrc="doc:img_signature/linkedin-sr.png" alt="LinkedIn" style="margin: 5px;" /></a>
          </div>
        </div>
    </div>
</div> -->





</html>