// Importation des modules nécessaires
import { NextFunction, Request, Response } from "express"; // Express
import { validate } from "class-validator"; // Module de validation de classe
import { plainToInstance } from "class-transformer"; // Module de transformation de classe
import { CustomError } from "./error.handler.middleware"; // Gestionnaire d'erreurs personnalisé

// Middleware de validation des données d'un objet DTO (Data Transfer Object)
export async function verifyDtoMiddleware(req: Request, res: Response, next: NextFunction, classDto?) {
  try {
    // Vérifier si le corps de la requête est présent et non vide
    if (req.body && Object.values(req.body).length != 0){
      // Si la méthode HTTP est 'GET' et qu'il y a un corps dans la requête, lancer une erreur
      if (req.method === 'GET') throw new CustomError("GET-WITH-BODY", 400)

      // Convertir le corps de la requête en une instance de la classe DTO spécifiée
      const bodyToValidate = plainToInstance(classDto, req.body)

      // Valider l'instance par rapport aux contraintes spécifiées dans la classe
      const errors = await validate(bodyToValidate, { whitelist: true });

      // S'il y a des erreurs de validation, lancer une erreur personnalisée avec les détails des erreurs
      if (errors.length > 0) {
          throw new CustomError("MDW-DTO-CHECK", 400, JSON.stringify(errors));
      }

      // Si aucune erreur de validation n'est survenue, remplacer le corps de la requête par l'objet validé
      req.body = bodyToValidate
    } 
  } catch (error) {
    // Capturer les erreurs et les rejeter pour les traiter ultérieurement
    return Promise.reject(error)
  }
}