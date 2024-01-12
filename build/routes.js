"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_controller_1 = require("./controllers/auth.controller");
const category_controller_1 = require("./controllers/category.controller");
const company_controller_1 = require("./controllers/company.controller");
const controller_1 = require("./controllers/controller");
const document_controller_1 = require("./controllers/document.controller");
const notification_controller_1 = require("./controllers/notification.controller");
const project_controller_1 = require("./controllers/project.controller");
const purchase_controller_1 = require("./controllers/purchase.controller");
const step_controller_1 = require("./controllers/step.controller");
const task_controller_1 = require("./controllers/task.controller");
const user_controller_1 = require("./controllers/user.controller");
exports.Routes = [
    {
        method: "post",
        route: "/auth/login",
        controller: auth_controller_1.AuthController,
        action: "login"
    },
    {
        method: "get",
        route: "/auth/refreshToken",
        controller: auth_controller_1.AuthController,
        action: "refreshToken"
    },
    {
        method: "post",
        route: "/auth/logout",
        controller: auth_controller_1.AuthController,
        action: "logout"
    },
    {
        method: "post",
        route: "/auth/register",
        controller: user_controller_1.UserController,
        action: "create"
    },
    // PROJECT
    // ENLEVER :IdUSER pour passer par le token
    {
        method: "get",
        route: "/api/myprojects/:idUser",
        controller: project_controller_1.ProjectController,
        action: "getProjectsFromOwner"
    },
    {
        method: "get",
        route: "/api/mycollabs/:idUser",
        controller: project_controller_1.ProjectController,
        action: "getProjectsFromMember"
    },
    {
        method: "get",
        route: "/api/project/:id",
        controller: project_controller_1.ProjectController,
        action: "getProjectById"
    },
    {
        method: "get",
        route: "/api/project/name/:id",
        controller: project_controller_1.ProjectController,
        action: "getProjectNameById"
    },
    {
        method: "post",
        route: "/api/project",
        controller: project_controller_1.ProjectController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/project/addUser/:idProject",
        controller: project_controller_1.ProjectController,
        action: "addUserToProject"
    },
    {
        method: "put",
        route: "/api/project/:id",
        controller: project_controller_1.ProjectController,
        action: "update"
    },
    {
        method: "put",
        route: "/api/project/:idProject/rejoin/:idUser",
        controller: project_controller_1.ProjectController,
        action: "userRejoinProject"
    },
    {
        method: "delete",
        route: "/api/project/:id",
        controller: project_controller_1.ProjectController,
        action: "delete"
    },
    // STEP
    {
        method: "get",
        route: "/api/steps/:idProject",
        controller: step_controller_1.StepController,
        action: "getStepsByIdProject"
    },
    {
        method: "get",
        route: "/api/step/:idStep",
        controller: step_controller_1.StepController,
        action: "getStepByIdStep"
    },
    {
        method: "post",
        route: "/api/step",
        controller: step_controller_1.StepController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/step/:id",
        controller: step_controller_1.StepController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/step/:id",
        controller: step_controller_1.StepController,
        action: "delete"
    },
    // TASK
    {
        method: "get",
        route: "/api/tasks/step/:idStep",
        controller: task_controller_1.TaskController,
        action: "getTasksByIdStep"
    },
    {
        method: "get",
        route: "/api/tasks/project/:idProject",
        controller: task_controller_1.TaskController,
        action: "getTasksByIdProject"
    },
    {
        method: "get",
        route: "/api/tasks/owner/:idUser",
        controller: task_controller_1.TaskController,
        action: "getOwnerTasksByIdUser"
    },
    {
        method: "get",
        route: "/api/tasks/member/:idUser",
        controller: task_controller_1.TaskController,
        action: "getCollabTasksByIdUser"
    },
    {
        method: "get",
        route: "/api/task/:id",
        controller: task_controller_1.TaskController,
        action: "getTaskById"
    },
    {
        method: "put",
        route: "/api/task/:id",
        controller: task_controller_1.TaskController,
        action: "update"
    },
    {
        method: "put",
        route: "/api/task/:idTask/delete/:idUser",
        controller: task_controller_1.TaskController,
        action: "update"
    },
    {
        method: "post",
        route: "/api/task",
        controller: task_controller_1.TaskController,
        action: "create"
    },
    {
        method: "delete",
        route: "/api/task/:id",
        controller: task_controller_1.TaskController,
        action: "delete"
    },
    //PURCHASE
    {
        method: "get",
        route: "/api/purchases/:idProject",
        controller: purchase_controller_1.PurchaseController,
        action: "getPurchasesByIdProject"
    },
    {
        method: "post",
        route: "/api/purchase",
        controller: purchase_controller_1.PurchaseController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/purchase/:id",
        controller: purchase_controller_1.PurchaseController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/purchase/:id",
        controller: purchase_controller_1.PurchaseController,
        action: "delete"
    },
    // DOCUMENT
    {
        method: "get",
        route: "/api/documents/:idProject",
        controller: document_controller_1.DocumentController,
        action: "getDocumentsByIdProject"
    },
    {
        method: "post",
        route: "/api/document",
        controller: document_controller_1.DocumentController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/document/:id",
        controller: document_controller_1.DocumentController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/document/:id",
        controller: document_controller_1.DocumentController,
        action: "delete"
    },
    // CATEGORIE
    {
        method: "get",
        route: "/api/categories",
        controller: category_controller_1.CategoryController,
        action: "getAll"
    },
    {
        method: "post",
        route: "/api/category",
        controller: category_controller_1.CategoryController,
        action: "create"
    },
    {
        method: "delete",
        route: "/api/category/:id",
        controller: category_controller_1.CategoryController,
        action: "delete"
    },
    // NOTIFICATION
    {
        method: "get",
        route: "/api/notifications/:idUser",
        controller: notification_controller_1.NotificationController,
        action: "getNotificationsByUser"
    },
    {
        method: "post",
        route: "/api/notification",
        controller: notification_controller_1.NotificationController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/notification/:id",
        controller: notification_controller_1.NotificationController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/notification/:id",
        controller: notification_controller_1.NotificationController,
        action: "delete"
    },
    // COMMENT
    // USER
    {
        method: "get",
        route: "/api/users",
        controller: user_controller_1.UserController,
        action: "getAll"
    },
    {
        method: "put",
        route: "/api/user/:id",
        controller: user_controller_1.UserController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/user/:id",
        controller: user_controller_1.UserController,
        action: "delete"
    },
    // COMPANY
    {
        method: "get",
        route: "/api/companies",
        controller: company_controller_1.CompanyController,
        action: "getAll"
    },
    {
        method: "post",
        route: "/api/company",
        controller: company_controller_1.CompanyController,
        action: "create"
    },
    {
        method: "put",
        route: "/api/company/:id",
        controller: company_controller_1.CompanyController,
        action: "update"
    },
    {
        method: "delete",
        route: "/api/company/:id",
        controller: company_controller_1.CompanyController,
        action: "delete"
    },
    //GLOBAL
    {
        method: "all",
        route: "*",
        controller: controller_1.GlobalController,
        action: "badRoute"
    },
];
//# sourceMappingURL=routes.js.map