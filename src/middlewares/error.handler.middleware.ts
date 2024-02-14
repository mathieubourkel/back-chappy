// Importation des modules nécessaires
import { HttpMessagesUtils } from "../utils/http.messages.utils"; // Module contenant des messages HTTP personnalisés
import { Response } from "express"; // Module Express pour les réponses HTTP

// Définition de la classe CustomError
export class CustomError {

    // Propriétés de la classe
    codePerso: string; // Code d'erreur personnalisé
    status: number; // Code d'état HTTP de l'erreur
    message: string; // Message d'erreur
    date: string; // Date et heure de l'erreur

    // Constructeur de la classe CustomError
    constructor(codePerso: string, status: number, message?: string) {
        this.codePerso = codePerso; // Initialisation du code d'erreur personnalisé
        this.status = status || 500; // Initialisation du code d'état HTTP (par défaut: 500 - Erreur interne du serveur)
        // Initialisation du message d'erreur en utilisant le message fourni ou en récupérant un message par défaut à partir de HttpMessagesUtils
        this.message = message || HttpMessagesUtils[status];
        // Initialisation de la date et de l'heure de l'erreur en utilisant le fuseau horaire spécifié dans process.env.TZ
        this.date = new Date().toLocaleString('fr-FR', { timeZone: process.env.TZ });
    }

    // Méthode pour envoyer l'erreur au client
    sendError(res: Response) {
        // Envoi d'une réponse JSON contenant les détails de l'erreur : message, codePerso, status et date
        res.status(this.status).json({ message: this.message, code: this.codePerso, status: this.status, date: this.date });
    };
}
