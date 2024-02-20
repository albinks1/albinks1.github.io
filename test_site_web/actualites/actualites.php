<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Sigma Racing - Accueil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">    <link rel="shortcut icon" href="../images_main/favicon_sr.png" type="image/x-icon" />
    <link href="../styles/styles_main.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css" />
  </head>
  <body>
    <div class="container-fluid"> 
      <header class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand ms-4 href=index.html" id="barde">
            <picture>
              <source
              media="(max-width: 991px)"
              srcset="../images_main/favicon_sr.png"        
              alt="Favicon Sigma Racing" 
              width="69px"
              height="auto" />
              <source
              media="(min-width: 992px)"
              srcset="../images_main/logo-sr-v.png"
              alt="Logo Sigma Racing" 
              width="150px"
              height="auto"
              class="favc" />
              <img src="../images_main/logo-sr-v.png" />
             </picture>
            </a>

            <button class="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active ms-4" aria-current="page" href="../accueil/index.html">Accueil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active ms-4" aria-current="page" href="../actualites.php">Actualités</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle ms-4"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sigma Racing Team
                  </a>
                  <ul class="dropdown-menu ms-4 me-4 ">
                    <li><a class="dropdown-item " href="../sigma_racing_team/presentation.html">Qui sommes nous ?</a></li>
                    <li><a class="dropdown-item " href="../sigma_racing_team/partenaires.html">Nos partenaires</a></li>
                    <li><a class="dropdown-item " href="../sigma_racing_team/sigma_clermont.html">Sigma Clermont</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item " href="../sigma_racing_team/contact.html">Nous contacter</a></li>
                  </ul>
                </li>
                <a class="nav-link active ms-4" aria-current="page" href="../fs.html">Formula student</a>
                <a class="nav-link active ms-4" aria-current="page" href="../rallye.html">Rallye</a>
                <a class="nav-link active ms-4" aria-current="page" href="../admin.php">Admin</a>
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

      <div class="souscont pl-md-4">
        <div class="blur-background"></div>
          <div class="container">
            <h4 class="rappeldepage">Actualités</h4>
          </div>
        </div>
      </div> 

    <main class="container">
      <div class="container mt-0">
        <div class="row ">


        <?php
          $articles = glob('../articles/*.php');

          foreach ($articles as $article) {
              // Exclure le fichier actualités.php
              if ($article === '../articles/actualités.php') {
              continue;
              }

            include $article;


            /* template vignettes actu */
            if (isset($title, $image, $content)) {
                echo "<div class=\"card\">";
                echo "<img src=\"../$image\" alt=\"$title\">";
                echo "<h1><a href=\"$article\">$title</a></h1>";
                echo "</div>";
              }
            }
          ?>




        </div>
      </div>
    </main>

    <div class="bloc_footer">
      <footer class="container-fluid" >

        <div class="row">
          <div class="col-12 col-lg-6 bloc" data-delay="100">


            <div class="row align-items-center">
            <div class="bloc_logo_footer ms-5 border-end mt-5"
        style="border-color: black !important;" >
          <div></div>
        <picture class="">
          <!--faviconesque ci-dessouus-->
          <source
          media="(max-width: 991px)"
          srcset="../images_main/favicon_sr.svg"        
          alt="Favicon Sigma Racing" 
          width="69px"
          height="auto" />
          <source
          media="(min-width: 992px)"
          srcset="../images_main/favicon_sr.svg"
          alt="Logo Sigma Racing" 
          width="100px"
          height="auto"
          class="favc" />
          <img
          src="../images_main/favicon_sr.svg" />
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
    <script src="../scripts/main.js"></script>
  </body>
</html>



