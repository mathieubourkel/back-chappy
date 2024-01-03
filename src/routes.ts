import { ChenilController } from "./controllers/ChenilController";
import { DogController } from "./controllers/DogController";
import { GlobalController } from "./controllers/GlobalController";
import { OwnerController } from "./controllers/OwnerController";

export const Routes = [ 
  {
    //Liste des races dans l’enum
    method: "get",
    route: "/breeds",
    controller: DogController,
    action: "getBreeds"
  },
 
  {
    //Liste de tous les chiens d’une race défini dans l’url selon le chenil dans l’url aussi. ex : “localhost:3000/chenils/id_du_chenil/race_du_chien“
    method: "get",
    route: "/chenil/:id/breed/:breed",
    controller: DogController,
    action: "getDogsByIdChenilAndBreed"
  },
 
  {
    //Route qui renvoie un pourcentage d’adoption d’un chenil selon l’id du chenil
    method: "get",
    route: "/chenil/:id/pourcentage",
    controller: ChenilController,
    action: "getPourcentFromChenil"
  },
  {
    //Liste des chenils avec de la place disponible
    method: "get",
    route: "/chenils/notbusy",
    controller: ChenilController,
    action: "getChenilNotBusy"
  },
  
  {
    // Liste de tous les chenils qui contiennent au moins un chien. ( seulement le nom du chenil )
    method: "get",
    route: "/chenils/noempty",
    controller: ChenilController,
    action: "getNameChenilsWithDogs"
  },
  
   {
     // Route qui va chercher tous les chiens d’un chenil adoptés
      method: "get",
      route: "/chenil/:id/adopted",
      controller: DogController,
      action: "getDogsAdoptedFromIdChenil"
    },
    {
     // Route qui va chercher tous les chiens d’un chenil non adoptés
      method: "get",
      route: "/chenil/:id/unadopted",
      controller: DogController,
      action: "getDogsUnadoptedFromIdChenil"
    },
    {
      // Liste de tous les chiens
       method: "get",
       route: "/dogs/breed/:breed",
       controller: DogController,
       action: "getDogsByBreed"
     },

    
     {
     // 1 chien
     method: "get",
     route: "/dogs/:id",
     controller: DogController,
     action: "getOne"
   },
   {
    // 1 chenil
    method: "get",
    route: "/chenils/:id",
    controller: ChenilController,
    action: "getOne"
  },
  {
    // Liste de tous les chiens
     method: "get",
     route: "/dogs",
     controller: DogController,
     action: "getAll"
   },

  // POST PUT 
  {
    //Création d’un chenil depuis le body de la requet
    method: "post",
    route: "/chenil",
    controller: ChenilController,
    action: "create"
  }, 
  {
    // Route qui ajoute un chien à un chenil, je vous laisse structurer l’url et le body comme vous le souhaitez pour contenir les 2 infos.
      method: "post",
      route: "/chenil/:id/dog",
      controller: DogController,
      action: "create"
    },
    {
      // Route qui ajoute un chien à un chenil, je vous laisse structurer l’url et le body comme vous le souhaitez pour contenir les 2 infos.
        method: "post",
        route: "/register",
        controller: OwnerController,
        action: "create"
      },
    {
      //Route qui adopte un chien selon son id, on passe is_adopted à 1
      method: "put",
      route: "/dogs/:id/adopt",
      controller: DogController,
      action: "adoptDog"
    },
    {
      // Modification du chenil selon son id  PUT :” localhost/chenil/:id"
      method: "put",
      route: "/chenils/:id",
      controller: ChenilController,
      action: "update"
    },
    {
      
      method: "all",
      route: "*",
      controller: GlobalController,
      action: "badRoute"
    },
];
