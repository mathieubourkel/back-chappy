import { DocumentController } from "../controllers/document.controller";
import { CreateDocumentDto, DocumentDto } from "../dto/document.dto";

export const DocumentRoutes = [
    { 
        method: "get",
        route: "/api/documents/:idProject",
        controller: DocumentController,
        action: "getDocumentsByIdProject",
        middlewares: [{name: 'checkToken'}]
      },
      { 
        method: "post",
        route: "/api/document",
        controller: DocumentController,
        action: "create",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: CreateDocumentDto}]
      },
      { 
        method: "put",
        route: "/api/document/:id",
        controller: DocumentController,
        action: "update",
        middlewares: [{name: 'checkToken'},
        {name: "dto", classDto: DocumentDto}
      ]
      },
      { 
        method: "delete",
        route: "/api/document/:id",
        controller: DocumentController,
        action: "delete",
        middlewares: [{name: 'checkToken'}]
      }
]