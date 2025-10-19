#!/bin/bash

# Crear estructura base
mkdir -p common/dto \
         common/filters \
         common/interceptors \
         common/utils \
         common/logging \
         config \
         health \
         budgets/dto \
         info-requests/dto \
         db/migrations \
         db/seed

# Crear archivos en common
touch common/dto/pagination.dto.ts \
      common/filters/http-exception.filter.ts \
      common/interceptors/transform.interceptor.ts \
      common/utils/pagination.ts \
      common/logging/app-logger.service.ts

# Crear archivos en config
touch config/database.config.ts

# Crear archivos en health
touch health/health.module.ts \
      health/health.controller.ts

# Crear archivos en budgets
touch budgets/budgets.module.ts \
      budgets/budgets.controller.ts \
      budgets/budgets.service.ts \
      budgets/budgets.entity.ts \
      budgets/dto/create-budget.dto.ts \
      budgets/dto/update-budget.dto.ts \
      budgets/dto/query-budget.dto.ts

# Crear archivos en info-requests
touch info-requests/info-requests.module.ts \
      info-requests/info-requests.controller.ts \
      info-requests/info-requests.service.ts \
      info-requests/info-request.entity.ts \
      info-requests/dto/create-info-request.dto.ts \
      info-requests/dto/query-info-request.dto.ts

# Crear archivos en db
touch db/seed/seed.ts

echo "✅ Estructura de directorios y archivos creada exitosamente."
