'use strict';

/**
 * step-task service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::step-task.step-task');
