import { NextFunction, Request, Response } from "express";
import { HTTPMessages } from "../utils/HTTPMessages";

export abstract class GlobalController {
  // Fonction globale, utilisée dans toutes les fonctions de controlleurs
  // elle engloba la gestion du try/catch 
  // ainsi que celle des erreurs
  // En cas de catch on a (next) qui appelle le middleware de gestion d'erreurs

  protected async handleGlobal(req: Request,res: Response,
    next: NextFunction,
    callback: () => Promise<any>,
    // status facultatif si on veut mettre un status perssonalisé (201)
    status?: number
  ) {
    try {
      // le callback sera toutes les fonctions enfant des controlleurs
      // On stock le resultat
      // Si la promesse a échouée dans la fonction enfant, cela échoue
      // également dans cette fonction et renvoie le catch qui renvoie vers
      // la gestion d'erreurs
      let result = await callback();
      let tmpMes;
      if (result == null || result.length == 0) tmpMes = "Aucune data trouvée"
      res.status(status || 200)
        .json({
          data: result,
          date: new Date(),
          // Si il y a un status présent met le, sinon affiche une 200
          // (en cas de création avec un 201 par exemple)
          message: tmpMes || HTTPMessages[status || 200],
        });
    } catch (error) {
      next(error);
    }
  }

  // Fonction dédiée aux mauvaises URL (définit dans le fichier routes)
  protected async badRoute(req: Request, res: Response, next: NextFunction) {
    res.status(404).json(HTTPMessages[404]);
  }

}
